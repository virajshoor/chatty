# Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Not Found" Error (404)

#### Symptom
You see "The requested URL was not found on the server" error.

#### Solution

**1. Check which server you're accessing:**

- **Frontend should be at:** `http://localhost:3000`
- **Backend API is at:** `http://localhost:5000`

**Make sure to access the frontend at port 3000, not 5000!**

**2. Verify both servers are running:**

Open two terminals and check:

```bash
# Terminal 1 - Check backend
curl http://localhost:5000/api/health

# Should return: {"status":"healthy", ...}
```

```bash
# Terminal 2 - Check if frontend is running
# Look for "webpack compiled" or "Compiled successfully"
```

**3. If backend shows 404 for root:**

This is normal! The backend API should be accessed via:
- `GET /` - API info
- `GET /api/health` - Health check
- `POST /api/analyze` - File analysis

The frontend React app (port 3000) is what you should use in your browser!

---

### Issue: Backend Running but Frontend Shows Error

#### Symptom
Backend logs show requests, but frontend displays error messages.

#### Solution

**1. Check CORS is enabled:**
```python
# In backend/app.py, verify this line exists:
CORS(app)
```

**2. Verify API URL:**
Check that frontend is pointing to the correct backend:
```typescript
// In frontend/src/App.tsx
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

**3. Test backend directly:**
```bash
# Create a test file
echo "col1,col2,col3" > test.csv
echo "1,2,3" >> test.csv
echo "4,5,6" >> test.csv

# Test the API
curl -X POST -F "file=@test.csv" http://localhost:5000/api/analyze
```

---

### Issue: Frontend Not Starting

#### Symptom
`npm start` fails or shows errors.

#### Solution

**1. Clear cache and reinstall:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

**2. Check Node version:**
```bash
node --version  # Should be 16 or higher
```

**3. Update npm:**
```bash
npm install -g npm@latest
```

---

### Issue: Backend Not Starting

#### Symptom
`python app.py` fails or shows import errors.

#### Solution

**1. Verify virtual environment is activated:**
```bash
cd backend

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# You should see (venv) in your prompt
```

**2. Reinstall dependencies:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**3. Check Python version:**
```bash
python --version  # Should be 3.8 or higher
```

**4. If specific modules fail to install:**
```bash
# Try installing one at a time
pip install Flask==3.0.0
pip install flask-cors==4.0.0
pip install pandas==2.1.4
pip install scikit-learn==1.3.2
```

---

### Issue: Port Already in Use

#### Symptom
"Address already in use" or "Port 5000/3000 is already in use"

#### Solution

**For Backend (Port 5000):**
```bash
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**For Frontend (Port 3000):**
```bash
# The app will offer to use a different port
# Press 'Y' when prompted

# Or kill the process:
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

### Issue: File Upload Fails

#### Symptom
"No file provided" or "Invalid file type" error.

#### Solution

**1. Check file format:**
- Only CSV and JSON files are supported
- File must have correct extension (.csv or .json)
- Maximum file size is 16MB

**2. Verify file structure:**

**Valid CSV:**
```csv
column1,column2,column3
value1,value2,value3
value4,value5,value6
```

**Valid JSON:**
```json
[
  {"column1": "value1", "column2": "value2"},
  {"column1": "value3", "column2": "value4"}
]
```

**3. Test with sample files:**
```bash
# Use the provided examples
examples/sample_health_data.csv
examples/sample_sensor_data.json
```

---

### Issue: Analysis Returns No Results

#### Symptom
File uploads successfully but shows no patterns or anomalies.

#### Solution

**1. Check data requirements:**
- Need at least 2 rows of data
- Need at least one numeric column for anomaly detection
- More data = better pattern detection (10+ rows recommended)

**2. Verify data quality:**
- Remove completely empty columns
- Ensure numeric columns have numbers, not text
- Check for proper formatting

---

### Issue: Browser Shows "Cannot connect" or "Network Error"

#### Symptom
Frontend can't reach backend API.

#### Solution

**1. Verify backend is running:**
```bash
curl http://localhost:5000/api/health
```

**2. Check firewall settings:**
- Allow connections to ports 3000 and 5000
- Temporarily disable firewall to test

**3. Try different backend URL:**
Create `frontend/.env`:
```
REACT_APP_API_URL=http://127.0.0.1:5000
```

Then restart frontend:
```bash
cd frontend
npm start
```

---

### Issue: "Module not found" Errors in Frontend

#### Symptom
TypeScript or React import errors.

#### Solution

**1. Ensure all dependencies are installed:**
```bash
cd frontend
npm install react react-dom
npm install axios
npm install chart.js react-chartjs-2
npm install --save-dev @types/react @types/react-dom
```

**2. Clear TypeScript cache:**
```bash
rm -rf node_modules/.cache
npm start
```

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] Python 3.8+ installed: `python --version`
- [ ] Node.js 16+ installed: `node --version`
- [ ] Backend virtual environment activated (see `(venv)` in prompt)
- [ ] Backend dependencies installed: `pip list | grep Flask`
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed: `ls frontend/node_modules`
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:5000/api/health
- [ ] Can access http://localhost:3000
- [ ] Sample files exist in `examples/` directory

---

## Still Having Issues?

### Get Detailed Logs

**Backend logs:**
```bash
cd backend
python app.py 2>&1 | tee backend.log
# Logs will be saved to backend.log
```

**Frontend logs:**
```bash
cd frontend
npm start 2>&1 | tee frontend.log
# Logs will be saved to frontend.log
```

### Check Browser Console

1. Open browser (Chrome/Firefox)
2. Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
3. Go to "Console" tab
4. Look for error messages
5. Go to "Network" tab to see failed requests

### Verify File Contents

```bash
# Check backend app exists and is correct
head -20 backend/app.py

# Check frontend app exists
head -20 frontend/src/App.tsx

# Verify sample files exist
ls -la examples/
```

---

## Getting Help

If you're still stuck:

1. Note the exact error message
2. Check which step in QUICKSTART.md failed
3. Verify your system meets prerequisites
4. Try the manual setup instead of automated scripts
5. Review the detailed SETUP_GUIDE.md

## Success Indicators

You'll know everything is working when:

✅ Backend terminal shows: "Server running on http://localhost:5000"
✅ Frontend terminal shows: "webpack compiled successfully"
✅ Browser opens to http://localhost:3000
✅ You see the purple gradient UI with file upload
✅ Sample file upload and analysis works
✅ Dashboard displays results with charts and insights

---

**Remember:** Always access the app via http://localhost:3000 (frontend), not port 5000 (backend API)!
