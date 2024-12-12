// src/components/charts/KeywordTrendsChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate, formatNumber } from '../../utils/formatting';

interface KeywordTrendsProps {
  data: any[];
  loading: boolean;
}

export function KeywordTrendsChart({ data, loading }: KeywordTrendsProps) {
  if (loading) {
    return (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => formatDate(date)}
        />
        <YAxis tickFormatter={(value) => formatNumber(value)} />
        <Tooltip
          labelFormatter={(date) => formatDate(date)}
          formatter={(value) => formatNumber(value)}
        />
        <Line 
          type="monotone"
          dataKey="position"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
