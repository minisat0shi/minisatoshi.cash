<?php
// Configuration
$apiKey = '52d008ba384b47749e98094b3b636405'; // Replace with your Bing API key
$siteUrl = 'https://minisatoshi.cash'; // Verified domain with HTTPS
$dir = __DIR__; // public_html directory
$timestampFile = "$dir/last-update.txt"; // Tracks last Git update

// Function to get all HTML files, excluding index.html
function getHtmlFiles($dir) {
    $files = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isFile() && preg_match('/\.html$/', $file->getFilename()) && $file->getFilename() !== 'index.html') {
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
    // Get all HTML files (excluding index.html)
    $htmlFiles = getHtmlFiles($dir);
    $urls = array_map(function($file) use ($siteUrl, $dir) {
        $relativePath = str_replace($dir, '', $file);
        $cleanPath = preg_replace('/\.html$/', '', $relativePath); // Remove .html
        return $siteUrl . str_replace('\\', '/', $cleanPath); // Convert to URL
    }, $htmlFiles);

    // Explicitly add the home page
    if (!in_array("$siteUrl/", $urls)) {
        $urls[] = "$siteUrl/"; // Ensure home page is included
    }

    // Filter out /index explicitly (in case it sneaks in)
    $urls = array_filter($urls, function($url) use ($siteUrl) {
        return $url !== "$siteUrl/index";
    });

    // API endpoint
    $endpoint = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=$apiKey";
    $data = [
        'siteUrl' => $siteUrl,
        'urlList' => array_values($urls) // Re-index array after filtering
    ];
    $jsonData = json_encode($data);

    // Submit URLs via cURL
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Log result and update timestamp
    if ($httpCode == 200 && $response == '{"d":null}') {
        file_put_contents($timestampFile, $currentModTime);
        echo "Submitted " . count($urls) . " URLs successfully!";
    } else {
        echo "Failed. HTTP Code: $httpCode, Response: $response";
    }
} else {
    echo "No changes detected since last submission.";
}
?>