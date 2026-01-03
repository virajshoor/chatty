import React from 'react';
import './AnomaliesPanel.css';

interface AnomaliesPanelProps {
  anomalies: any;
}

const AnomaliesPanel: React.FC<AnomaliesPanelProps> = ({ anomalies }) => {
  const { isolation_forest, zscore, iqr } = anomalies;

  return (
    <div className="panel anomalies-panel">
      <h3>⚠️ Anomaly Detection</h3>

      <div className="anomaly-method">
        <div className="method-header">
          <h4>Isolation Forest</h4>
          <span className={`detection-badge ${isolation_forest.count > 0 ? 'warning' : 'success'}`}>
            {isolation_forest.count} Anomalies ({isolation_forest.percentage.toFixed(2)}%)
          </span>
        </div>
        <p className="method-description">
          Machine learning algorithm that isolates anomalies by randomly partitioning the data.
        </p>
        {isolation_forest.count > 0 ? (
          <div className="anomaly-details">
            <p className="detail-text">
              Found anomalous data points at indices: {' '}
              <span className="indices-list">
                {isolation_forest.indices.slice(0, 20).join(', ')}
                {isolation_forest.indices.length > 20 && '...'}
              </span>
            </p>
          </div>
        ) : (
          <p className="no-anomalies">No anomalies detected using this method.</p>
        )}
      </div>

      {Object.keys(zscore).length > 0 && (
        <div className="anomaly-method">
          <div className="method-header">
            <h4>Z-Score Method</h4>
            <span className="detection-badge warning">
              {Object.keys(zscore).length} Column(s)
            </span>
          </div>
          <p className="method-description">
            Statistical method identifying values beyond 3 standard deviations from the mean.
          </p>
          {Object.entries(zscore).map(([column, data]: [string, any]) => (
            <div key={column} className="column-anomalies">
              <div className="column-anomaly-header">
                <strong>{column}</strong>
                <span className="anomaly-count">{data.indices.length} outliers</span>
              </div>
              <div className="anomaly-values">
                {data.indices.slice(0, 5).map((idx: number, i: number) => (
                  <span key={i} className="anomaly-chip">
                    Index {idx}: {data.values[i].toFixed(2)} (z={data.z_scores[i].toFixed(2)})
                  </span>
                ))}
                {data.indices.length > 5 && (
                  <span className="more-text">+{data.indices.length - 5} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(iqr).length > 0 && (
        <div className="anomaly-method">
          <div className="method-header">
            <h4>IQR (Interquartile Range) Method</h4>
            <span className="detection-badge warning">
              {Object.keys(iqr).length} Column(s)
            </span>
          </div>
          <p className="method-description">
            Identifies outliers below Q1 - 1.5×IQR or above Q3 + 1.5×IQR.
          </p>
          {Object.entries(iqr).map(([column, data]: [string, any]) => (
            <div key={column} className="column-anomalies">
              <div className="column-anomaly-header">
                <strong>{column}</strong>
                <span className="anomaly-count">{data.indices.length} outliers</span>
              </div>
              <div className="iqr-bounds">
                <span className="bound-info">
                  Lower: {data.lower_bound.toFixed(2)}
                </span>
                <span className="bound-info">
                  IQR: {data.iqr.toFixed(2)}
                </span>
                <span className="bound-info">
                  Upper: {data.upper_bound.toFixed(2)}
                </span>
              </div>
              <div className="anomaly-values">
                {data.indices.slice(0, 5).map((idx: number, i: number) => (
                  <span key={i} className="anomaly-chip">
                    Index {idx}: {data.values[i].toFixed(2)}
                  </span>
                ))}
                {data.indices.length > 5 && (
                  <span className="more-text">+{data.indices.length - 5} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isolation_forest.count === 0 && Object.keys(zscore).length === 0 && Object.keys(iqr).length === 0 && (
        <div className="no-anomalies-overall">
          <div className="success-icon">✅</div>
          <p>No significant anomalies detected across all methods!</p>
          <p className="subtext">Your data appears to be clean and consistent.</p>
        </div>
      )}
    </div>
  );
};

export default AnomaliesPanel;
