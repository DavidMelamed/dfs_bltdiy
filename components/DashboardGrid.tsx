// src/components/DashboardGrid.tsx
import React from 'react';
import { useComprehensiveData } from '../hooks/useComprehensiveData';
import { MetricsCard } from './MetricsCard';
import { CompetitorComparisonChart } from './analytics/CompetitorComparisonChart';
import { LineChart } from './analytics/LineChart';

export function DashboardGrid() {
  const { data, isLoading } = useComprehensiveData();
  const domain = data?.domain?.overview;
  const keywords = data?.keywords?.searchVolume;
  const competitors = data?.competitors?.mainCompetitors;

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Domain Authority"
          value={domain?.metrics?.domain_authority}
          change={domain?.metrics?.authority_change}
          loading={isLoading}
          icon="chart"
        />
        <MetricsCard
          title="Organic Keywords"
          value={domain?.metrics?.organic_keywords}
          change={domain?.metrics?.keywords_change}
          loading={isLoading}
          icon="keywords"
        />
        <MetricsCard
          title="Total Backlinks"
          value={domain?.backlinks?.total_backlinks}
          change={domain?.backlinks?.new_backlinks}
          loading={isLoading}
          icon="links"
        />
        <MetricsCard
          title="Estimated Traffic"
          value={domain?.metrics?.estimated_traffic}
          change={domain?.metrics?.traffic_change}
          loading={isLoading}
          icon="users"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Competitor Comparison</h3>
          <CompetitorComparisonChart 
            data={competitors}
            loading={isLoading}
            metrics={['visibility', 'keywords', 'backlinks']}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Keyword Performance</h3>
          <LineChart 
            data={keywords}
            loading={isLoading}
          />
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Backlink Growth</h3>
          <LineChart 
            data={domain?.backlinks}
            loading={isLoading}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <QuickActionsList domain={domain} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}

// Additional components used above
function QuickActionsList({ domain, loading }: { domain: any; loading: boolean }) {
  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const actions = [
    {
      title: 'Keyword Opportunities',
      description: `${domain?.metrics?.keyword_gaps || 0} new opportunities found`,
      action: '/keywords/opportunities'
    },
    {
      title: 'Technical Issues',
      description: `${domain?.metrics?.technical_issues || 0} issues need attention`,
      action: '/technical'
    },
    {
      title: 'Content Ideas',
      description: 'Based on competitor analysis',
      action: '/content/ideas'
    }
  ];

  return (
    <div className="space-y-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => navigate(action.action)}
          className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">{action.title}</div>
          <div className="text-sm text-gray-600">{action.description}</div>
        </button>
      ))}
    </div>
  );
}
