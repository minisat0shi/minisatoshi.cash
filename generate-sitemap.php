<?php
$siteUrl = 'https://minisatoshi.cash';
$dir = __DIR__;

// Function to get HTML files, excluding specific ones
function getHtmlFiles($dir) {
    $files = [];
    $exclude = ['index.html', '400.html', '401.html', '403.html', '404.html', '500.html', 'submit-to-bing.php', 'submit-to-google.php', 'generate-sitemap.php', 'resources.php'];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isFile() && preg_match('/\.html$/', $file->getFilename()) 
            && !in_array($file->getFilename(), $exclude)) {
            $files[] = $file->getPathname();
        }
    }
    return $files;
}

// Generate URLs
$htmlFiles = getHtmlFiles($dir);
$urls = array_map(function($file) use ($siteUrl, $dir) {
    $relativePath = str_replace($dir, '', $file);
    $cleanPath = preg_replace('/\.html$/', '', $relativePath);
    return $siteUrl . str_replace('\\', '/', $cleanPath);
}, $htmlFiles);

// Add home page
if (!in_array("$siteUrl/", $urls)) {
    $urls[] = "$siteUrl/";
}

// Add favicon
$faviconUrl = "$siteUrl/favicon/favicon.ico";
if (!in_array($faviconUrl, $urls)) {
    $urls[] = $faviconUrl;
}

// Build sitemap XML
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $url) {
    $xml .= "  <url>\n";
    $xml .= "    <loc>$url</loc>\n";
    $xml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
    $xml .= "    <changefreq>weekly</changefreq>\n";
    // Set lower priority for favicon compared to pages
    $priority = ($url === "$siteUrl/") ? "1.0" : ($url === $faviconUrl ? "0.5" : "0.9");
    $xml .= "    <priority>$priority</priority>\n";
    $xml .= "  </url>\n";
}
$xml .= '</urlset>';

// Save to sitemap.xml
file_put_contents("$dir/sitemap.xml", $xml);
echo "Sitemap generated with " . count($urls) . " URLs.";
?>