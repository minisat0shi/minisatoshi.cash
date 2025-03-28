<?php
// Block direct browser access
if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    die('Access denied: This script can only be run from the command line.');
}

// Configuration
$indexNowKey = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // Replace with your IndexNow key
$siteUrl = 'https://minisatoshi.cash'; // Your domain with HTTPS
$dir = __DIR__; // public_html directory
$timestampFile = "$dir/last-update.txt"; // Tracks last update

// Function to get all HTML files, excluding specific ones
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

// Get last modification time of public_html
$currentModTime = filemtime($dir);
$lastModTime = file_exists($timestampFile) ? (int) file_get_contents($timestampFile) : 0;

// Check if there’s a change since last run
if ($currentModTime > $lastModTime) {
    // Get all HTML files
    $htmlFiles = getHtmlFiles($dir);
    $urls = array_map(function($file) use ($siteUrl, $dir) {
        $relativePath = str_replace($dir, '', $file);
        $cleanPath = preg_replace('/\.html$/', '', $relativePath); // Remove .html
        return $siteUrl . str_replace('\\', '/', $cleanPath); // Convert to URL
    }, $htmlFiles);

    // Add home page
    if (!in_array("$siteUrl/", $urls)) {
        $urls[] = "$siteUrl/";
    }

    // Filter out unwanted URLs
    $urls = array_filter($urls, function($url) use ($siteUrl) {
        return $url !== "$siteUrl/index" && $url !== "$siteUrl/404";
    });

    // IndexNow endpoint
    $endpoint = 'https://api.indexnow.org/indexnow';
    $data = [
        'host' => parse_url($siteUrl, PHP_URL_HOST),
        'key' => $indexNowKey,
        'keyLocation' => "$siteUrl/$indexNowKey.txt",
        'urlList' => array_values($urls)
    ];
    $jsonData = json_encode($data);

    // Submit URLs via cURL
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true); // Include headers in output
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $headerSize);
    $body = substr($response, $headerSize);
    curl_close($ch);

    // Log result and update timestamp
    if ($httpCode == 200 || $httpCode == 202) {
        file_put_contents($timestampFile, $currentModTime);
        echo "Success: Submitted " . count($urls) . " URLs to IndexNow.\n";
        echo "HTTP Code: $httpCode\n";
        echo "Headers: $headers\n";
        echo "Response Body: " . ($body ?: "None") . "\n";
        echo "Payload sent: $jsonData\n";
    } else {
        echo "Failed.\n";
        echo "HTTP Code: $httpCode\n";
        echo "Headers: $headers\n";
        echo "Response Body: " . ($body ?: "None") . "\n";
        echo "Payload sent: $jsonData\n";
    }
} else {
    echo "No changes detected since last submission.\n";
}
?>