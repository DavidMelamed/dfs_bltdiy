import React, { useState } from 'react';
import { dataForSEOService } from '../../../services/api/dataForSeo';
import { toast } from 'react-hot-toast';

interface ContentSuggestion {
  type: string;
  suggestion: string;
  importance: 'high' | 'medium' | 'low';
}

interface ContentOptimizerProps {
  url?: string;
  content?: string;
}

export const ContentOptimizer: React.FC<ContentOptimizerProps> = ({ url, content }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [inputContent, setInputContent] = useState(content || '');
  const [inputUrl, setInputUrl] = useState(url || '');

  const handleAnalyze = async () => {
    if (!inputContent && !inputUrl) {
      toast.error('Please provide either content or a URL to analyze');
      return;
    }

    setLoading(true);
    try {
      const result = await dataForSEOService.analyzeContent({
        url: inputUrl,
        content: inputContent
      });

      // Process and format suggestions
      const processedSuggestions: ContentSuggestion[] = [
        // Content Length
        {
          type: 'Content Length',
          suggestion: `Your content is ${result.tasks[0].result[0].content_length} words. ${
            result.tasks[0].result[0].content_length < 300 
              ? 'Consider adding more content for better SEO performance.'
              : 'Content length is good for SEO.'
          }`,
          importance: result.tasks[0].result[0].content_length < 300 ? 'high' : 'low'
        },
        // Readability
        {
          type: 'Readability',
          suggestion: `Content readability score: ${result.tasks[0].result[0].readability_score}. ${
            result.tasks[0].result[0].readability_score < 60
              ? 'Consider simplifying your content for better readability.'
              : 'Readability score is good.'
          }`,
          importance: result.tasks[0].result[0].readability_score < 60 ? 'high' : 'low'
        },
        // More suggestions based on API response...
      ];

      setSuggestions(processedSuggestions);
      toast.success('Content analysis completed!');
    } catch (error) {
      console.error('Content analysis failed:', error);
      toast.error('Failed to analyze content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getImportanceColor = (importance: 'high' | 'medium' | 'low') => {
    switch (importance) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          className="p-2 border border-gray-300 rounded-md"
        />
        <div className="text-center text-gray-500">- OR -</div>
        <textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Enter content to analyze"
          className="p-2 border border-gray-300 rounded-md h-32"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || (!inputContent && !inputUrl)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Content Optimization Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{suggestion.type}</h4>
                  <span className={`text-sm font-medium ${getImportanceColor(suggestion.importance)}`}>
                    {suggestion.importance.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{suggestion.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
