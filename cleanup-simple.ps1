# FinSync Web App Cleanup Script
# Removes mobile app, keeps only web version

param([switch]$Force)

$baseDir = "C:\Users\lenovo\Downloads\FinSync"
Set-Location $baseDir

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "  FinSync Web App Cleanup Script" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Items to delete
$itemsToDelete = @(
    "mobile",
    "src",
    "node_modules",
    "package.json",
    "package-lock.json",
    "index.html",
    "vite.config.ts",
    "tsconfig.json",
    "tailwind.config.cjs",
    "postcss.config.cjs",
    "README.md",
    "cleanup-complete.ps1",
    "cleanup-project.ps1",
    "move-web-to-root.ps1",
    "CLEANUP-GUIDE.md"
)

# Verify web folder exists
if (-not (Test-Path "web")) {
    Write-Host "ERROR: web/ folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Verified web/ folder exists`n" -ForegroundColor Green

# Show what will be deleted
Write-Host "ITEMS TO DELETE:" -ForegroundColor Yellow
foreach ($item in $itemsToDelete) {
    if (Test-Path $item) {
        $type = if (Test-Path $item -PathType Container) { "[FOLDER]" } else { "[FILE]" }
        Write-Host "  $type $item" -ForegroundColor Red
    }
}

Write-Host "`nITEMS TO KEEP (will move to root):" -ForegroundColor Green
Write-Host "  [FOLDER] web/" -ForegroundColor Green

# Confirmation
if (-not $Force) {
    Write-Host "`nWARNING: This cannot be undone!" -ForegroundColor Yellow
    $confirm = Read-Host "`nType 'DELETE' to proceed"
    if ($confirm -ne "DELETE") {
        Write-Host "`nCancelled. No changes made." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "`n[STEP 1/4] Deleting old files..." -ForegroundColor Cyan

# Delete items
foreach ($item in $itemsToDelete) {
    if (Test-Path $item) {
        try {
            Remove-Item -Path $item -Recurse -Force -ErrorAction Stop
            Write-Host "  [OK] Deleted: $item" -ForegroundColor Green
        } catch {
            Write-Host "  [FAIL] Could not delete: $item" -ForegroundColor Red
        }
    }
}

Write-Host "`n[STEP 2/4] Moving web/ contents to root..." -ForegroundColor Cyan

# Move web contents
try {
    Get-ChildItem -Path "web" -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination $baseDir -Force
        Write-Host "  [OK] Moved: $($_.Name)" -ForegroundColor Green
    }
} catch {
    Write-Host "  [FAIL] Error moving files: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n[STEP 3/4] Removing empty web/ folder..." -ForegroundColor Cyan

# Remove web folder
if (Test-Path "web") {
    try {
        Remove-Item -Path "web" -Force
        Write-Host "  [OK] Removed web/ folder" -ForegroundColor Green
    } catch {
        Write-Host "  [WARN] Could not remove web/ folder" -ForegroundColor Yellow
    }
}

Write-Host "`n[STEP 4/4] Verifying setup..." -ForegroundColor Cyan

# Verify critical files
$critical = @("package.json", "vite.config.ts", "index.html", "src")
$allOK = $true

foreach ($file in $critical) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allOK = $false
    }
}

if (-not $allOK) {
    Write-Host "`nERROR: Some files are missing!" -ForegroundColor Red
    exit 1
}

# Show final structure
Write-Host "`n================================================" -ForegroundColor Green
Write-Host "  CLEANUP COMPLETE!" -ForegroundColor Green
Write-Host "================================================`n" -ForegroundColor Green

Write-Host "Final structure:" -ForegroundColor Cyan
Get-ChildItem -Force | Select-Object Name, Mode | Format-Table -AutoSize

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. npm install" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host "  3. Open http://localhost:5173/`n" -ForegroundColor White

Write-Host "================================================`n" -ForegroundColor Cyan
