from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter

# Path to the original Font Awesome font file
font_path = "/Users/alexandereiden/Documents/GitHub/minisatoshi.cash/fontawesome-free-6.7.2-web/webfonts/fa-solid-900.ttf"
output_path = "/Users/alexandereiden/Documents/GitHub/minisatoshi.cash/fontawesome-free-6.7.2-web/webfonts/custom-fa-solid.ttf"

# List of Unicode values for your icons
unicodes = [0xf0d6, 0xf4d8, 0xf084, 0xf21b, 0xf653, 0xf0eb, 0xf788]

# Load the font
font = TTFont(font_path)

# Subset the font
subsetter = Subsetter()
subsetter.populate(unicodes=unicodes)
subsetter.subset(font)

# Save the new font
font.save(output_path)
print("Custom font created with 7 icons!")