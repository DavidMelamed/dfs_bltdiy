import React from 'react';
import { MetricsCard } from '../common/MetricsCard';
import { Table } from '../common/Table';
import { LineChart } from '../analytics/LineChart';

interface BacklinkComparisonProps {
  mainDomain: string;
  competitors: string[];
  data: any;
  loading: boolean;
}

export const BacklinkComparison: React.FC<BacklinkComparisonProps> = ({
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
          title="Total Backlinks"
          value={data?.totalBacklinks || 0}
          trend={data?.backlinksTrend}
          color="blue"
        />
        <MetricsCard
          title="Referring Domains"
          value={data?.referringDomains || 0}
          trend={data?.domainsTrend}
          color="green"
        />
        <MetricsCard
          title="Domain Authority"
          value={data?.domainAuthority || 0}
          trend={data?.authorityTrend}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Backlink Growth</h3>
        <div className="h-64">
          <LineChart
            data={data?.backlinkTrends || []}
            xKey="date"
            yKey="count"
            color="#4F46E5"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          data={data?.backlinkComparison || []}
          columns={[
            { header: 'Domain', accessor: 'domain' },
            { header: 'Backlinks', accessor: 'backlinks' },
            { header: 'Referring Domains', accessor: 'referringDomains' },
            { header: 'Domain Authority', accessor: 'domainAuthority' },
            { header: 'Trust Flow', accessor: 'trustFlow' }
          ]}
        />
      </div>
    </div>
  );
};
