import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { dataForSEOClient, DataForSEOError } from '@lib/dataforseo/client';
import { LineChart } from '@components/analytics/LineChart';

interface BacklinkFilters {
  target: string;
  target_type: 'domain' | 'url';
  limit: number;
  include_lost_backlinks: boolean;
  check_new_backlinks: boolean;
}

const defaultFilters: BacklinkFilters = {
  target: '',
  target_type: 'domain',
  limit: 100,
  include_lost_backlinks: true,
  check_new_backlinks: true,
};

interface BacklinkSummaryResponse {
  target: string;
  first_seen: string;
  lost_date: string | null;
  rank: number;
  backlinks: number;
  backlinks_spam_score: number;
  crawled_pages: number;
  info: {
    server: string;
    cms: string;
    platform_type: string[];
    ip_address: string;
    country: string;
    is_ip: boolean;
    target_spam_score: number;
  };
  internal_links_count: number;
  external_links_count: number;
  broken_backlinks: number;
  broken_pages: number;
  referring_domains: number;
  referring_domains_nofollow: number;
  referring_main_domains: number;
  referring_main_domains_nofollow: number;
  referring_ips: number;
  referring_subnets: number;
  referring_pages: number;
  referring_pages_nofollow: number;
  referring_links_tld: Record<string, number>;
  referring_links_types: Record<string, number>;
  referring_links_attributes: Record<string, number>;
  referring_links_platform_types: Record<string, number>;
  referring_links_semantic_locations: Record<string, number>;
  referring_links_countries: Record<string, number>;
}

interface AdvancedFilters extends BacklinkFilters {
  include_subdomains: boolean;
  exclude_internal_backlinks: boolean;
  include_indirect_links: boolean;
  backlink_status_type: 'all' | 'live' | 'broken';
  internal_list_limit: number;
}

const defaultAdvancedFilters: AdvancedFilters = {
  ...defaultFilters,
  include_subdomains: true,
  exclude_internal_backlinks: false,
  include_indirect_links: true,
  backlink_status_type: 'all',
  internal_list_limit: 300,
};

interface MetricCardProps {
  title: string;
  value: number;
  icon: string;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-700">{value.toLocaleString()}</p>
    </div>
  );
}

export default function BacklinkAnalysis() {
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(defaultAdvancedFilters);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'distribution'>('overview');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const { mutate: analyzeBacklinks, isLoading, data: backlinkData, error: queryError } = useMutation({
    mutationFn: async (filters: AdvancedFilters) => {
      if (!filters.target.trim()) {
        throw new Error('Please enter a domain or URL to analyze');
      }

      try {
        const response = await dataForSEOClient.getBacklinksSummary({
          target: filters.target,
          internal_list_limit: filters.internal_list_limit,
          backlinks_status_type: filters.backlink_status_type,
          include_subdomains: filters.include_subdomains,
          exclude_internal_backlinks: filters.exclude_internal_backlinks,
          include_indirect_links: filters.include_indirect_links
        });

        if (!response.tasks?.[0]?.result?.[0]) {
          throw new Error('No backlink data found for this domain/URL');
        }

        return response.tasks[0].result[0];
      } catch (error) {
        if (error instanceof DataForSEOError) {
          throw new Error(`API Error: ${error.message}`);
        }
        throw new Error('Failed to analyze backlinks. Please try again.');
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={advancedFilters.target}
              onChange={(e) => setAdvancedFilters(prev => ({ ...prev, target: e.target.value }))}
              placeholder="Enter domain or URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Advanced Search
          </button>
          <button
            onClick={() => analyzeBacklinks(advancedFilters)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* Advanced Search Panel */}
        {showAdvancedSearch && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={advancedFilters.include_subdomains}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, include_subdomains: e.target.checked }))}
                className="mr-2"
              />
              <label>Include Subdomains</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={advancedFilters.exclude_internal_backlinks}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, exclude_internal_backlinks: e.target.checked }))}
                className="mr-2"
              />
              <label>Exclude Internal Backlinks</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={advancedFilters.include_indirect_links}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, include_indirect_links: e.target.checked }))}
                className="mr-2"
              />
              <label>Include Indirect Links</label>
            </div>
            <div className="flex items-center">
              <select
                value={advancedFilters.backlink_status_type}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, backlink_status_type: e.target.value as 'all' | 'live' | 'broken' }))}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="all">All Backlinks</option>
                <option value="live">Live Backlinks</option>
                <option value="broken">Broken Backlinks</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={advancedFilters.internal_list_limit}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, internal_list_limit: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded"
                placeholder="Internal List Limit"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'details', 'distribution'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      {backlinkData ? (
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Total Backlinks"
                value={backlinkData.backlinks}
                icon="🔗"
              />
              <MetricCard
                title="Referring Domains"
                value={backlinkData.referring_domains}
                icon="🌐"
              />
              <MetricCard
                title="Domain Rank"
                value={backlinkData.rank}
                icon="📊"
              />
              <MetricCard
                title="Spam Score"
                value={backlinkData.backlinks_spam_score}
                icon="⚠️"
              />
              <MetricCard
                title="Broken Links"
                value={backlinkData.broken_backlinks}
                icon="🔨"
              />
              <MetricCard
                title="Referring IPs"
                value={backlinkData.referring_ips}
                icon="💻"
              />
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Link Types Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(backlinkData.referring_links_types).map(([type, count]) => (
                    <div key={type} className="text-center">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-gray-600">{type}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Platform Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(backlinkData.referring_links_platform_types).map(([platform, count]) => (
                    <div key={platform} className="text-center">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-gray-600">{platform}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Distribution Tab */}
          {activeTab === 'distribution' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">TLD Distribution</h3>
                <div className="h-80">
                  <LineChart
                    data={Object.entries(backlinkData.referring_links_tld).map(([tld, count]) => ({
                      label: tld,
                      value: count
                    }))}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Geographical Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(backlinkData.referring_links_countries)
                    .filter(([country]) => country)
                    .map(([country, count]) => (
                      <div key={country} className="text-center">
                        <div className="text-2xl font-bold">{count}</div>
                        <div className="text-gray-600">{country}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Enter a domain or URL to analyze backlinks
        </div>
      )}
    </div>
  );
}
