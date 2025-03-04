<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$imageFolder = '../images/';
$baseUrl = '/images/';

$allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp4'];
$images = glob($imageFolder . "*.{" . implode(',', $allowedTypes) . "}", GLOB_BRACE);

$output = [];
foreach ($images as $image) {
    $filename = basename($image);
    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $output[] = [
        'name' => $filename,
        'url' => $baseUrl . $filename,
        'type' => ($extension === 'mp4') ? 'video' : 'image' // Add type indicator
    ];
}

echo json_encode($output);
?>