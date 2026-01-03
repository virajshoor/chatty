from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from scipy import stats
import json
import os
from werkzeug.utils import secure_filename
import traceback
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'json'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_data(filepath, file_type):
    """Load data from CSV or JSON file"""
    try:
        if file_type == 'csv':
            df = pd.read_csv(filepath)
        elif file_type == 'json':
            df = pd.read_json(filepath)
        else:
            raise ValueError("Unsupported file type")
        return df
    except Exception as e:
        raise Exception(f"Error loading file: {str(e)}")

def detect_anomalies_isolation_forest(df, numeric_columns):
    """Detect anomalies using Isolation Forest algorithm"""
    if len(numeric_columns) == 0:
        return [], []
    
    data = df[numeric_columns].fillna(df[numeric_columns].mean())
    
    if len(data) < 2:
        return [], []
    
    # Standardize the data
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)
    
    # Apply Isolation Forest
    contamination = min(0.1, max(0.01, 10 / len(data)))  # Adaptive contamination
    iso_forest = IsolationForest(contamination=contamination, random_state=42)
    predictions = iso_forest.fit_predict(data_scaled)
    
    anomaly_indices = np.where(predictions == -1)[0].tolist()
    anomaly_scores = iso_forest.score_samples(data_scaled).tolist()
    
    return anomaly_indices, anomaly_scores

def detect_anomalies_zscore(df, numeric_columns, threshold=3):
    """Detect anomalies using Z-score method"""
    anomalies = {}
    
    for col in numeric_columns:
        data = df[col].dropna()
        if len(data) < 2:
            continue
            
        z_scores = np.abs(stats.zscore(data))
        anomaly_indices = np.where(z_scores > threshold)[0].tolist()
        
        if anomaly_indices:
            anomalies[col] = {
                'indices': anomaly_indices,
                'values': data.iloc[anomaly_indices].tolist(),
                'z_scores': z_scores[anomaly_indices].tolist()
            }
    
    return anomalies

def detect_anomalies_iqr(df, numeric_columns):
    """Detect anomalies using Interquartile Range (IQR) method"""
    anomalies = {}
    
    for col in numeric_columns:
        data = df[col].dropna()
        if len(data) < 4:
            continue
            
        Q1 = data.quantile(0.25)
        Q3 = data.quantile(0.75)
        IQR = Q3 - Q1
        
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        outliers = data[(data < lower_bound) | (data > upper_bound)]
        
        if len(outliers) > 0:
            anomalies[col] = {
                'indices': outliers.index.tolist(),
                'values': outliers.tolist(),
                'lower_bound': float(lower_bound),
                'upper_bound': float(upper_bound),
                'iqr': float(IQR)
            }
    
    return anomalies

def find_correlations(df, numeric_columns, threshold=0.7):
    """Find strong correlations between numeric columns"""
    if len(numeric_columns) < 2:
        return []
    
    corr_matrix = df[numeric_columns].corr()
    correlations = []
    
    for i in range(len(corr_matrix.columns)):
        for j in range(i + 1, len(corr_matrix.columns)):
            corr_value = corr_matrix.iloc[i, j]
            if abs(corr_value) >= threshold and not np.isnan(corr_value):
                correlations.append({
                    'column1': corr_matrix.columns[i],
                    'column2': corr_matrix.columns[j],
                    'correlation': float(corr_value),
                    'strength': 'strong positive' if corr_value > 0 else 'strong negative'
                })
    
    return correlations

