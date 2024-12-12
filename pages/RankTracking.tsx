import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface RankData {
  keyword: string;
  position: number;
  previous_position: number;
  url: string;
  search_volume: number;
}

const RankTracking = () => {
  const [domain, setDomain] = useState('');
  const [keywords, setKeywords] = useState('');

  const trackRankings = useMutation(
    async ({ domain, keywords }: { domain: string; keywords: string[] }) => {
      const response = await axios.post('/api/dataforseo-proxy', {
        endpoint: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
        data: keywords.map(keyword => ({
          keyword,
          target: domain,
          language_name: "English",
          location_name: "United States"
        }))
      });
      return response.data;
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain && keywords) {
      const keywordList = keywords.split('\n').map(k => k.trim()).filter(k => k);
      trackRankings.mutate({ domain, keywords: keywordList });
    }
  };

  const getPositionChange = (current: number, previous: number) => {
    if (!previous) return 'new';
    const change = previous - current;
    if (change > 0) return `↑${change}`;
    if (change < 0) return `↓${Math.abs(change)}`;
    return '−';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Rank Tracking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <input
              id="domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Keywords (one per line)
            </label>
            <textarea
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords..."
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={trackRankings.isLoading || !domain || !keywords}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {trackRankings.isLoading ? 'Tracking...' : 'Track Rankings'}
            </button>
          </div>
        </form>

        {trackRankings.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            An error occurred while tracking rankings. Please try again.
          </div>
        )}

        {trackRankings.data && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Ranking Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Search Volume
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trackRankings.data.tasks?.map((task: any) => {
                    const result = task.result?.[0];
                    if (!result) return null;

                    const position = result.items?.findIndex((item: any) => 
                      item.url.includes(domain.replace('www.', ''))) + 1 || 0;

                    return (
                      <tr key={result.keyword}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.keyword}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {position || 'Not found'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            position < (result.previous_position || 101)
                              ? 'bg-green-100 text-green-800'
                              : position > (result.previous_position || 101)
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {getPositionChange(position, result.previous_position)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                          {position ? (
                            <a href={result.items[position - 1].url} target="_blank" rel="noopener noreferrer">
                              {result.items[position - 1].url}
                            </a>
                          ) : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.search_volume?.toLocaleString() || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankTracking;
