<?php
// Ensure no output buffer interference
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
$baseDir = __DIR__ . '/../images/Resources'; // Confirm this path
$dirPath = $baseDir . '/' . $dirName;

if (!$dirName || !is_dir($dirPath) || !is_readable($dirPath)) {
    header('Content-Type: text/plain', true, 404);
    exit("Directory not found or not readable: $dirPath");
}

// Set headers for ZIP download
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $dirName . '.zip"');

// Create ZIP archive using a temporary file as a fallback
$tempFile = tempnam(sys_get_temp_dir(), 'zip_');
$zip = new ZipArchive();
if ($zip->open($tempFile, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
    header('Content-Type: text/plain', true, 500);
    exit("Failed to create ZIP file.");
}

// Add files to ZIP
if (!addFolderToZip($dirPath, $zip)) {
    $zip->close();
    unlink($tempFile);
    header('Content-Type: text/plain', true, 500);
    exit("Failed to add files to ZIP. Check server logs for details.");
}

// Close ZIP and stream it
$zip->close();

// Send the file content
header('Content-Length: ' . filesize($tempFile));
readfile($tempFile);

// Clean up temporary file
unlink($tempFile);

exit;
?>