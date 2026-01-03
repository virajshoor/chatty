import React, { useCallback, useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv') || file.name.endsWith('.json')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV or JSON file');
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
  };

  return (
    <div className="file-upload-container">
      <div className="upload-card">
        <div className="upload-icon">📊</div>
        <h2>Upload Your Data</h2>
        <p className="upload-description">
          Support for CSV and JSON files with automatic pattern detection
        </p>

        {!selectedFile ? (
          <>
            <div
              className={`dropzone ${isDragging ? 'dragging' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="dropzone-content">
                <svg
                  className="upload-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="dropzone-text">
                  Drag and drop your file here
                </p>
                <p className="dropzone-subtext">or</p>
                <label htmlFor="file-input" className="file-input-label">
                  Browse Files
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileSelect}
                  className="file-input-hidden"
                />
              </div>
            </div>

            <div className="supported-formats">
              <span className="format-badge">CSV</span>
              <span className="format-badge">JSON</span>
            </div>
          </>
        ) : (
          <div className="file-selected">
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div className="file-details">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={handleReset} className="btn-secondary">
                Change File
              </button>
              <button onClick={handleAnalyze} className="btn-primary">
                Analyze Data
              </button>
            </div>
          </div>
        )}

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <p>Pattern Detection</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <p>Anomaly Analysis</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📈</span>
            <p>Statistical Insights</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <p>AI-Powered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
