// src/components/charts/CompetitorComparisonChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatMetric } from '../../utils/formatting';

interface CompetitorComparisonProps {
  data: any[];
  loading: boolean;
  metrics: string[];
}

export function CompetitorComparisonChart({ data, loading, metrics }: CompetitorComparisonProps) {
  if (loading) {
    return (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="domain" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [formatMetric(value, name), name]}
        />
        <Legend />
        {metrics.map((metric, index) => (
          <Bar 
            key={metric}
            dataKey={metric}
            fill={`hsl(${index * 40}, 70%, 50%)`}
            name={metric.replace('_', ' ').toUpperCase()}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
