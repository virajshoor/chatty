import React from 'react';
import './StatisticsPanel.css';

interface StatisticsPanelProps {
  statistics: any;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
  const { overview, numeric_stats, categorical_stats } = statistics;

  return (
    <div className="panel statistics-panel">
      <h3>📊 Statistical Summary</h3>

      <div className="overview-section">
        <h4>Dataset Overview</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Rows</span>
            <span className="stat-value">{overview.total_rows.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Columns</span>
            <span className="stat-value">{overview.total_columns}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Numeric Columns</span>
            <span className="stat-value">{overview.numeric_columns}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categorical Columns</span>
            <span className="stat-value">{overview.categorical_columns}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Missing Values</span>
            <span className="stat-value warning">{overview.missing_values}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Duplicate Rows</span>
            <span className="stat-value warning">{overview.duplicate_rows}</span>
          </div>
        </div>
      </div>

      {Object.keys(numeric_stats).length > 0 && (
        <div className="numeric-section">
          <h4>Numeric Columns</h4>
          {Object.entries(numeric_stats).map(([column, stats]: [string, any]) => (
            <div key={column} className="column-stats">
              <div className="column-header">
                <strong>{column}</strong>
                {stats.missing > 0 && (
                  <span className="missing-badge">
                    {stats.missing_percent.toFixed(1)}% missing
                  </span>
                )}
              </div>
              <div className="stats-grid-small">
                <div className="stat-mini">
                  <span className="label">Mean</span>
                  <span className="value">{stats.mean.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Median</span>
                  <span className="value">{stats.median.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Std Dev</span>
                  <span className="value">{stats.std.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Min</span>
                  <span className="value">{stats.min.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Max</span>
                  <span className="value">{stats.max.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Q25</span>
                  <span className="value">{stats.q25.toFixed(2)}</span>
                </div>
                <div className="stat-mini">
                  <span className="label">Q75</span>
                  <span className="value">{stats.q75.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(categorical_stats).length > 0 && (
        <div className="categorical-section">
          <h4>Categorical Columns</h4>
          {Object.entries(categorical_stats).map(([column, stats]: [string, any]) => (
            <div key={column} className="column-stats">
              <div className="column-header">
                <strong>{column}</strong>
                {stats.missing > 0 && (
                  <span className="missing-badge">
                    {stats.missing_percent.toFixed(1)}% missing
                  </span>
                )}
              </div>
              <div className="categorical-info">
                <p>
                  <span className="info-label">Unique Values:</span>{' '}
                  <span className="info-value">{stats.unique_values}</span>
                </p>
                <p>
                  <span className="info-label">Most Common:</span>{' '}
                  <span className="info-value">
                    {stats.most_common} ({stats.most_common_count})
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
