import React from 'react';
import { Users, TrendingUp, Globe, Search, BarChart2, Link as LinkIcon } from 'lucide-react';

interface CompetitorMetric {
  domain: string;
  metrics: {
    domainRating: number;
    organicTraffic: string;
    keywords: string;
    backlinks: string;
  };
  trends: {
    traffic: number;
    keywords: number;
    backlinks: number;
  };
}

const competitorData: CompetitorMetric[] = [
  {
    domain: 'competitor1.com',
    metrics: {
      domainRating: 78,
      organicTraffic: '450K',
      keywords: '25.5K',
      backlinks: '128K'
    },
    trends: {
      traffic: 15,
      keywords: 8,
      backlinks: 12
    }
  },
  {
    domain: 'competitor2.com',
    metrics: {
      domainRating: 82,
      organicTraffic: '680K',
      keywords: '35.2K',
      backlinks: '195K'
    },
    trends: {
      traffic: -5,
      keywords: 3,
      backlinks: -2
    }
  },
  {
    domain: 'competitor3.com',
    metrics: {
      domainRating: 71,
      organicTraffic: '320K',
      keywords: '18.9K',
      backlinks: '85K'
    },
    trends: {
      traffic: 22,
      keywords: 15,
      backlinks: 8
    }
  }
];

export default function CompetitorIntel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Competitor Intelligence</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitorData.map((competitor, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{competitor.domain}</h3>
              <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                DR {competitor.metrics.domainRating}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="h-4 w-4 mr-2" />
                  Traffic
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">{competitor.metrics.organicTraffic}</span>
                  <span className={`ml-2 text-sm ${
                    competitor.trends.traffic > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {competitor.trends.traffic > 0 ? '+' : ''}{competitor.trends.traffic}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Search className="h-4 w-4 mr-2" />
                  Keywords
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">{competitor.metrics.keywords}</span>
                  <span className={`ml-2 text-sm ${
                    competitor.trends.keywords > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {competitor.trends.keywords > 0 ? '+' : ''}{competitor.trends.keywords}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Backlinks
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">{competitor.metrics.backlinks}</span>
                  <span className={`ml-2 text-sm ${
                    competitor.trends.backlinks > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {competitor.trends.backlinks > 0 ? '+' : ''}{competitor.trends.backlinks}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-500">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Common Keywords</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Search Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Your Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor Position
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  keyword: 'seo analytics',
                  volume: '12.5K',
                  yourPosition: 4,
                  competitorPosition: 2
                },
                {
                  keyword: 'keyword research',
                  volume: '8.2K',
                  yourPosition: 6,
                  competitorPosition: 3
                },
                {
                  keyword: 'backlink checker',
                  volume: '6.8K',
                  yourPosition: 8,
                  competitorPosition: 5
                }
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.keyword}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.volume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{item.yourPosition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{item.competitorPosition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
