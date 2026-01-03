import React from 'react';
import './ResultsDashboard.css';
import StatisticsPanel from './StatisticsPanel';
import AnomaliesPanel from './AnomaliesPanel';
import PatternsPanel from './PatternsPanel';
import InsightsPanel from './InsightsPanel';

interface ResultsDashboardProps {
  results: any;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, onReset }) => {
  const anomalyCount = results.anomalies?.isolation_forest?.count || 0;
  const patternCount = results.patterns?.length || 0;
  const correlationCount = results.correlations?.length || 0;
  const insightCount = results.insights?.length || 0;

  return (
    <div className="results-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Analysis Results</h2>
          <p className="analysis-timestamp">
            Analyzed at {new Date(results.timestamp).toLocaleString()}
          </p>
        </div>
        <button onClick={onReset} className="new-analysis-btn">
          New Analysis
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card anomalies">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <p className="metric-label">Anomalies Detected</p>
            <p className="metric-value">{anomalyCount}</p>
          </div>
        </div>

        <div className="metric-card patterns">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <p className="metric-label">Patterns Found</p>
            <p className="metric-value">{patternCount}</p>
          </div>
        </div>

        <div className="metric-card correlations">
          <div className="metric-icon">🔗</div>
          <div className="metric-content">
            <p className="metric-label">Correlations</p>
            <p className="metric-value">{correlationCount}</p>
          </div>
        </div>

        <div className="metric-card insights">
          <div className="metric-icon">💡</div>
          <div className="metric-content">
            <p className="metric-label">Insights</p>
            <p className="metric-value">{insightCount}</p>
          </div>
        </div>
      </div>

      <InsightsPanel insights={results.insights} />

      <div className="panels-grid">
        <StatisticsPanel statistics={results.statistics} />
        <AnomaliesPanel anomalies={results.anomalies} />
      </div>

      <PatternsPanel 
        patterns={results.patterns} 
        correlations={results.correlations}
      />

      {results.data_preview && results.data_preview.length > 0 && (
        <div className="panel data-preview-panel">
          <h3>Data Preview (First 10 Rows)</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {results.column_names.map((col: string, idx: number) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.data_preview.map((row: any, rowIdx: number) => (
                  <tr key={rowIdx}>
                    {results.column_names.map((col: string, colIdx: number) => (
                      <td key={colIdx}>
                        {typeof row[col] === 'number' 
                          ? row[col].toFixed(2) 
                          : String(row[col] ?? 'N/A')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDashboard;
