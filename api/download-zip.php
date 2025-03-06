<?php
// Prevent CORS issues if needed (adjust as per your server setup)
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
                    // Add empty directory and recurse
                    $zip->addEmptyDir($zipPath);
                    addFolderToZip($fullPath, $zip, $zipPath . '/');
                } else {
                    // Add file
                    $zip->addFile($fullPath, $zipPath);
                }
            }
        }
    }
}

// Get the directory from the query parameter
$dirName = isset($_GET['dir']) ? basename($_GET['dir']) : '';
$baseDir = __DIR__ . '/Resources'; // Adjust to your base directory path
$dirPath = $baseDir . '/' . $dirName;

if (!$dirName || !is_dir($dirPath)) {
    http_response_code(404);
    echo "Directory not found.";
    exit;
}

// Temporary ZIP file name
$tempZip = sys_get_temp_dir() . '/temp_' . uniqid() . '.zip';

// Create ZIP archive
$zip = new ZipArchive();
if ($zip->open($tempZip, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
    http_response_code(500);
    echo "Failed to create ZIP file.";
    exit;
}

// Add all files and folders from the directory
addFolderToZip($dirPath, $zip);

// Close the ZIP archive
$zip->close();

// Set headers for download
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $dirName . '.zip"');
header('Content-Length: ' . filesize($tempZip));

// Output the ZIP file
readfile($tempZip);

// Delete the temporary file
unlink($tempZip);

exit;
?>