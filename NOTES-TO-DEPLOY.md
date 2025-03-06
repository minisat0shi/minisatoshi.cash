
IMAGES:

If updating an image with the same file name, when manually adding the image via HTML (such as Ecosystem page), to avoid caching issues where the old image still displays, the following must be appended to the end of the file extension: ```?v=x``` (where "x" can be an iterated number.

If updating an image that has a different file name, where the old image is *NOT* used elsewhere, it is good practice to manually delete the old image/file from cPanel File Repository directly. If updating a large number, before deploying changes, delete the image folder in cPanel then deploy new commits and cPanel will re-download the file.
