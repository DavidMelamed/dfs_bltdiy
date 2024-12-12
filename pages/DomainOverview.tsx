// src/pages/DomainOverview.tsx
import React, { useState } from 'react';
import { useSearch } from '@hooks/useSearch';
import { MetricCard } from '@components/common/MetricCard';
import { LineChart } from '@components/analytics/LineChart';
import { IssuesList } from '@components/common/IssuesList';
import { DomainSearch } from '@components/domain/DomainSearch';

export default function DomainOverview() {
  const [domain, setDomain] = useState('');
  
  const { data: overview, isLoading: overviewLoading } = useSearch(
    ['domain-overview', domain],
    'getOverview',
    { enabled: !!domain }
  );

  const { data: backlinks, isLoading: backlinksLoading } = useSearch(
    ['domain-backlinks', domain],
    'getBacklinks',
    { enabled: !!domain }
  );

  const { data: issues, isLoading: issuesLoading } = useSearch(
    ['domain-issues', domain],
    'getOnPageIssues',
    { enabled: !!domain }
  );

  const isLoading = overviewLoading || backlinksLoading || issuesLoading;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Domain Overview</h1>
        
        <DomainSearch
          value={domain}
          onChange={setDomain}
          placeholder="Enter your domain (e.g., example.com)"
        />
      </div>

      {domain && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Domain Rating"
              value={overview?.metrics?.domain_rating}
              change={overview?.metrics?.domain_rating_change}
              loading={isLoading}
            />
            <MetricCard
              title="Organic Traffic"
              value={overview?.metrics?.organic_traffic}
              change={overview?.metrics?.organic_traffic_change}
              loading={isLoading}
            />
            <MetricCard
              title="Keywords"
              value={overview?.metrics?.keywords_total}
              change={overview?.metrics?.keywords_change}
              loading={isLoading}
            />
            <MetricCard
              title="Backlinks"
              value={backlinks?.total_backlinks}
              change={backlinks?.new_backlinks_24h}
              loading={isLoading}
            />
          </div>

          {/* Traffic Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Traffic Trend</h2>
            <LineChart
              data={overview?.traffic_trend || []}
              loading={isLoading}
            />
          </div>

          {/* Technical Issues */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Technical Issues</h2>
            <IssuesList
              issues={issues?.issues || []}
              loading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}
