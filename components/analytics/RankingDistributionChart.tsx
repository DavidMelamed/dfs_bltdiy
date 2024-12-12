import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface RankingData {
  position: string;
  count: number;
}

interface RankingDistributionChartProps {
  data: RankingData[];
  height?: number;
}

const defaultData: RankingData[] = [
  { position: '1-3', count: 15 },
  { position: '4-10', count: 45 },
  { position: '11-20', count: 30 },
  { position: '21-50', count: 60 },
  { position: '51-100', count: 25 }
];

export const RankingDistributionChart: React.FC<RankingDistributionChartProps> = ({
  data = defaultData,
  height = 400
}) => {
  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={data}
        keys={['count']}
        indexBy="position"
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blue_green' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Position Range',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Keywords',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ value, indexValue }) => (
          <div className="bg-white px-3 py-2 shadow rounded border border-gray-200">
            <strong>{indexValue}:</strong> {value} keywords
          </div>
        )}
        theme={{
          tooltip: {
            container: {
              background: 'white',
              color: 'inherit',
              fontSize: 'inherit',
              borderRadius: '2px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
              padding: '5px 9px'
            }
          }
        }}
      />
    </div>
  );
};

export default RankingDistributionChart;
