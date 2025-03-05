<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$imageFolder = '../images/Resources/Stickers/';
$baseUrl = '/images/Resources/Stickers/';

$allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$images = glob($imageFolder . "*.{" . implode(',', $allowedTypes) . "}", GLOB_BRACE);

$output = [];
foreach ($images as $image) {
    $filename = basename($image);
    $output[] = [
        'name' => $filename,
        'url' => $baseUrl . $filename
    ];
}

echo json_encode($output);
?>