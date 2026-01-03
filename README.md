# AI Pattern & Sickness Detection System

An intelligent application that analyzes CSV and JSON data to identify patterns, anomalies, and potential issues using AI and statistical methods.

## Features

- **Multi-format Support**: Upload and analyze both CSV and JSON files
- **Pattern Detection**: Identify trends, correlations, and recurring patterns in your data
- **Anomaly Detection**: Detect outliers and unusual data points using multiple algorithms
- **Statistical Analysis**: Get comprehensive statistics including mean, median, std deviation, and more
- **Visual Dashboard**: Interactive charts and visualizations
- **AI-Powered Insights**: Machine learning algorithms for intelligent pattern recognition

## Tech Stack

- **Backend**: Python 3.x, Flask, Pandas, Scikit-learn, NumPy
- **Frontend**: React, TypeScript, Chart.js
- **Analysis**: Isolation Forest, Z-Score, IQR methods for anomaly detection

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Launch both backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Upload a CSV or JSON file
4. View detected patterns, anomalies, and statistical insights
5. Explore visualizations and download reports

## API Endpoints

- `POST /api/analyze` - Upload and analyze data file
- `GET /api/health` - Check API health status

## Example Data Format

### CSV
```csv
date,temperature,humidity,status
2024-01-01,72.5,45,normal
2024-01-02,73.1,46,normal
2024-01-03,95.2,48,anomaly
```

### JSON
```json
[
  {"date": "2024-01-01", "temperature": 72.5, "humidity": 45, "status": "normal"},
  {"date": "2024-01-02", "temperature": 73.1, "humidity": 46, "normal"},
  {"date": "2024-01-03", "temperature": 95.2, "humidity": 48, "anomaly"}
]
```

## License

MIT
