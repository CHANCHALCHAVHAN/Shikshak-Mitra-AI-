// Quick diagnostic script to check video setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Video Deployment Diagnostic\n');

// Check 1: Video file exists
const videoPath = path.join(__dirname, 'public', 'output_accurate.mp4');
const videoExists = fs.existsSync(videoPath);
console.log(`✓ Video file exists: ${videoExists ? '✅ YES' : '❌ NO'}`);

if (videoExists) {
  const stats = fs.statSync(videoPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  Size: ${fileSizeMB} MB`);
  console.log(`  Path: ${videoPath}`);
}

// Check 2: Vite config
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
const viteConfigExists = fs.existsSync(viteConfigPath);
console.log(`\n✓ Vite config exists: ${viteConfigExists ? '✅ YES' : '❌ NO'}`);

if (viteConfigExists) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  const hasAssetsInclude = viteConfig.includes('assetsInclude');
  const hasMp4Config = viteConfig.includes('.mp4');
  console.log(`  Has assetsInclude: ${hasAssetsInclude ? '✅ YES' : '❌ NO'}`);
  console.log(`  Has .mp4 config: ${hasMp4Config ? '✅ YES' : '❌ NO'}`);
}

// Check 3: Index.tsx
const indexPath = path.join(__dirname, 'src', 'pages', 'Index.tsx');
const indexExists = fs.existsSync(indexPath);
console.log(`\n✓ Index.tsx exists: ${indexExists ? '✅ YES' : '❌ NO'}`);

if (indexExists) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const hasVideoPath = indexContent.includes('/output_accurate.mp4');
  const hasVideoTag = indexContent.includes('<video');
  const hasErrorHandling = indexContent.includes('onError');
  console.log(`  Has video path: ${hasVideoPath ? '✅ YES' : '❌ NO'}`);
  console.log(`  Has video tag: ${hasVideoTag ? '✅ YES' : '❌ NO'}`);
  console.log(`  Has error handling: ${hasErrorHandling ? '✅ YES' : '❌ NO'}`);
}

// Check 4: Build folder
const distPath = path.join(__dirname, 'dist');
const distExists = fs.existsSync(distPath);
console.log(`\n✓ Build folder exists: ${distExists ? '✅ YES' : '❌ NO (run npm run build)'}`);

if (distExists) {
  // Check if video is in dist
  const distVideoPath = path.join(distPath, 'output_accurate.mp4');
  const distVideoExists = fs.existsSync(distVideoPath);
  console.log(`  Video in dist: ${distVideoExists ? '✅ YES' : '❌ NO'}`);
  
  if (!distVideoExists) {
    // Check assets folder
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);
      const videoFiles = files.filter(f => f.endsWith('.mp4'));
      if (videoFiles.length > 0) {
        console.log(`  Video in assets: ✅ YES (${videoFiles.join(', ')})`);
      } else {
        console.log(`  Video in assets: ❌ NO`);
      }
    }
  }
}

console.log('\n📋 Next Steps:');
console.log('1. Run: npm run build');
console.log('2. Run: npm run preview');
console.log('3. Open: http://localhost:4173');
console.log('4. Test video in Live Monitoring section');
console.log('5. If works locally, commit and push to deploy');
console.log('\n💡 See VIDEO_DEPLOYMENT_FIX.md for detailed guide');
