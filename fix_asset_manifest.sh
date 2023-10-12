#!/bin/bash

# Check if the file exists
if [ ! -f "asset-manifest.json" ]; then
  echo "asset-manifest.json not found."
  exit 1
fi

# Specify the line after which you want to add the new lines
target_line="  \"files\": {"

# Specify the lines you want to add after the target line
lines_to_add=(
  "    \"static/media/fut_icon.png\": \"static/media/fut_icon.png\","
)

# Temporary file to store the modified manifest
temp_file="asset_manifest_temp.json"

# Use awk to add the lines after the target line
awk -v target="$target_line" -v lines="${lines_to_add[*]}" '1; $0 ~ target { for (i=1; i in lines; i++) print lines[i] }' asset-manifest.json > "$temp_file"

# Replace the original manifest.json with the modified file
mv "$temp_file" asset-manifest.json
