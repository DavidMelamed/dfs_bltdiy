import React, { useState } from 'react';
import { backlinks } from '../services/backlinks';
import type { BacklinksOverview, Backlink, AnchorText, ReferringDomain } from '../types/backlinks';

const Backlinks: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<BacklinksOverview | null>(null);
  const [backlinksData, setBacklinksData] = useState<Backlink[]>([]);
  const [anchors, setAnchors] = useState<AnchorText[]>([]);
  const [referringDomains, setReferringDomains] = useState<ReferringDomain[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const [overviewData, backlinksResult, anchorsResult, domainsResult] = await Promise.all([
        backlinks.getBacklinksOverview(domain),
        backlinks.getBacklinks({ target: domain, limit: 10 }),
        backlinks.getAnchorTexts({ target: domain, limit: 10 }),
        backlinks.getReferringDomains({ target: domain, limit: 10 })
      ]);

      setOverview(overviewData);
      setBacklinksData(backlinksResult);
      setAnchors(anchorsResult);
      setReferringDomains(domainsResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Backlinks Analysis</h1>
      
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

      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Backlinks:</span>
                <span className="font-medium">{overview.total_backlinks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Referring Domains:</span>
                <span className="font-medium">{overview.referring_domains.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Dofollow Links:</span>
                <span className="font-medium">{overview.dofollow_backlinks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Nofollow Links:</span>
                <span className="font-medium">{overview.nofollow_backlinks.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Latest Backlinks */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Latest Backlinks</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Source URL</th>
                    <th className="text-left py-2">Anchor Text</th>
                    <th className="text-right py-2">Domain Rank</th>
                    <th className="text-right py-2">First Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {backlinksData.map((backlink, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">
                        <a href={backlink.url_from} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline">{backlink.domain_from}</a>
                      </td>
                      <td>{backlink.anchor}</td>
                      <td className="text-right">{backlink.domain_rank}</td>
                      <td className="text-right">{new Date(backlink.first_seen).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Anchor Texts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Anchor Texts</h2>
            <div className="space-y-2">
              {anchors.map((anchor, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate flex-1">{anchor.anchor}</span>
                  <span className="ml-4">{anchor.backlinks.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referring Domains */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Referring Domains</h2>
            <div className="space-y-2">
              {referringDomains.map((domain, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate flex-1">{domain.domain}</span>
                  <span className="ml-4">{domain.backlinks.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backlinks;
