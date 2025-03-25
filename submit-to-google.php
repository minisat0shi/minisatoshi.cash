<?php
// Require Google API Client Library (install via composer: composer require google/apiclient:^2.0)
require_once __DIR__ . '/vendor/autoload.php';

// Configuration
$siteUrl = 'https://minisatoshi.cash'; // Verified domain with HTTPS
$keyFile = '../google-api-secure-analyzer-453414-s9-e3a7ee4f10d3.json'; // Your JSON key file path
$dir = __DIR__; // Directory where submit-to-google.php resides
$timestampFile = "$dir/last-update.txt"; // Tracks last update

// Function to get all HTML files, excluding index.html and error pages
function getHtmlFiles($dir) {
    $files = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isFile() && preg_match('/\.html$/', $file->getFilename()) 
            && $file->getFilename() !== 'index.html' 
            && $file->getFilename() !== '400.html'
            && $file->getFilename() !== '401.html'
            && $file->getFilename() !== '403.html'
            && $file->getFilename() !== '404.html'
            && $file->getFilename() !== '500.html') {
            $files[] = $file->getPathname();
        }
    }
    return $files;
}

// Initialize Google Client
$client = new Google_Client();
$client->setAuthConfig($keyFile);
$client->addScope('https://www.googleapis.com/auth/indexing');
$service = new Google_Service_Indexing($client);

// Set content type for browser output
header('Content-Type: text/plain');

// Get last modification time of directory
$currentModTime = filemtime($dir);
$lastModTime = file_exists($timestampFile) ? (int) file_get_contents($timestampFile) : 0;

// Check if there’s a change since last run
if ($currentModTime > $lastModTime) {
    // Get all HTML files (excluding index.html and error pages)
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

    $urls = array_values($urls); // Re-index array
    $successCount = 0;

    // Submit URLs to Google Indexing API
    foreach ($urls as $url) {
        try {
            $body = new Google_Service_Indexing_UrlNotification();
            $body->setUrl($url);
            $body->setType('URL_UPDATED'); // Use 'URL_UPDATED' for new or updated content
            
            $response = $service->urlNotifications->publish($body);
            $successCount++;
            echo "Submitted: $url\n";
            // Debugging: Show response details
            echo "Response: " . json_encode($response->toSimpleObject()) . "\n";
        } catch (Exception $e) {
            echo "Failed to submit $url: " . $e->getMessage() . "\n";
        }
    }

    // Log result and update timestamp
    if ($successCount > 0) {
        file_put_contents($timestampFile, $currentModTime);
        echo "\nSubmitted $successCount URLs successfully!\n";
    } else {
        echo "\nNo URLs were submitted successfully.\n";
    }
} else {
    echo "No changes detected since last submission.\n";
}
?>