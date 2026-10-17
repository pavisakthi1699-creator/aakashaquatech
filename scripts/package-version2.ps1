# Create deployment zip for version2.0
$root = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $root "dist"
$backendDir = Join-Path $root "backend"
$tempDir = Join-Path $root "temp_version2.0"
$zipOutput = Join-Path $root "version2.0.zip"

Write-Host "Creating deployment package..." -ForegroundColor Cyan

if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
if (Test-Path $zipOutput) { Remove-Item -Force $zipOutput }

New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy dist contents to temp root
Copy-Item -Path "$distDir\*" -Destination $tempDir -Recurse -Force
# Copy backend into temp/backend
Copy-Item -Path $backendDir -Destination (Join-Path $tempDir "backend") -Recurse -Force

# Create zip
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipOutput -Force

# Clean temp
Remove-Item -Recurse -Force $tempDir

Write-Host "Done! Deployment package created at: $zipOutput" -ForegroundColor Green
