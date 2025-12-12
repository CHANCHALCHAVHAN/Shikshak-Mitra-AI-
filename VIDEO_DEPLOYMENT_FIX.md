# 🎥 Video Deployment Fix Guide

## Problem
Video plays on `localhost:5000` (Flask) but not on deployed website (React/Vite)

## Root Cause
The Flask backend and React frontend are **separate applications**. The deployed website is the React app, which doesn't have access to Flask's video streaming.

## ✅ Solution Applied

### 1. Video Configuration
- Video file: `public/output_accurate.mp4` (13.8 MB)
- Video path in code: `/output_accurate.mp4`
- Vite config updated to handle `.mp4` files properly

### 2. Changes Made

#### `vite.config.ts`
```typescript
assetsInclude: ['**/*.mp4'],
build: {
  assetsInlineLimit: 0,  // Don't inline video files
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
          return 'assets/videos/[name][extname]';
        }
        return 'assets/[name]-[hash][extname]';
      },
    },
  },
}
```

#### `src/pages/Index.tsx`
- Added error handling for video loading
- Added fallback UI if video fails
- Video uses direct path: `/output_accurate.mp4`

## 🚀 Deployment Steps

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Test Build Locally
```bash
npm run preview
```
Then open http://localhost:4173 and test the video

### Step 3: Deploy to Lovable
1. Commit changes to git:
```bash
git add .
git commit -m "Fix video deployment configuration"
git push
```

2. Lovable will auto-deploy from your git repo

### Step 4: Verify Deployment
1. Go to your Lovable project URL
2. Switch to Admin mode
3. Click "Live Monitoring"
4. Click "View AI Analysis Video" on any classroom card
5. Video should play

## 🔍 Troubleshooting

### If video still doesn't show:

#### Check 1: File Size Limit
Some platforms limit asset sizes. If 13.8 MB is too large:
```bash
# Compress video (requires ffmpeg)
ffmpeg -i public/output_accurate.mp4 -vcodec h264 -acodec aac -b:v 1M public/output_compressed.mp4
```

Then update `src/pages/Index.tsx`:
```typescript
const analysisVideo = "/output_compressed.mp4";
```

#### Check 2: MIME Type
Add to `public/.htaccess` (if using Apache):
```
AddType video/mp4 .mp4
```

#### Check 3: Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors like:
   - `404 Not Found` → Video file not deployed
   - `MIME type error` → Server configuration issue
   - `CORS error` → Cross-origin issue

#### Check 4: Network Tab
1. Open DevTools → Network tab
2. Reload page
3. Look for `output_accurate.mp4` request
4. Check:
   - Status: Should be `200 OK`
   - Type: Should be `video/mp4`
   - Size: Should be ~13.8 MB

## 🎯 Alternative Solutions

### Option A: Use External Hosting
Upload video to:
- AWS S3
- Cloudinary
- YouTube (unlisted)

Then update video source:
```typescript
const analysisVideo = "https://your-cdn.com/output_accurate.mp4";
```

### Option B: Use Flask Backend (Production)
Deploy Flask app separately and use it as API:

1. Deploy Flask to Heroku/Railway/Render
2. Update React to fetch from Flask:
```typescript
const analysisVideo = "https://your-flask-app.com/video_feed";
```

### Option C: Convert to Streaming Format
Use HLS or DASH for better streaming:
```bash
ffmpeg -i public/output_accurate.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls public/video.m3u8
```

## 📝 Current Setup

✅ Video in public folder
✅ Vite config updated
✅ Error handling added
✅ Direct video tag (not Flask streaming)

## 🎬 Expected Result

After deployment:
1. Video loads directly from static assets
2. No Flask backend needed for video
3. Video plays in browser's native player
4. Works on all devices

## 📞 Still Not Working?

Check:
1. Is video file in `public/` folder? ✓
2. Did you run `npm run build`?
3. Did you push to git?
4. Did Lovable redeploy?
5. Clear browser cache (Ctrl+Shift+R)

---

**Note**: The Flask app (`Web_Video_Monitor`) is only for local testing. The deployed website uses the React app with video served as a static asset.
