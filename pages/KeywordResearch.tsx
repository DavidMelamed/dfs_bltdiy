import React, { useState } from 'react';
import { useSearch } from '@hooks/useSearch';
import { LineChart } from '@components/analytics/LineChart';
import { BarChart } from '@components/analytics/BarChart';
import { TrendingUp, Search, DollarSign } from 'lucide-react';

interface KeywordAnalysis {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: number;
  trend_data: Array<{ month: string; volume: number }>;
  related_keywords: Array<{
    keyword: string;
    search_volume: number;
    cpc: number;
    competition: number;
  }>;
  serp_features: Array<{
    feature: string;
    presence: boolean;
  }>;
}

interface KeywordFilters {
  keyword: string;
  location: string;
  language: string;
  include_trends: boolean;
  include_related: boolean;
}

const defaultFilters: KeywordFilters = {
  keyword: '',
  location: 'United States',
  language: 'en',
  include_trends: true,
  include_related: true,
};

export default function KeywordResearch() {
  const [filters, setFilters] = useState<KeywordFilters>(defaultFilters);

  const { data: keywordData, isLoading } = useSearch(filters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const renderMetricsCards = (data: KeywordAnalysis) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Search className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Search Volume</h3>
        </div>
        <p className="text-3xl font-bold">{data.search_volume.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">CPC</h3>
        </div>
        <p className="text-3xl font-bold">${data.cpc.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Competition</h3>
        </div>
        <p className="text-3xl font-bold">{(data.competition * 100).toFixed(1)}%</p>
      </div>
    </div>
  );

  const renderTrendChart = (data: KeywordAnalysis) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Search Volume Trends</h3>
      <div className="h-[300px]">
        <LineChart
          data={data.trend_data}
          xKey="month"
          yKey="volume"
        />
      </div>
    </div>
  );

  const renderRelatedKeywords = (data: KeywordAnalysis) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Related Keywords</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.related_keywords.map((keyword, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {keyword.keyword}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.search_volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${keyword.cpc.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(keyword.competition * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSerpFeatures = (data: KeywordAnalysis) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">SERP Features</h3>
      <div className="flex flex-wrap gap-2">
        {data.serp_features.map((feature, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm font-medium
              ${feature.presence
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
              }`}
          >
            {feature.feature}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Keyword Research</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keyword
            </label>
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter keyword"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.include_trends}
                onChange={(e) => setFilters({ ...filters, include_trends: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Include Trends</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.include_related}
                onChange={(e) => setFilters({ ...filters, include_related: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Include Related Keywords</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Keyword'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {keywordData && (
        <div>
          {renderMetricsCards(keywordData)}
          {filters.include_trends && renderTrendChart(keywordData)}
          {filters.include_related && renderRelatedKeywords(keywordData)}
          {renderSerpFeatures(keywordData)}
        </div>
      )}
    </div>
  );
}
