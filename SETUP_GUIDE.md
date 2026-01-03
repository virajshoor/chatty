# Setup Guide - AI Pattern & Sickness Detection System

Complete step-by-step guide to get the application running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16 or higher** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **pip** (comes with Python)

Verify installations:
```bash
python --version  # or python3 --version
node --version
npm --version
```

## Installation Steps

### 1. Clone or Download the Repository

```bash
cd /path/to/workspace
```

### 2. Backend Setup

#### Step 2.1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2.2: Create Virtual Environment (Recommended)
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

#### Step 2.3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- Flask (Web framework)
- Flask-CORS (Cross-origin support)
- Pandas (Data manipulation)
- NumPy (Numerical computing)
- Scikit-learn (Machine learning)
- SciPy (Scientific computing)

#### Step 2.4: Start the Backend Server
```bash
python app.py
```

You should see:
```
🚀 Starting AI Pattern & Sickness Detection API...
📊 Server running on http://localhost:5000
📝 Upload CSV or JSON files to /api/analyze
```

The backend API will be available at `http://localhost:5000`

**Keep this terminal window open!**

### 3. Frontend Setup

Open a **new terminal window** and navigate to the frontend directory.

#### Step 3.1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 3.2: Install Node Dependencies
```bash
npm install
```

This will install all required React dependencies including:
- React & React DOM
- TypeScript
- Axios (HTTP client)
- Chart.js (Data visualization)

#### Step 3.3: Start the Frontend Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to `http://localhost:3000`

## Using the Application

### Step 1: Upload Data
1. Click "Browse Files" or drag and drop a CSV or JSON file
2. Sample files are provided in the `examples/` directory:
   - `sample_health_data.csv` - Patient health monitoring data
   - `sample_sensor_data.json` - IoT sensor readings

### Step 2: Analyze
1. Click "Analyze Data" after selecting a file
2. Wait for the AI algorithms to process your data (usually 5-10 seconds)

### Step 3: Review Results
The dashboard will display:
- **Key Insights** - Important findings and warnings
- **Statistical Summary** - Comprehensive data statistics
- **Anomaly Detection** - Outliers detected by multiple algorithms
- **Patterns & Correlations** - Trends and relationships in data
- **Data Preview** - First 10 rows of your dataset

## Testing with Sample Data

### Test with Health Data (CSV)
```bash
# The file is located at: examples/sample_health_data.csv
```

This dataset contains patient health metrics including temperature, heart rate, and blood pressure. The AI will detect:
- Fever episodes (anomalous temperature readings)
- Elevated heart rate patterns
- Correlations between vital signs

### Test with Sensor Data (JSON)
```bash
# The file is located at: examples/sample_sensor_data.json
```

This dataset contains IoT sensor readings. The AI will detect:
- Temperature and vibration spikes (equipment malfunction indicators)
- Daily temperature trends
- Correlations between environmental factors

## Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'flask'`
```bash
# Solution: Make sure you activated the virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Then reinstall dependencies
pip install -r requirements.txt
```

**Problem:** Port 5000 already in use
```bash
# Solution: Kill the process using port 5000
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Problem:** `Permission denied` when installing packages
```bash
# Solution: Use --user flag
pip install --user -r requirements.txt
```

### Frontend Issues

**Problem:** `npm: command not found`
```bash
# Solution: Install Node.js from https://nodejs.org/
```

**Problem:** Port 3000 already in use
```bash
# Solution: The app will prompt you to use a different port
# Press 'Y' to use an alternative port
```

**Problem:** CORS errors in browser console
```bash
# Solution: Make sure the backend is running on port 5000
# Check that flask-cors is installed: pip install flask-cors
```

**Problem:** `npm install` fails
```bash
# Solution: Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints

### Health Check
```bash
GET http://localhost:5000/api/health

Response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00",
  "version": "1.0.0"
}
```

### Analyze Data
```bash
POST http://localhost:5000/api/analyze
Content-Type: multipart/form-data

Body: file (CSV or JSON file)

Response: {
  "status": "success",
  "timestamp": "...",
  "statistics": {...},
  "anomalies": {...},
  "patterns": [...],
  "correlations": [...],
  "insights": [...]
}
```

## File Format Requirements

### CSV Format
- Must have a header row with column names
- Numeric columns will be analyzed for patterns and anomalies
- Categorical columns will have frequency analysis

Example:
```csv
date,metric1,metric2,category
2024-01-01,100,50,normal
2024-01-02,105,52,normal
```

### JSON Format
- Must be an array of objects
- Each object represents one row
- All objects should have the same structure

Example:
```json
[
  {"date": "2024-01-01", "metric1": 100, "category": "normal"},
  {"date": "2024-01-02", "metric1": 105, "category": "normal"}
]
```

## Advanced Configuration

### Backend Configuration
Edit `backend/app.py`:
- `MAX_FILE_SIZE`: Maximum upload size (default: 16MB)
- `UPLOAD_FOLDER`: Directory for temporary uploads
- Port: Change `port=5000` in `app.run()`

### Frontend Configuration
Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

## Production Deployment

### Backend
```bash
# Install production WSGI server
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
# Build for production
npm run build

# Serve the build folder with a static file server
npx serve -s build
```

## Getting Help

If you encounter issues:

1. Check that both backend and frontend servers are running
2. Verify you're using compatible versions (Python 3.8+, Node 16+)
3. Check browser console for error messages
4. Verify file formats match the requirements
5. Ensure all dependencies are installed correctly

## Next Steps

- Upload your own data files
- Explore different datasets
- Review the analysis results
- Use insights for data-driven decision making

Enjoy using the AI Pattern & Sickness Detection System!
