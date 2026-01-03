# How to Access the Application

## 🎯 The Right Way to Access

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  OPEN YOUR BROWSER TO:                         │
│                                                 │
│  http://localhost:3000  ← USE THIS!           │
│                                                 │
│  This is the React frontend (the UI)           │
│                                                 │
└─────────────────────────────────────────────────┘
```

## ❌ Common Mistake

Many users try to access `http://localhost:5000` - **DON'T DO THIS!**

Port 5000 is the **backend API only** and will show "Not Found" errors when accessed directly in a browser.

## 📊 Architecture Diagram

```
┌──────────────────┐         ┌──────────────────┐
│   Your Browser   │         │   Your Browser   │
│  localhost:3000  │         │  localhost:5000  │
└────────┬─────────┘         └────────┬─────────┘
         │                            │
         │ ✅ CORRECT                 │ ❌ WRONG
         │                            │
         ▼                            ▼
┌──────────────────┐         ┌──────────────────┐
│  React Frontend  │────────▶│  Flask Backend   │
│  (Port 3000)     │  API    │  (Port 5000)     │
│                  │  Calls  │                  │
│  • Beautiful UI  │         │  • Data Analysis │
│  • File Upload   │         │  • ML Algorithms │
│  • Dashboard     │         │  • JSON API      │
└──────────────────┘         └──────────────────┘
```

## 🚀 Step-by-Step Access Guide

### Step 1: Start Both Servers

**Option A - Automated (Recommended):**
```bash
./start.sh          # macOS/Linux
# or
start.bat           # Windows
```

**Option B - Manual:**
```bash
# Terminal 1 - Start Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
# Wait for: "Server running on http://localhost:5000"

# Terminal 2 - Start Frontend
cd frontend
npm install
npm start
# Wait for: "webpack compiled successfully"
```

### Step 2: Verify Servers Are Running

You should see these messages:

**Backend Terminal:**
```
🚀 Starting AI Pattern & Sickness Detection API...
📊 Server running on http://localhost:5000
📝 Upload CSV or JSON files to /api/analyze
```

**Frontend Terminal:**
```
webpack compiled successfully
Compiled successfully!

You can now view the app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Step 3: Open Your Browser

**The browser should automatically open to `http://localhost:3000`**

If it doesn't, manually navigate to:
- ✅ `http://localhost:3000` (USE THIS)
- ✅ `http://127.0.0.1:3000` (Alternative)

**DO NOT go to:**
- ❌ `http://localhost:5000` (This is just the API)
- ❌ `http://127.0.0.1:5000` (This is just the API)

### Step 4: You Should See

✅ A beautiful purple gradient page
✅ Title: "AI Pattern & Sickness Detection"
✅ A file upload area with drag & drop
✅ "Browse Files" button
✅ Icons showing features (Pattern Detection, Anomaly Analysis, etc.)

## 🔍 What Each Port Does

### Port 3000 (Frontend) - For Users
- **Purpose**: User interface
- **Access**: Open in browser
- **Shows**: Beautiful UI, file upload, results dashboard
- **What to do**: Upload files, view results, interact with app

### Port 5000 (Backend) - For API
- **Purpose**: Data processing and AI analysis
- **Access**: Called automatically by frontend
- **Shows**: JSON responses (not meant for direct browser access)
- **What to do**: Nothing - the frontend handles this for you

## 🧪 Testing Backend API (Optional)

If you want to test the backend API directly (for development):

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00",
  "version": "1.0.0"
}
```

### Test API Info
```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "name": "AI Pattern & Sickness Detection API",
  "version": "1.0.0",
  "status": "running",
  ...
}
```

### Test File Analysis
```bash
curl -X POST -F "file=@examples/sample_health_data.csv" http://localhost:5000/api/analyze
```

## ❓ Troubleshooting "Not Found" Error

If you see "Not Found" error:

1. **Check which URL you're using:**
   - Using `localhost:5000`? → Switch to `localhost:3000`
   - Using `localhost:3000` but still seeing error? → Continue below

2. **Verify frontend is running:**
   ```bash
   # Should see "webpack compiled successfully"
   ```

3. **Check for error messages:**
   - Look in the frontend terminal
   - Press F12 in browser → Check Console tab

4. **Restart frontend:**
   ```bash
   cd frontend
   # Press Ctrl+C to stop
   npm start
   ```

5. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Del (Cmd+Shift+Del on Mac)
   - Firefox: Ctrl+Shift+Del (Cmd+Shift+Del on Mac)
   - Select "Cached images and files"
   - Click "Clear data"

6. **Try incognito/private mode:**
   - Chrome: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P

## 📱 Accessing from Another Device

If you want to access the app from another device on the same network:

1. Find your IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Look for something like `192.168.1.100`

3. Access from other device:
   ```
   http://192.168.1.100:3000
   ```

## ✅ Success Checklist

You know everything is working when:

- [x] Backend terminal shows "Server running on http://localhost:5000"
- [x] Frontend terminal shows "webpack compiled successfully"
- [x] Browser opens automatically to port 3000
- [x] You see purple gradient UI
- [x] File upload area is visible
- [x] No error messages in browser console (F12)

## 🆘 Still Having Issues?

See these detailed guides:
- **TROUBLESHOOTING.md** - Detailed solutions for common problems
- **SETUP_GUIDE.md** - Complete installation instructions
- **QUICKSTART.md** - Fast setup guide

---

**Remember: Always use http://localhost:3000 in your browser!** 🎯
