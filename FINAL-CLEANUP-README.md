# 🧹 FinSync Cleanup Instructions

## Quick Start (3 Commands)

```powershell
# 1. Run cleanup script
cd "C:\Users\lenovo\Downloads\FinSync"
powershell -ExecutionPolicy Bypass -File final-cleanup.ps1

# Type 'DELETE' when prompted

# 2. Install dependencies
npm install

# 3. Start app
npm run dev
```

Your app will be at: **http://localhost:5173/** 🚀

---

## What Gets Deleted ❌

### Mobile App Files:
- `mobile/` folder (entire Expo React Native app)
  - Contains: app.json, babel.config.js, src/, assets/, etc.

### Old Root Files (duplicates):
- `src/` folder (old root source)
- `node_modules/` (old dependencies)
- `package.json` (old package file)
- `package-lock.json` (old lock file)
- `index.html` (old HTML)
- `vite.config.ts` (old Vite config)
- `tsconfig.json` (old TypeScript config)
- `tailwind.config.cjs` (old Tailwind)
- `postcss.config.cjs` (old PostCSS)
- `README.md` (old readme)
- Cleanup scripts (cleanup-complete.ps1, etc.)

### What Gets Kept ✅

**Everything from `web/` folder** (moved to root):
- `src/` - React components, pages, context
- `package.json` - Web app dependencies
- `vite.config.ts` - Vite configuration
- `index.html` - HTML template
- `tailwind.config.js` - Tailwind CSS
- All other web app files

---

## Before & After Structure

### BEFORE:
```
FinSync/
├── mobile/                    ❌ DELETE
│   ├── app.json
│   ├── babel.config.js
│   ├── src/
│   └── assets/
├── web/                       ✅ KEEP (move to root)
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── src/                       ❌ DELETE (old)
├── package.json               ❌ DELETE (old)
└── ... (old root files)       ❌ DELETE
```

### AFTER:
```
FinSync/
├── src/                       ✅ (from web/)
│   ├── components/
│   ├── context/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── node_modules/              ✅ (after npm install)
├── package.json               ✅ (from web/)
├── package-lock.json          ✅ (after npm install)
├── index.html                 ✅ (from web/)
├── vite.config.ts             ✅ (from web/)
├── tsconfig.json              ✅ (from web/)
├── tailwind.config.js         ✅ (from web/)
├── postcss.config.js          ✅ (from web/)
├── README.md                  ✅ (from web/)
├── .gitignore                 ✅ (from web/)
└── final-cleanup.ps1          (this script - can delete after)
```

---

## Script Features 🛡️

- ✅ **Safe**: Checks if files exist before deletion
- ✅ **Interactive**: Requires typing 'DELETE' to confirm
- ✅ **Dry Run Mode**: Test with `-DryRun` flag (no actual deletion)
- ✅ **Colored Output**: Easy to read progress
- ✅ **Error Handling**: Continues even if some items fail
- ✅ **Verification**: Confirms critical files exist after cleanup
- ✅ **Statistics**: Shows summary of operations performed

---

## Script Options

### Standard Cleanup (with confirmation):
```powershell
powershell -ExecutionPolicy Bypass -File final-cleanup.ps1
```

### Dry Run (preview only, no deletion):
```powershell
powershell -ExecutionPolicy Bypass -File final-cleanup.ps1 -DryRun
```

### Force Mode (skip confirmation):
```powershell
powershell -ExecutionPolicy Bypass -File final-cleanup.ps1 -Force
```

---

## Verification Checklist ✅

After cleanup, verify:

```powershell
# Check package.json exists
cat package.json

# Check it has "finsync-web" and correct scripts
# Should see: "dev": "vite"

# Install dependencies
npm install

# Should complete without errors

# Start dev server
npm run dev

# Should start at http://localhost:5173/
```

### Expected Output:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Troubleshooting 🔧

### "Script won't run" / Execution Policy Error:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### "Permission denied" errors:
- Run PowerShell as Administrator
- Close any programs using files in FinSync folder

### "web/ folder not found":
- Don't run this script if you already ran cleanup-complete.ps1
- Your web files may already be in the root

### Port 5173 already in use:
```powershell
npm run dev -- --port 3000
```

---

## What if Something Goes Wrong? 🆘

**Don't panic!** The `web/` folder is processed last and moved safely.

If cleanup fails mid-way:
1. Check if `web/` folder still exists
2. If yes, manually move its contents to root:
   ```powershell
   Move-Item -Path web\* -Destination . -Force
   Remove-Item web -Force
   ```
3. Then run `npm install` and `npm run dev`

---

## Final Result 🎯

After successful cleanup:

✅ Clean project structure  
✅ Only web app files remain  
✅ No mobile/Expo dependencies  
✅ No duplicate config files  
✅ Ready to run with `npm run dev`  
✅ Works at http://localhost:5173/  
✅ Ready for production deployment  

**Total cleanup time: ~1 minute** ⚡

---

## Important Notes ⚠️

1. **Backup Optional**: Script is safe, but backup if you're nervous
2. **One-Time Operation**: Only run this once
3. **Irreversible**: Deleted files cannot be recovered
4. **Confirmation Required**: Must type 'DELETE' to proceed
5. **Web App Preserved**: Your working app is moved safely to root

---

**Ready?** Run the script and clean up your project! 🚀
