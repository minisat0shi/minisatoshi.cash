<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuration
$siteUrl = 'https://minisatoshi.cash';
$clientEmail = 'minisatoshi-cash@secure-analyzer-453414-s9.iam.gserviceaccount.com'; // Replace with your client_email
$privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWt0GCM6VJQBT8\noi7PlUWbunB6TQNrByZTn3CTZqXn8zJMqJZblH60prK4qPcNuyHv/VySJDdpNd92\nXlzwGa3kdEZlyyEsQIdzk90tGo3V1nC4TUvvp/EeYh8u4KXTWKqmLnwYMJTHuu3T\ntONf17zscq2EjDCF0uYF2F6tb7orQyJzyxnOl4KOM6DPqYto8qZ7WtofqwI7hQvk\nHeBA5Nth/TxWW4N/3c6YD2jBhhqM+BwjDQ3Kr1JPrw4qAmB5uBXPxqbhdKuMm3Wa\nN1tDptuhLmCmODCyQH584zjS29TRtdsN+Hx90w7nTzzW0m8Odq2fWi1gutpTL4op\ndAElnJ09AgMBAAECggEAHiV9r5uztbynFa9ptiCFtO8w0qMUe0b2NSB6LF/ppE7r\nfYLgFXyca53KEw46HbXr9meSwzwNgZqcRODL2LQqS5yds7YY8r8epXYZxDbpuh/R\nFLdZlYz1WCg7q5fEAI/+6bU2HClaAk73DFXl5LOEJYiWXzlVqLxrKl/uLxi0QVV6\nV4tszQqoiGAxOqBJ5b6r5cXvhfvGxfvsT7PBu1Kz6xnL+IufyCGC3fjzsTndD8SE\nlurGZxYRP7WIlwYxyhQeSgaajauCzqQ31Q3/67Fzh1qJzPiRRl5RtAzso7qb30yA\niOR7wJl/+QEgNzc9BNn/NxR2NfbXfpUggTOsRirRCwKBgQDxvVUmN+f5wteo2GJ3\nCF+MCDn/UOx6jBSnFoWCxKVEmUPvYzhJ5cS3pWcgjLx7jTJSmTkxv8FVg0lq137D\nw03GVVMATkCbFO88lRtyOQbvGbtzFhegB29dWDskJX3q9M70n+NGwXhgNEpjQA2P\nCjlvgzYplK1l4aeQmg25OhOG9wKBgQDjYdH2MNwk5m/xCx0qcFVnsqK7O32IH4pe\n8XSL+RJUnbEa6sZKu6D0zCEpgAsXUtwFSXdYD6Vu+GqxdD1lT+/pyVtN+8v0634/\nlAhzJ/5xBU/QGYcRF+OA7ClOfHMcWQDj3ATqlmJ7/pDM1lCTD0Ugz8sd7G91GXHa\nsmhzodVsawKBgQDtNcF5WECsqBIhH/w3G6NOcMAglhMHCbA2aXYnZLlbwB2WqUER\n2oKXRpoUqaVGg74OqUYjWCvpsoN3cPB2Po5yAUYKNb9Vrkw3oYUmJ2lzdEepXdNe\n+AzChxK5nISb6w+tobtOsghiNs2L6M2lP/4uO44JbVhdcfmQfmrbCG8i7wKBgA0U\ngXmCEgflYaciFolscN1IP2g54dzEw7b2eNfceht3/sonm0SNSpMKcxXqEblDwPhk\n44KjU8bwb2LJ5wY+9PQj6yavR2pNabPKljnZoR9rSM4VydlH4IR4EWA8dHq6+/wf\nmgDMqdmsKTQ/V989z6I1kd+kzDyWPCByhuOv+ZEFAoGBALYjLdoN3F7Xz06RccBv\nLSTOtgAvyyJia1HAoJL4iysFwtIlVG2xoVdiJb28gV7VStOq+5PVPynbxq6PjfIf\nj813eGNxYkJ+mmrbO+fPcY+hSFZkm4wDHR1J6r1LAXlUymdcLgzDNLXytw9OA3bv\nQd7vtHsFSku2L642AkJwvcmL\n-----END PRIVATE KEY-----\n"; // Replace with your private_key
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
function getAccessToken($clientEmail, $privateKey) {
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
$accessToken = getAccessToken($clientEmail, $privateKey);
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