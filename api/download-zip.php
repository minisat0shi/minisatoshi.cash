<?php
// Start with a clean output buffer
if (ob_get_length()) {
    ob_end_clean();
}

// Function to recursively add files and directories to ZIP
function addFolderToZip($dir, $zip, $relativePath = '') {
    if (!is_dir($dir)) {
        error_log("Directory not readable: $dir");
        return false;
    }
    
    $files = scandir($dir);
    $success = true;
    
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $fullPath = $dir . '/' . $file;
            $zipPath = $relativePath . $file;
            
            if (is_dir($fullPath)) {
                if (!$zip->addEmptyDir($zipPath)) {
                    error_log("Failed to add directory: $zipPath");
                    $success = false;
                }
                if (!addFolderToZip($fullPath, $zip, $zipPath . '/')) {
                    $success = false;
                }
            } elseif (is_file($fullPath) && is_readable($fullPath)) {
                if (!$zip->addFile($fullPath, $zipPath)) {
                    error_log("Failed to add file: $fullPath as $zipPath");
                    $success = false;
                }
            } else {
                error_log("File not readable or not a file: $fullPath");
                $success = false;
            }
        }
    }
    return $success;
}

// Get the directory from the query parameter
$dirName = isset($_GET['dir']) ? basename($_GET['dir']) : '';
$baseDir = __DIR__ . '/../images/Resources'; // Adjust if needed
$dirPath = $baseDir . '/' . $dirName;

if (!$dirName || !is_dir($dirPath) || !is_readable($dirPath)) {
    header('Content-Type: text/plain', true, 404);
    exit("Directory not found or not readable: $dirPath");
}

// Set headers for ZIP download
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $dirName . '.zip"');

// Create ZIP archive directly to output buffer
$zip = new ZipArchive();
if ($zip->open('php://output', ZipArchive::CREATE) !== true) {
    header('Content-Type: text/plain', true, 500);
    exit("Failed to create ZIP file.");
}

// Add files to ZIP
if (!addFolderToZip($dirPath, $zip)) {
    $zip->close();
    header('Content-Type: text/plain', true, 500);
    exit("Failed to add files to ZIP. Check server logs for details.");
}

// Finalize and send ZIP
$zip->close();
exit;
?>