#!/bin/bash

# Check if the file exists
if [ ! -f "manifest.json" ]; then
  echo "manifest.json not found."
  exit 1
fi

# Specify the line after which you want to add the new lines
#target_line="  \"orientation\": \"portrait\","
#
## Specify the lines you want to add after the target line
#lines_to_add=(
#  "  \"icons\": ["
#  "     {"
#  "       \"src\": \"/static/media/fut_icon.png\","
#  "       \"type\": \"image/png\","
#  "       \"sizes\": \"768x768\","
#  "       \"purpose\": \"any maskable\""
#  "     }"
#  "   ],"
#)

# Temporary file to store the modified manifest
#temp_file="manifest_temp.json"

# Use awk to add the lines after the target line
sed -i '/  "orientation": "portrait",/a "icons": [ { "src": "/static/media/fut_icon.png", "type": "image/png", "sizes": "768x768", "purpose": "any maskable" } ],' 'manifest.json'
# awk -v target="$target_line" -v lines="${lines_to_add[*]}" '1; $0 ~ target { for (i=1; i in lines_to_add; i++) print lines[i] }' manifest.json > "$temp_file"

# Replace the original manifest.json with the modified file
#mv "$temp_file" manifest.json
