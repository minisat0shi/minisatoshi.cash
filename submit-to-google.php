<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuration
$siteUrl = 'https://minisatoshi.cash';
$keyFile = '../google-api-secure-analyzer-453414-s9-e3a7ee4f10d3.json'; // Path to your service account JSON
$dir = __DIR__;
$timestampFile = "$dir/last-update.txt";

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

// Function to get OAuth 2.0 access token
function getAccessToken($keyFile) {
    $json = json_decode(file_get_contents($keyFile), true);
    $clientEmail = $json['client_email'];
    $privateKey = $json['private_key'];
    
    $header = [
        'alg' => 'RS256',
        'typ' => 'JWT'
    ];
    $payload = [
        'iss' => $clientEmail,
        'scope' => 'https://www.googleapis.com/auth/indexing',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => time() + 3600,
        'iat' => time()
    ];
    
    $base64UrlHeader = base64UrlEncode(json_encode($header));
    $base64UrlPayload = base64UrlEncode(json_encode($payload));
    $signatureInput = "$base64UrlHeader.$base64UrlPayload";
    openssl_sign($signatureInput, $signature, $privateKey, 'sha256WithRSAEncryption');
    $base64UrlSignature = base64UrlEncode($signature);
    
    $jwt = "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";
    
    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

// Helper function for base64 URL encoding
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Set content type for browser output
header('Content-Type: text/plain');

// Get access token
$accessToken = getAccessToken($keyFile);
if (!$accessToken) {
    die("Failed to obtain access token.\n");
}

// Get last modification time of directory
$currentModTime = filemtime($dir);
$lastModTime = file_exists($timestampFile) ? (int) file_get_contents($timestampFile) : 0;

if ($currentModTime > $lastModTime) {
    $htmlFiles = getHtmlFiles($dir);
    $urls = array_map(function($file) use ($siteUrl, $dir) {
        $relativePath = str_replace($dir, '', $file);
        $cleanPath = preg_replace('/\.html$/', '', $relativePath);
        return $siteUrl . str_replace('\\', '/', $cleanPath);
    }, $htmlFiles);

    if (!in_array("$siteUrl/", $urls)) {
        $urls[] = "$siteUrl/";
    }

    $urls = array_values($urls);
    $successCount = 0;

    $endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
    foreach ($urls as $url) {
        $content = json_encode([
            'url' => $url,
            'type' => 'URL_UPDATED'
        ]);

        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            "Authorization: Bearer $accessToken"
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode == 200) {
            $successCount++;
            echo "Submitted: $url\n";
            echo "Response: $response\n";
        } else {
            echo "Failed to submit $url: HTTP $httpCode - $response\n";
        }
    }

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