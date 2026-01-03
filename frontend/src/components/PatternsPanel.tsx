import React from 'react';
import './PatternsPanel.css';

interface PatternsPanelProps {
  patterns: any[];
  correlations: any[];
}

const PatternsPanel: React.FC<PatternsPanelProps> = ({ patterns, correlations }) => {
  return (
    <div className="panel patterns-panel">
      <h3>📈 Patterns & Correlations</h3>

      {patterns.length > 0 && (
        <div className="patterns-section">
          <h4>Detected Patterns</h4>
          <div className="patterns-grid">
            {patterns.map((pattern, idx) => (
              <div key={idx} className={`pattern-card ${pattern.type}`}>
                <div className="pattern-header">
                  <span className="pattern-icon">
                    {pattern.type === 'trend' ? '📊' : '🔄'}
                  </span>
                  <span className="pattern-type">
                    {pattern.type === 'trend' ? 'Trend' : 'Cyclical'}
                  </span>
                  {pattern.confidence && (
                    <span className={`confidence-badge ${pattern.confidence}`}>
                      {pattern.confidence}
                    </span>
                  )}
                </div>
                <div className="pattern-content">
                  <p className="pattern-column">Column: <strong>{pattern.column}</strong></p>
                  <p className="pattern-description">{pattern.description}</p>
                  {pattern.type === 'trend' && (
                    <div className="pattern-details">
                      <span className="detail-item">
                        Slope: {pattern.slope.toFixed(4)}
                      </span>
                      <span className="detail-item">
                        R²: {pattern.r_squared.toFixed(4)}
                      </span>
                    </div>
                  )}
                  {pattern.type === 'cyclical' && (
                    <div className="pattern-details">
                      <span className="detail-item">
                        Autocorr: {pattern.autocorrelation.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {correlations.length > 0 && (
        <div className="correlations-section">
          <h4>Strong Correlations</h4>
          <p className="section-description">
            Variables with correlation coefficient ≥ 0.7 or ≤ -0.7
          </p>
          <div className="correlations-list">
            {correlations.map((corr, idx) => (
              <div key={idx} className="correlation-item">
                <div className="correlation-columns">
                  <span className="column-name">{corr.column1}</span>
                  <span className="correlation-arrow">↔️</span>
                  <span className="column-name">{corr.column2}</span>
                </div>
                <div className="correlation-info">
                  <div className="correlation-bar-container">
                    <div 
                      className={`correlation-bar ${corr.correlation > 0 ? 'positive' : 'negative'}`}
                      style={{ width: `${Math.abs(corr.correlation) * 100}%` }}
                    />
                  </div>
                  <span className={`correlation-value ${corr.correlation > 0 ? 'positive' : 'negative'}`}>
                    {corr.correlation.toFixed(3)}
                  </span>
                </div>
                <span className={`strength-badge ${corr.correlation > 0 ? 'positive' : 'negative'}`}>
                  {corr.strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {patterns.length === 0 && correlations.length === 0 && (
        <div className="no-patterns">
          <div className="info-icon">ℹ️</div>
          <p>No significant patterns or correlations detected</p>
          <p className="subtext">
            This could indicate independent variables or insufficient data for pattern detection.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatternsPanel;
