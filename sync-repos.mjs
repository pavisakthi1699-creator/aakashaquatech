import fs from 'fs';
import path from 'path';

const SRC_ROOT = 'c:/Users/pavid/OneDrive/Documents/GitHub/aakashaquatech';
const TARGETS = [
  'C:/Users/pavid/Downloads/Aakash (HPA(type, Model ) pages)/Aakash (HPA(type, Model ) pages)/aakash-merged',
  'C:/Users/pavid/Downloads/Aakash-Updated/aakash-merged/aakash-merged'
];

const FILES_TO_SYNC = [
  'src/hpa/MobileNavDrawer.jsx',
  'src/hpa/MobileBottomBar.jsx',
  'src/app/components/UniversalHeader.tsx',
  'src/hpa/App.jsx',
  'src/hpa/polish.css',
  'src/app/App.tsx',
  'src/hpa/data.js'
];

for (const target of TARGETS) {
  if (!fs.existsSync(target)) {
    console.error(`Target directory does not exist: ${target}`);
    continue;
  }
  console.log(`\nSyncing to: ${target}`);
  for (const rel of FILES_TO_SYNC) {
    const srcFile = path.join(SRC_ROOT, rel);
    const destFile = path.join(target, rel);
    if (fs.existsSync(srcFile)) {
      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      fs.copyFileSync(srcFile, destFile);
      console.log(`  ✓ Copied ${rel}`);
    } else {
      console.warn(`  ✗ Source file missing: ${srcFile}`);
    }
  }
}
console.log('\nAll files synced successfully!');
