import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-900',
    green: 'bg-green-50 text-green-900',
    purple: 'bg-purple-50 text-purple-900',
    yellow: 'bg-yellow-50 text-yellow-900',
    red: 'bg-red-50 text-red-900',
  };

  const trendColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold">
        {value}
        {trend !== undefined && (
          <span
            className={`text-sm ml-2 ${
              trend >= 0 ? trendColorClasses.positive : trendColorClasses.negative
            }`}
          >
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </p>
    </div>
  );
};
