import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface TrafficSource {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface TrafficSourceChartProps {
  data: TrafficSource[];
  height?: number;
}

const defaultData: TrafficSource[] = [
  {
    id: 'organic',
    label: 'Organic Search',
    value: 45,
    color: '#3B82F6'
  },
  {
    id: 'direct',
    label: 'Direct',
    value: 25,
    color: '#10B981'
  },
  {
    id: 'referral',
    label: 'Referral',
    value: 15,
    color: '#F59E0B'
  },
  {
    id: 'social',
    label: 'Social Media',
    value: 10,
    color: '#6366F1'
  },
  {
    id: 'other',
    label: 'Other',
    value: 5,
    color: '#8B5CF6'
  }
];

export const TrafficSourceChart: React.FC<TrafficSourceChartProps> = ({
  data = defaultData,
  height = 400
}) => {
  return (
    <div style={{ height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle'
          }
        ]}
      />
    </div>
  );
};

export default TrafficSourceChart;
