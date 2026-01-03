import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ResultsDashboard from './components/ResultsDashboard';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface AnalysisResults {
  status: string;
  timestamp: string;
  statistics: any;
  anomalies: any;
  correlations: any[];
  patterns: any[];
  insights: any[];
  data_preview: any[];
  column_names: string[];
}

function App() {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
      });

      setResults(response.data);
    } catch (err: any) {
      console.error('Error analyzing file:', err);
      setError(
        err.response?.data?.error || 
        err.message || 
        'An error occurred while analyzing the file'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🤖 AI Pattern & Sickness Detection</h1>
          <p>Upload CSV or JSON data to identify patterns, anomalies, and insights</p>
        </div>
      </header>

      <main className="App-main">
        {!results && !loading && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Analyzing your data with AI algorithms...</p>
            <p className="loading-subtext">This may take a few moments</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Analysis Failed</h2>
            <p>{error}</p>
            <button onClick={handleReset} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {results && !loading && (
          <ResultsDashboard results={results} onReset={handleReset} />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by Machine Learning & Statistical Analysis</p>
      </footer>
    </div>
  );
}

export default App;
