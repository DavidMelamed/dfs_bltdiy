import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface KeywordTrendChartProps {
  data: {
    date: string;
    value: number;
    metric: string;
  }[];
}

export const KeywordTrendChart: React.FC<KeywordTrendChartProps> = ({ data }) => {
  const formattedData = Object.entries(
    data.reduce((acc, item) => {
      if (!acc[item.metric]) {
        acc[item.metric] = [];
      }
      acc[item.metric].push({
        x: item.date,
        y: item.value,
      });
      return acc;
    }, {} as Record<string, { x: string; y: number }[]>)
  ).map(([id, values]) => ({
    id,
    data: values,
  }));

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
