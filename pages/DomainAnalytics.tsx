import React, { useState } from 'react';
import { domainAnalytics } from '../services/domainAnalytics';
import type { DomainAnalyticsResult } from '../types/domainAnalytics';

const DomainAnalytics: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DomainAnalyticsResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await domainAnalytics.getDomainOverview(domain);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Domain Analytics</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Organic Traffic:</span>
                <span className="font-medium">{data.metrics.organic_traffic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Organic Keywords:</span>
                <span className="font-medium">{data.metrics.organic_keywords.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Domain Rank:</span>
                <span className="font-medium">{data.metrics.domain_rank}</span>
              </div>
            </div>
          </div>

          {/* Backlinks Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Backlinks</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Backlinks:</span>
                <span className="font-medium">{data.backlinks_summary.total_backlinks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Referring Domains:</span>
                <span className="font-medium">{data.backlinks_summary.referring_domains.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>New Backlinks (24h):</span>
                <span className="font-medium">{data.backlinks_summary.new_backlinks_24h.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Technologies</h2>
            <div className="space-y-2">
              {data.technologies.map((tech, index) => (
                <div key={index} className="flex justify-between">
                  <span>{tech.name}</span>
                  <span className="text-gray-600">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Top Keywords</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Keyword</th>
                    <th className="text-right py-2">Position</th>
                    <th className="text-right py-2">Search Volume</th>
                    <th className="text-right py-2">Traffic</th>
                    <th className="text-right py-2">CPC</th>
                  </tr>
                </thead>
                <tbody>
                  {data.keywords_data.map((keyword, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{keyword.keyword}</td>
                      <td className="text-right">{keyword.position}</td>
                      <td className="text-right">{keyword.search_volume.toLocaleString()}</td>
                      <td className="text-right">{keyword.traffic.toLocaleString()}</td>
                      <td className="text-right">${keyword.cpc.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainAnalytics;
