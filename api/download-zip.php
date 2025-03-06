<?php
// Clear any output buffer to prevent corruption
ob_clean();

// Set headers for streaming ZIP
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="Branding.zip"'); // Hardcoded for now; adjust below

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
$baseDir = __DIR__ . '/../images/Resources'; // Adjust if needed
$dirPath = $baseDir . '/' . $dirName;

if (!$dirName || !is_dir($dirPath)) {
    http_response_code(404);
    exit("Directory not found."); // Plain text response for error
}

// Update filename dynamically
header('Content-Disposition: attachment; filename="' . $dirName . '.zip"');

// Create ZIP archive directly to output buffer
$zip = new ZipArchive();
if ($zip->open('php://output', ZipArchive::CREATE) !== true) {
    http_response_code(500);
    exit("Failed to create ZIP file.");
}

addFolderToZip($dirPath, $zip);
$zip->close();

exit;
?>