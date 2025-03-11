<?php
// Replace with your API key and domain
$apiKey = '52d008ba384b47749e98094b3b636405';
$siteUrl = 'https://minisatoshi.cash'; // verified domain

// List of URLs to submit (e.g., new or updated pages)
$urls = [
    "$siteUrl",
    "$siteUrl/ecosystem",
    "$siteUrl/forkmap",
    "$siteUrl/upgrade-history",
    "$siteUrl/CVE-2018-17144",
    "$siteUrl/minecraft",
    "$siteUrl/resources"
];

// API endpoint
$endpoint = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=$apiKey";

// Prepare JSON payload
$data = [
    'siteUrl' => $siteUrl,
    'urlList' => $urls
];
$jsonData = json_encode($data);

// Set up cURL request
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json; charset=utf-8'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute and check response
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode == 200 && $response == '{"d":null}') {
    echo "URLs submitted successfully!";
} else {
    echo "Failed to submit URLs. HTTP Code: $httpCode, Response: $response";
}
?>