def detect_patterns(df, numeric_columns):
    """Detect various patterns in the data"""
    patterns = []
    
    for col in numeric_columns:
        data = df[col].dropna()
        if len(data) < 3:
            continue
        
        # Detect trends
        x = np.arange(len(data))
        slope, intercept, r_value, p_value, std_err = stats.linregress(x, data)
        
        if abs(r_value) > 0.7 and p_value < 0.05:
            trend_type = 'increasing' if slope > 0 else 'decreasing'
            patterns.append({
                'type': 'trend',
                'column': col,
                'description': f'{trend_type.capitalize()} trend detected',
                'slope': float(slope),
                'r_squared': float(r_value ** 2),
                'confidence': 'high' if abs(r_value) > 0.85 else 'moderate'
            })
        
        # Detect seasonality/cyclical patterns (simplified)
        if len(data) >= 10:
            # Check for repeating patterns using autocorrelation
            from pandas.plotting import autocorrelation_plot
            autocorr = [data.autocorr(lag=i) for i in range(1, min(len(data) // 2, 20))]
            max_autocorr = max(autocorr) if autocorr else 0
            
            if max_autocorr > 0.7:
                patterns.append({
                    'type': 'cyclical',
                    'column': col,
                    'description': 'Cyclical pattern detected',
                    'autocorrelation': float(max_autocorr)
                })
    
    return patterns

def get_statistical_summary(df):
    """Generate comprehensive statistical summary"""
    numeric_columns = df.select_dtypes(include=[np.number]).columns.tolist()
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    
    summary = {
        'overview': {
            'total_rows': len(df),
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_columns),
            'categorical_columns': len(categorical_columns),
            'missing_values': int(df.isnull().sum().sum()),
            'duplicate_rows': int(df.duplicated().sum())
        },
        'numeric_stats': {},
        'categorical_stats': {}
    }
    
    # Numeric statistics
    for col in numeric_columns:
        data = df[col].dropna()
        if len(data) > 0:
            summary['numeric_stats'][col] = {
                'mean': float(data.mean()),
                'median': float(data.median()),
                'std': float(data.std()),
                'min': float(data.min()),
                'max': float(data.max()),
                'q25': float(data.quantile(0.25)),
                'q75': float(data.quantile(0.75)),
                'missing': int(df[col].isnull().sum()),
                'missing_percent': float(df[col].isnull().sum() / len(df) * 100)
            }
    
    # Categorical statistics
    for col in categorical_columns:
        value_counts = df[col].value_counts()
        summary['categorical_stats'][col] = {
            'unique_values': int(df[col].nunique()),
            'most_common': value_counts.index[0] if len(value_counts) > 0 else None,
            'most_common_count': int(value_counts.iloc[0]) if len(value_counts) > 0 else 0,
            'missing': int(df[col].isnull().sum()),
            'missing_percent': float(df[col].isnull().sum() / len(df) * 100)
        }
    
    return summary

def analyze_data(df):
    """Main analysis function"""
    try:
        # Get column types
        numeric_columns = df.select_dtypes(include=[np.number]).columns.tolist()
        
        # Statistical summary
        stats_summary = get_statistical_summary(df)
        
        # Detect anomalies using multiple methods
        iso_anomalies, iso_scores = detect_anomalies_isolation_forest(df, numeric_columns)
        zscore_anomalies = detect_anomalies_zscore(df, numeric_columns)
        iqr_anomalies = detect_anomalies_iqr(df, numeric_columns)
        
        # Find correlations
        correlations = find_correlations(df, numeric_columns)
        
        # Detect patterns
        patterns = detect_patterns(df, numeric_columns)
        
        # Generate insights
        insights = []
        
        # Anomaly insights
        if iso_anomalies:
            insights.append({
                'type': 'warning',
                'category': 'anomalies',
                'message': f'Detected {len(iso_anomalies)} anomalous data points using Isolation Forest',
                'severity': 'high' if len(iso_anomalies) > len(df) * 0.1 else 'medium'
            })
        
        # Missing data insights
        missing_total = stats_summary['overview']['missing_values']
        if missing_total > 0:
            missing_percent = (missing_total / (len(df) * len(df.columns))) * 100
            insights.append({
                'type': 'warning',
                'category': 'data_quality',
                'message': f'{missing_total} missing values found ({missing_percent:.1f}% of total data)',
                'severity': 'high' if missing_percent > 10 else 'low'
            })
        
        # Correlation insights
        if correlations:
            insights.append({
                'type': 'info',
                'category': 'patterns',
                'message': f'Found {len(correlations)} strong correlations between variables',
                'severity': 'info'
            })
        
        # Pattern insights
        if patterns:
            for pattern in patterns:
                insights.append({
                    'type': 'info',
                    'category': 'patterns',
                    'message': f"{pattern['description']} in column '{pattern['column']}'",
                    'severity': 'info'
                })
        
        # Compile results
        results = {
            'status': 'success',
            'timestamp': datetime.now().isoformat(),
            'statistics': stats_summary,
            'anomalies': {
                'isolation_forest': {
                    'indices': iso_anomalies,
                    'count': len(iso_anomalies),
                    'percentage': float(len(iso_anomalies) / len(df) * 100) if len(df) > 0 else 0
                },
                'zscore': zscore_anomalies,
                'iqr': iqr_anomalies
            },
            'correlations': correlations,
            'patterns': patterns,
            'insights': insights,
            'data_preview': df.head(10).to_dict(orient='records'),
            'column_names': df.columns.tolist()
        }
        
        return results
        
    except Exception as e:
        raise Exception(f"Analysis error: {str(e)}")

@app.route('/', methods=['GET'])
def index():
    """Root endpoint - API information"""
    return jsonify({
        'name': 'AI Pattern & Sickness Detection API',
        'version': '1.0.0',
        'status': 'running',
        'description': 'Upload CSV or JSON files to detect patterns, anomalies, and insights',
        'endpoints': {
            'GET /': 'API information (this page)',
            'GET /api/health': 'Health check',
            'POST /api/analyze': 'Upload and analyze data file (multipart/form-data)'
        },
        'supported_formats': ['CSV', 'JSON'],
        'max_file_size': '16MB',
        'features': [
            'Anomaly Detection (Isolation Forest, Z-Score, IQR)',
            'Pattern Recognition (Trends, Cycles)',
            'Correlation Analysis',
            'Statistical Insights',
            'AI-Generated Recommendations'
        ],
        'frontend_url': 'http://localhost:3000'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_file():
    """Analyze uploaded file"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only CSV and JSON files are allowed'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Determine file type
        file_type = filename.rsplit('.', 1)[1].lower()
        
        # Load and analyze data
        df = load_data(filepath, file_type)
        results = analyze_data(df)
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify(results)
        
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error: {error_trace}")
        return jsonify({
            'error': str(e),
            'details': 'An error occurred during analysis'
        }), 500

if __name__ == '__main__':
    print("🚀 Starting AI Pattern & Sickness Detection API...")
    print("📊 Server running on http://localhost:5000")
    print("📝 Upload CSV or JSON files to /api/analyze")
    app.run(debug=True, host='0.0.0.0', port=5000)
