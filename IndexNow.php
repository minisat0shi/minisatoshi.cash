<?php
// Block direct browser access
if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    die('Access denied: This script can only be run from the command line.');
}

// Configuration
$indexNowKey = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
$siteUrl = 'https://minisatoshi.cash';
$dir = __DIR__;
$timestampFile = "$dir/last-update.txt";
$logFile = "$dir/indexnow-log.txt"; // Persistent log

// Function to get all HTML files
function getHtmlFiles($dir) {
    $files = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isFile() && preg_match('/\.html$/', $file->getFilename()) 
            && !in_array($file->getFilename(), ['index.html', '400.html', '401.html', '403.html', '404.html', '500.html'])) {
            $files[] = $file->getPathname();
        }
    }
    return $files;
}

// Load last modification time
$lastModTime = file_exists($timestampFile) ? (int) file_get_contents($timestampFile) : 0;

// Get HTML files and check for changes
$htmlFiles = getHtmlFiles($dir);
$urlsToSubmit = [];
$latestModTime = $lastModTime;

foreach ($htmlFiles as $file) {
    $modTime = filemtime($file);
    if ($modTime > $lastModTime) {
        $relativePath = str_replace($dir, '', $file);
        $cleanPath = preg_replace('/\.html$/', '', $relativePath);
        $url = $siteUrl . str_replace('\\', '/', $cleanPath);
        $urlsToSubmit[] = $url;
        $latestModTime = max($latestModTime, $modTime);
    }
}

// Add homepage if modified
$homePage = "$siteUrl/";
$homeFile = "$dir/index.html";
if (file_exists($homeFile) && filemtime($homeFile) > $lastModTime && !in_array($homePage, $urlsToSubmit)) {
    $urlsToSubmit[] = $homePage;
    $latestModTime = max($latestModTime, filemtime($homeFile));
}

// Filter out unwanted URLs
$urlsToSubmit = array_filter($urlsToSubmit, function($url) use ($siteUrl) {
    return $url !== "$siteUrl/index" && $url !== "$siteUrl/404";
});

if (!empty($urlsToSubmit)) {
    // IndexNow endpoint
    $endpoint = 'https://api.indexnow.org/indexnow';
    $data = [
        'host' => parse_url($siteUrl, PHP_URL_HOST),
        'key' => $indexNowKey,
        'keyLocation' => "$siteUrl/$indexNowKey.txt",
        'urlList' => array_values($urlsToSubmit)
    ];
    $jsonData = json_encode($data);

    // Submit URLs via cURL
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $headerSize);
    $body = substr($response, $headerSize);
    curl_close($ch);

    // Log result
    $logMessage = date('Y-m-d H:i:s') . " - HTTP Code: $httpCode - URLs Submitted: " . count($urlsToSubmit) . "\n";
    $logMessage .= "Headers: $headers\n";
    $logMessage .= "Response Body: " . ($body ?: "None") . "\n";
    $logMessage .= "Payload: $jsonData\n";

    if ($httpCode == 200 || $httpCode == 202) {
        file_put_contents($timestampFile, $latestModTime);
        $logMessage .= "Success: Updated timestamp to $latestModTime\n";
    } else {
        $logMessage .= "Failed.\n";
    }
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    echo $logMessage;
} else {
    $logMessage = date('Y-m-d H:i:s') . " - No changes detected since last submission ($lastModTime).\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    echo $logMessage;
}
?>