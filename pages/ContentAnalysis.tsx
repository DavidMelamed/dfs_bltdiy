import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ContentMetrics {
  word_count: number;
  readability_score: number;
  content_score: number;
  keyword_density: {
    [key: string]: number;
  };
}

const ContentAnalysis = () => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [analysisType, setAnalysisType] = useState<'url' | 'content'>('url');

  const analyzeContent = useMutation(
    async (data: { url?: string; content?: string }) => {
      const response = await axios.post('/api/dataforseo-proxy', {
        endpoint: 'https://api.dataforseo.com/v3/content_analysis/summary',
        data: [{
          ...data,
          language: "en"
        }]
      });
      return response.data;
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (analysisType === 'url' && url) {
      analyzeContent.mutate({ url });
    } else if (analysisType === 'content' && content) {
      analyzeContent.mutate({ content });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Content Analysis
        </h1>

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setAnalysisType('url')}
              className={`px-4 py-2 rounded-md ${
                analysisType === 'url'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analyze URL
            </button>
            <button
              onClick={() => setAnalysisType('content')}
              className={`px-4 py-2 rounded-md ${
                analysisType === 'content'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analyze Text
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {analysisType === 'url' ? (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL to Analyze
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content to Analyze
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your content here..."
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={analyzeContent.isLoading || (!url && !content)}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {analyzeContent.isLoading ? 'Analyzing...' : 'Analyze Content'}
            </button>
          </div>
        </form>

        {analyzeContent.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            An error occurred while analyzing the content. Please try again.
          </div>
        )}

        {analyzeContent.data && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">Word Count</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {analyzeContent.data.tasks?.[0]?.result?.[0]?.word_count || 0}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-1">Readability Score</h3>
                <p className="text-2xl font-bold text-green-900">
                  {analyzeContent.data.tasks?.[0]?.result?.[0]?.readability_score || 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800 mb-1">Content Score</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {analyzeContent.data.tasks?.[0]?.result?.[0]?.content_score || 'N/A'}
                </p>
              </div>
            </div>

            {analyzeContent.data.tasks?.[0]?.result?.[0]?.keyword_density && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Keyword Density</h2>
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Density
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(analyzeContent.data.tasks[0].result[0].keyword_density).map(([keyword, density], index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(density * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentAnalysis;
