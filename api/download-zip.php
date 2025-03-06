<?php
header('Access-Control-Allow-Origin: *');

// Function to recursively add files and directories to ZIP
function addFolderToZip($dir, $zip, $relativePath = '') {
    if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $fullPath = $dir . '/' . $file;
                $zipPath = $relativePath . $file;
                if (is_dir($fullPath)) {
                    $zip->addEmptyDir($zipPath);
                    addFolderToZip($fullPath, $zip, $zipPath . '/');
                } else {
                    $zip->addFile($fullPath, $zipPath);
                }
            }
        }
    }
}

// Get the directory from the query parameter
$dirName = isset($_GET['dir']) ? basename($_GET['dir']) : '';
$baseDir = __DIR__ . '/../images/Resources'; // Adjusted to go up one level and into images/Resources
$dirPath = $baseDir . '/' . $dirName;

// Debugging output to verify paths
echo "Requested dirName: " . $dirName . "<br>";
echo "Base directory: " . $baseDir . "<br>";
echo "Full path: " . $dirPath . "<br>";
echo "Directory exists: " . (is_dir($dirPath) ? "Yes" : "No") . "<br>";

if (!$dirName || !is_dir($dirPath)) {
    http_response_code(404);
    echo "Directory not found.";
    exit;
}

// Set headers for streaming ZIP
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $dirName . '.zip"');

// Create ZIP archive directly to output buffer
$zip = new ZipArchive();
if ($zip->open('php://output', ZipArchive::CREATE) !== true) {
    http_response_code(500);
    echo "Failed to create ZIP file.";
    exit;
}

addFolderToZip($dirPath, $zip);
$zip->close();

exit;
?>