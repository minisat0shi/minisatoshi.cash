<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Define folder paths and labels
$sections = [
    'Branding' => '../images/Resources/Branding/',
    'Stickers' => '../images/Resources/Stickers/',
    'Informational Graphics' => '../images/Resources/InformationalGraphics/',
    'Fun Graphics' => '../images/Resources/FunGraphics/',
    'Memes' => '../images/Resources/Memes/'
];

$baseUrlPrefix = '/images/Resources/';
$allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

$output = [];
foreach ($sections as $label => $folder) {
    $images = glob($folder . "*.{" . implode(',', $allowedTypes) . "}", GLOB_BRACE);
    
    // Sort images alphabetically by filename
    sort($images, SORT_NATURAL | SORT_FLAG_CASE); // Natural sort, case-insensitive
    
    $baseUrl = $baseUrlPrefix . basename($folder) . '/';
    $sectionImages = [];
    foreach ($images as $image) {
        $filename = basename($image);
        $sectionImages[] = [
            'name' => $filename,
            'url' => $baseUrl . $filename
        ];
    }
    $output[$label] = $sectionImages;
}

echo json_encode($output);
?>