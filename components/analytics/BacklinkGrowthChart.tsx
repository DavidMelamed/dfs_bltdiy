// src/components/charts/BacklinkGrowthChart.tsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate, formatNumber } from '../../utils/formatting';

interface BacklinkGrowthProps {
  data: any;
  loading: boolean;
}

export function BacklinkGrowthChart({ data, loading }: BacklinkGrowthProps) {
  if (loading) {
    return (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    );
  }

  const chartData = data?.history?.map((item: any) => ({
    date: item.date,
    value: item.backlinks_total
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData}>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => formatDate(date)}
        />
        <YAxis
          tickFormatter={(value) => formatNumber(value)}
        />
        <Tooltip
          labelFormatter={(date) => formatDate(date)}
          formatter={(value) => formatNumber(value)}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          fill="#93c5fd"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
