import React from 'react';
import './InsightsPanel.css';

interface InsightsPanelProps {
  insights: any[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  if (insights.length === 0) {
    return null;
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return 'ℹ️';
    }
  };

  const groupedInsights = {
    high: insights.filter(i => i.severity === 'high'),
    medium: insights.filter(i => i.severity === 'medium'),
    low: insights.filter(i => i.severity === 'low'),
    info: insights.filter(i => i.severity === 'info')
  };

  return (
    <div className="insights-panel">
      <h3>💡 Key Insights</h3>
      <div className="insights-container">
        {groupedInsights.high.length > 0 && (
          <div className="insight-group high">
            {groupedInsights.high.map((insight, idx) => (
              <div key={idx} className="insight-item">
                <span className="insight-icon">{getSeverityIcon(insight.severity)}</span>
                <div className="insight-content">
                  <span className="insight-category">{insight.category}</span>
                  <p className="insight-message">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {groupedInsights.medium.length > 0 && (
          <div className="insight-group medium">
            {groupedInsights.medium.map((insight, idx) => (
              <div key={idx} className="insight-item">
                <span className="insight-icon">{getSeverityIcon(insight.severity)}</span>
                <div className="insight-content">
                  <span className="insight-category">{insight.category}</span>
                  <p className="insight-message">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {(groupedInsights.low.length > 0 || groupedInsights.info.length > 0) && (
          <div className="insight-group info">
            {[...groupedInsights.low, ...groupedInsights.info].map((insight, idx) => (
              <div key={idx} className="insight-item">
                <span className="insight-icon">{getSeverityIcon(insight.severity)}</span>
                <div className="insight-content">
                  <span className="insight-category">{insight.category}</span>
                  <p className="insight-message">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
