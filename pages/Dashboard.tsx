import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Globe, 
  Search,
  Link as LinkIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock data for demonstration
const performanceMetrics = [
  { label: 'Domain Rating', value: '76/100', change: '+5', positive: true },
  { label: 'Organic Keywords', value: '12.5K', change: '+15%', positive: true },
  { label: 'Monthly Traffic', value: '250K', change: '+8%', positive: true },
  { label: 'Backlinks', value: '45.2K', change: '-3%', positive: false }
];

const rankingDistribution = [
  { position: '1-3', count: 125, percentage: 25 },
  { position: '4-10', count: 200, percentage: 40 },
  { position: '11-20', count: 100, percentage: 20 },
  { position: '21-50', count: 50, percentage: 10 },
  { position: '51-100', count: 25, percentage: 5 }
];

const recentChanges = [
  { 
    keyword: 'data analytics software',
    oldPosition: 12,
    newPosition: 8,
    searchVolume: '5.2K',
    date: '2023-12-01'
  },
  { 
    keyword: 'seo tools comparison',
    oldPosition: 15,
    newPosition: 11,
    searchVolume: '3.8K',
    date: '2023-12-01'
  },
  { 
    keyword: 'keyword research tool',
    oldPosition: 6,
    newPosition: 9,
    searchVolume: '8.1K',
    date: '2023-12-01'
  },
  { 
    keyword: 'backlink analyzer',
    oldPosition: 18,
    newPosition: 14,
    searchVolume: '2.9K',
    date: '2023-12-01'
  }
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track your SEO performance and rankings across all metrics
        </p>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              <div className={`flex items-center ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm">{metric.change}</span>
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Ranking Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Keyword Ranking Distribution
          </h3>
          <div className="space-y-4">
            {rankingDistribution.map((rank) => (
              <div key={rank.position} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Position {rank.position}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {rank.count} keywords
                  </span>
                </div>
                <div className="overflow-hidden h-2 rounded bg-gray-100">
                  <div
                    className="h-2 rounded bg-blue-600 transition-all duration-500"
                    style={{ width: `${rank.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Changes */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Ranking Changes
          </h3>
          <div className="space-y-4">
            {recentChanges.map((change, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{change.keyword}</p>
                  <p className="text-sm text-gray-600">
                    Volume: {change.searchVolume}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">
                    {change.oldPosition}
                  </span>
                  <span className="text-gray-400 mx-1">→</span>
                  <span
                    className={`text-sm font-medium ${
                      change.oldPosition > change.newPosition
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {change.newPosition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Search, label: 'Keyword Analysis', route: '/keywords' },
          { icon: Globe, label: 'SERP Overview', route: '/serp' },
          { icon: LinkIcon, label: 'Backlink Report', route: '/backlinks' },
          { icon: Users, label: 'Competitor Insights', route: '/competitors' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg 
                hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Icon className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">{action.label}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
