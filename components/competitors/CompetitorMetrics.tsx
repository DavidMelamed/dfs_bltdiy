import React from 'react';
import { MetricsCard } from '@components/common/MetricsCard';
import { CompetitorComparisonChart } from '@components/analytics/CompetitorComparisonChart';
import { TrendChart } from '@components/analytics/TrendChart';

interface CompetitorMetricsProps {
  mainDomain: string;
  competitors: string[];
  data: any;
  loading: boolean;
}

export const CompetitorMetrics: React.FC<CompetitorMetricsProps> = ({
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
          title="Domain Authority"
          value={data?.domainAuthority || 0}
          trend={data?.domainAuthorityTrend}
          color="blue"
        />
        <MetricsCard
          title="Total Keywords"
          value={data?.totalKeywords || 0}
          trend={data?.keywordsTrend}
          color="green"
        />
        <MetricsCard
          title="Organic Traffic"
          value={data?.organicTraffic || 0}
          trend={data?.trafficTrend}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Competitor Comparison</h3>
        <div className="h-64">
          <CompetitorComparisonChart 
            data={data?.comparisonData || []}
            mainDomain={mainDomain}
            competitors={competitors}
          />
        </div>
      </div>
    </div>
  );
};
