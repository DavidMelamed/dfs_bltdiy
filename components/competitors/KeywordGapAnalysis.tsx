import React from 'react';
import { Table } from '../common/Table';
import { MetricsCard } from '../common/MetricsCard';
import { LineChart } from '../analytics/LineChart';

interface KeywordGapAnalysisProps {
  mainDomain: string;
  competitors: string[];
  data: any;
  loading: boolean;
}

export const KeywordGapAnalysis: React.FC<KeywordGapAnalysisProps> = ({
  mainDomain,
  competitors,
  data,
  loading
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard
          title="Total Keywords"
          value={data?.totalKeywords || 0}
          color="blue"
        />
        <MetricsCard
          title="Unique Keywords"
          value={data?.uniqueKeywords || 0}
          color="green"
        />
        <MetricsCard
          title="Keyword Overlap"
          value={`${data?.overlapPercentage || 0}%`}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Keyword Distribution</h3>
        <div className="h-64">
          <LineChart
            data={data?.keywordTrends || []}
            xKey="date"
            yKey="count"
            color="#4F46E5"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          data={data?.keywordGap || []}
          columns={[
            { header: 'Keyword', accessor: 'keyword' },
            { header: mainDomain, accessor: 'mainRank' },
            ...competitors.map(comp => ({
              header: comp,
              accessor: `${comp}Rank`
            })),
            { header: 'Volume', accessor: 'volume' },
            { header: 'Difficulty', accessor: 'difficulty' }
          ]}
        />
      </div>
    </div>
  );
};
