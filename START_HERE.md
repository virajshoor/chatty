# 🚀 START HERE - Quick Guide

## ⚠️ IMPORTANT: The "Not Found" Error is Fixed!

The issue has been resolved. Here's what you need to know:

---

## 🎯 THE KEY THING TO REMEMBER

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Always access the app at:                      │
│                                                  │
│  ✅  http://localhost:3000                      │
│                                                  │
│  NOT http://localhost:5000                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Port 3000** = Frontend UI (what you use)
**Port 5000** = Backend API (works behind the scenes)

---

## 🏃 Quick Start (3 Steps)

### Step 1: Start the Application

**Easiest method:**
```bash
# On macOS/Linux:
./start.sh

# On Windows:
start.bat
```

**Or manually:**
```bash
# Terminal 1:
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

# Terminal 2:
cd frontend
npm install
npm start
```

### Step 2: Open Your Browser

Go to: **http://localhost:3000**

The browser might open automatically - if so, perfect!

### Step 3: Upload and Analyze

1. You'll see a purple gradient page with file upload
2. Click "Browse Files" or drag & drop
3. Upload `examples/sample_health_data.csv`
4. Click "Analyze Data"
5. See the AI-powered insights!

---

## ✅ How to Know It's Working

You should see:

**In Backend Terminal:**
```
🚀 Starting AI Pattern & Sickness Detection API...
📊 Server running on http://localhost:5000
```

**In Frontend Terminal:**
```
webpack compiled successfully!
You can now view the app in the browser.
Local: http://localhost:3000
```

**In Your Browser (at localhost:3000):**
- Purple gradient background
- "AI Pattern & Sickness Detection" title
- File upload area with drag & drop
- Feature icons (Pattern Detection, Anomaly Analysis, etc.)

---

## 🔧 What Was Fixed

1. **Added root route to backend** - Now `localhost:5000` shows API info instead of 404
2. **Created clear documentation** - Multiple guides to help you
3. **Updated all instructions** - Emphasized using port 3000

---

## 📚 Documentation Guide

Depending on what you need:

| File | Use When |
|------|----------|
| **START_HERE.md** | First time setup (you are here!) |
| **QUICKSTART.md** | Want to start in 5 minutes |
| **HOW_TO_ACCESS.md** | Confused about which URL to use |
| **TROUBLESHOOTING.md** | Having problems or errors |
| **SETUP_GUIDE.md** | Need detailed installation help |
| **README.md** | Want to understand features |
| **PROJECT_SUMMARY.md** | Want full technical details |
| **FIX_APPLIED.md** | Want to know what was fixed |

---

## 🆘 Common Issues - Quick Fixes

### Issue: "Not Found" Error

**Solution:** Make sure you're accessing `http://localhost:3000` not `:5000`

### Issue: Port Already in Use

**Solution:**
```bash
# Kill the process and restart
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Frontend Won't Start

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Backend Won't Start

**Solution:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 🎯 Test Your Setup

Run the test script:
```bash
./test_setup.sh
```

This will check:
- Python and Node.js installation
- Required files
- If servers are running
- Everything is configured correctly

---

## 📊 What This App Does

Once you're up and running, the AI will analyze your data and detect:

- 🔍 **Anomalies** - Unusual data points that don't fit the pattern
- 📈 **Trends** - Increasing or decreasing patterns over time  
- 🔄 **Cycles** - Repeating patterns in your data
- 🔗 **Correlations** - Relationships between different variables
- 📊 **Statistics** - Mean, median, standard deviation, quartiles
- 💡 **Insights** - AI-generated recommendations

---

## 🎓 Example Use Cases

### Health Data
Upload `examples/sample_health_data.csv` to detect:
- Fever episodes (temperature anomalies)
- Heart rate irregularities
- Blood pressure patterns
- Correlations between vital signs

### Sensor Data
Upload `examples/sample_sensor_data.json` to detect:
- Equipment malfunctions (temperature spikes)
- Vibration anomalies
- Environmental patterns
- Sensor correlations

---

## ✨ Pro Tips

1. **Use the automated startup script** - It's the easiest way
2. **Try both example files** - See different types of analysis
3. **Check the Insights panel first** - It gives you the key findings
4. **Explore all the tabs** - Statistics, Anomalies, Patterns
5. **Keep both terminals open** - Don't close them while using the app

---

## 🎉 You're Ready!

Everything is set up and ready to use. Just:

1. Run `./start.sh` (or `start.bat`)
2. Open `http://localhost:3000`
3. Upload a file
4. Enjoy the AI-powered analysis!

---

## 📞 Need More Help?

- **TROUBLESHOOTING.md** - Detailed problem-solving
- **HOW_TO_ACCESS.md** - Visual guide with diagrams
- **SETUP_GUIDE.md** - Complete installation instructions

---

**Happy Analyzing! 📊🤖✨**
