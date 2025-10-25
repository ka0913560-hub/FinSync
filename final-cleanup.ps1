# ================================================================
# FinSync Web App Cleanup Script
# ================================================================
# This script removes ALL mobile/Expo files and keeps ONLY the web app
# After running this, you'll have a clean Vite React project
# ================================================================

param(
    [switch]$Force,
    [switch]$DryRun
)

$ErrorActionPreference = "Continue"

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "           FinSync Web App Cleanup Script" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

$baseDir = "C:\Users\lenovo\Downloads\FinSync"

if (-not (Test-Path $baseDir)) {
    Write-Host "ERROR: Directory not found: $baseDir" -ForegroundColor Red
    exit 1
}

Set-Location $baseDir
Write-Host "📂 Working directory: $baseDir`n" -ForegroundColor Yellow

# ================================================================
# Define what to DELETE (mobile/Expo related)
# ================================================================

$foldersToDelete = @(
    "mobile"           # Entire mobile app folder
)

$rootFilesToDelete = @(
    # Old root Vite config files (duplicates of web/)
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
    
    # Cleanup scripts (no longer needed after cleanup)
    "cleanup-complete.ps1",
    "cleanup-project.ps1",
    "move-web-to-root.ps1",
    "CLEANUP-GUIDE.md"
)

# ================================================================
# Verify web/ folder exists
# ================================================================

if (-not (Test-Path "web")) {
    Write-Host "❌ ERROR: web/ folder not found!" -ForegroundColor Red
    Write-Host "   Cannot proceed without the web app folder." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Verified: web/ folder exists`n" -ForegroundColor Green

# ================================================================
# Display what will be deleted
# ================================================================

Write-Host "================================================================" -ForegroundColor Yellow
Write-Host "                  ITEMS TO BE DELETED" -ForegroundColor Yellow
Write-Host "================================================================`n" -ForegroundColor Yellow

Write-Host "📁 FOLDERS:" -ForegroundColor Red
foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        $itemCount = (Get-ChildItem -Path $folder -Recurse -Force | Measure-Object).Count
        Write-Host "   ❌ $folder/ ($itemCount items inside)" -ForegroundColor Red
    } else {
        Write-Host "   ⊘  $folder/ (not found, will skip)" -ForegroundColor Gray
    }
}

Write-Host "`n📄 FILES & FOLDERS (root level):" -ForegroundColor Red
foreach ($item in $rootFilesToDelete) {
    if (Test-Path $item) {
        $itemType = if (Test-Path $item -PathType Container) { "FOLDER" } else { "FILE" }
        Write-Host "   ❌ [$itemType] $item" -ForegroundColor Red
    } else {
        Write-Host "   ⊘  $item (not found, will skip)" -ForegroundColor Gray
    }
}

# ================================================================
# Display what will be KEPT
# ================================================================

Write-Host "`n================================================================" -ForegroundColor Green
Write-Host "                  ITEMS TO BE KEPT" -ForegroundColor Green
Write-Host "================================================================`n" -ForegroundColor Green

Write-Host "✅ web/ folder (will be moved to root)" -ForegroundColor Green
Write-Host "   Contains your complete React Vite web app`n" -ForegroundColor White

# ================================================================
# DRY RUN MODE
# ================================================================

if ($DryRun) {
    Write-Host "================================================================" -ForegroundColor Magenta
    Write-Host "                     DRY RUN MODE" -ForegroundColor Magenta
    Write-Host "================================================================" -ForegroundColor Magenta
    Write-Host "No files were deleted. This was a preview only." -ForegroundColor Magenta
    Write-Host "Run without -DryRun to perform actual cleanup.`n" -ForegroundColor Magenta
    exit 0
}

# ================================================================
# Confirmation prompt
# ================================================================

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "⚠️  WARNING: This action CANNOT be undone!" -ForegroundColor Yellow
Write-Host "================================================================`n" -ForegroundColor Cyan

Write-Host "This script will:" -ForegroundColor White
Write-Host "  1️⃣  Delete ALL mobile/Expo files" -ForegroundColor White
Write-Host "  2️⃣  Delete old root config files" -ForegroundColor White
Write-Host "  3️⃣  Move web/ contents to root directory" -ForegroundColor White
Write-Host "  4️⃣  Remove empty web/ folder" -ForegroundColor White
Write-Host "  5️⃣  Leave you with a clean Vite React project`n" -ForegroundColor White

if (-not $Force) {
    $confirmation = Read-Host "Type 'DELETE' to proceed (or anything else to cancel)"
    
    if ($confirmation -ne "DELETE") {
        Write-Host "`n❌ Cleanup cancelled. No changes were made." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "`n✅ Starting cleanup...`n" -ForegroundColor Green

# ================================================================
# STEP 1: Delete mobile folders
# ================================================================

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 1/4: Deleting Mobile/Expo Folders" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

$deletedCount = 0
$failedCount = 0

foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        Write-Host "🗑️  Deleting: $folder/" -ForegroundColor Yellow -NoNewline
        try {
            Remove-Item -Path $folder -Recurse -Force -ErrorAction Stop
            Write-Host " ✅ DELETED" -ForegroundColor Green
            $deletedCount++
        } catch {
            Write-Host " ❌ FAILED" -ForegroundColor Red
            Write-Host "   Error: $_" -ForegroundColor Red
            $failedCount++
        }
    }
}

