# Quick Start Guide

Get up and running in 5 minutes!

## Automated Setup (Recommended)

### On macOS/Linux:
```bash
chmod +x start.sh
./start.sh
```

### On Windows:
```bash
start.bat
```

The script will:
1. Check prerequisites (Python & Node.js)
2. Create virtual environment
3. Install all dependencies
4. Start both backend and frontend servers
5. Open the app in your browser

## Manual Setup

### Step 1: Start Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Step 2: Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

## Try It Out

1. Go to http://localhost:3000
2. Upload `examples/sample_health_data.csv`
3. Click "Analyze Data"
4. Explore the results!

## What's Next?

- Read the full [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Check out [README.md](README.md) for feature overview
- Explore the `examples/` directory for sample datasets

## Need Help?

- Make sure Python 3.8+ and Node.js 16+ are installed
- Check that ports 5000 and 3000 are available
- See [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting

---

**Happy Analyzing! 📊🤖**