Write-Host "`n📊 Folders: $deletedCount deleted, $failedCount failed`n" -ForegroundColor White

# ================================================================
# STEP 2: Delete root files
# ================================================================

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 2/4: Deleting Old Root Files" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

$deletedFiles = 0
$failedFiles = 0

foreach ($item in $rootFilesToDelete) {
    if (Test-Path $item) {
        $itemType = if (Test-Path $item -PathType Container) { "folder" } else { "file" }
        Write-Host "🗑️  Deleting $itemType`: $item" -ForegroundColor Yellow -NoNewline
        try {
            Remove-Item -Path $item -Recurse -Force -ErrorAction Stop
            Write-Host " ✅ DELETED" -ForegroundColor Green
            $deletedFiles++
        } catch {
            Write-Host " ❌ FAILED" -ForegroundColor Red
            Write-Host "   Error: $_" -ForegroundColor Red
            $failedFiles++
        }
    }
}

Write-Host "`n📊 Root items: $deletedFiles deleted, $failedFiles failed`n" -ForegroundColor White

# ================================================================
# STEP 3: Move web/ contents to root
# ================================================================

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 3/4: Moving Web App to Root" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

$movedCount = 0
$moveFailedCount = 0

try {
    $webItems = Get-ChildItem -Path "web" -Force
    
    foreach ($item in $webItems) {
        $destination = Join-Path $baseDir $item.Name
        Write-Host "📦 Moving: $($item.Name)" -ForegroundColor Yellow -NoNewline
        
        try {
            Move-Item -Path $item.FullName -Destination $destination -Force -ErrorAction Stop
            Write-Host " ✅ MOVED" -ForegroundColor Green
            $movedCount++
        } catch {
            Write-Host " ❌ FAILED" -ForegroundColor Red
            Write-Host "   Error: $_" -ForegroundColor Red
            $moveFailedCount++
        }
    }
    
    Write-Host "`n📊 Items moved: $movedCount, failed: $moveFailedCount`n" -ForegroundColor White
    
} catch {
    Write-Host "❌ Error accessing web/ folder: $_" -ForegroundColor Red
    exit 1
}

# ================================================================
# STEP 4: Remove empty web/ folder
# ================================================================

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 4/4: Removing Empty web/ Folder" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

if (Test-Path "web") {
    try {
        Remove-Item -Path "web" -Force -ErrorAction Stop
        Write-Host "✅ Removed empty web/ folder`n" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not remove web/ folder: $_" -ForegroundColor Yellow
        Write-Host "   You can delete it manually if it's empty`n" -ForegroundColor Yellow
    }
}

# ================================================================
# Verification & Summary
# ================================================================

Write-Host "================================================================" -ForegroundColor Green
Write-Host "                  CLEANUP COMPLETE! ✅" -ForegroundColor Green
Write-Host "================================================================`n" -ForegroundColor Green

Write-Host "📂 Final project structure:" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

Get-ChildItem -Force | ForEach-Object {
    $icon = if ($_.PSIsContainer) { "📁" } else { "📄" }
    $color = if ($_.PSIsContainer) { "Cyan" } else { "White" }
    Write-Host "  $icon $($_.Name)" -ForegroundColor $color
}

# ================================================================
# Verify critical files exist
# ================================================================

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "🔍 Verifying Web App Files" -ForegroundColor Cyan
Write-Host "================================================================`n" -ForegroundColor Cyan

$criticalFiles = @("package.json", "vite.config.ts", "index.html", "src")
$allPresent = $true

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (MISSING!)" -ForegroundColor Red
        $allPresent = $false
    }
}

if (-not $allPresent) {
    Write-Host "`n⚠️  WARNING: Some critical files are missing!" -ForegroundColor Red
    Write-Host "   Your web app may not work correctly.`n" -ForegroundColor Red
    exit 1
}

# ================================================================
# Final instructions
# ================================================================

Write-Host "`n================================================================" -ForegroundColor Green
Write-Host "🎉 SUCCESS! Your FinSync project is now clean!" -ForegroundColor Green
Write-Host "================================================================`n" -ForegroundColor Green

Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "`n  1️⃣  Install dependencies:" -ForegroundColor White
Write-Host "     npm install`n" -ForegroundColor Cyan

Write-Host "  2️⃣  Start development server:" -ForegroundColor White
Write-Host "     npm run dev`n" -ForegroundColor Cyan

Write-Host "  3️⃣  Open in browser:" -ForegroundColor White
Write-Host "     http://localhost:5173/`n" -ForegroundColor Cyan

Write-Host "================================================================" -ForegroundColor Green
Write-Host "✨ Your clean Vite React web app is ready to run!" -ForegroundColor Green
Write-Host "================================================================`n" -ForegroundColor Green

# ================================================================
# Summary statistics
# ================================================================

Write-Host "📊 Cleanup Summary:" -ForegroundColor White
Write-Host "   • Folders deleted: $deletedCount" -ForegroundColor White
Write-Host "   • Files deleted: $deletedFiles" -ForegroundColor White
Write-Host "   • Items moved: $movedCount" -ForegroundColor White
Write-Host "   • Total operations: $(($deletedCount + $deletedFiles + $movedCount))`n" -ForegroundColor White

Write-Host "================================================================`n" -ForegroundColor Cyan
