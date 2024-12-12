// src/components/content/ContentAnalyzer.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FileText, 
  Link, 
  Globe,
  Target,
  Zap,
  MessageCircle,
  Share2
} from 'lucide-react';
import { contentService } from '../../services/contentService';

interface ContentAnalysis {
  url?: string;
  content?: string;
  metrics: {
    readability: number;
    wordCount: number;
    sentiment: number;
    keywords: Array<{
      keyword: string;
      density: number;
      competition: number;
      searchVolume: number;
    }>;
    topics: Array<{
      topic: string;
      relevance: number;
    }>;
  };
  opportunities: Array<{
    type: 'internal_link' | 'external_link' | 'keyword' | 'content_gap';
    description: string;
    priority: number;
    value: string;
  }>;
}

export default function ContentAnalyzer() {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);

  const { mutate: analyzeContent, isLoading } = useQuery({
    mutationFn: async () => {
      const result = await contentService.analyzeContent({
        type: inputType,
        content: input
      });
      setAnalysis(result);
      return result;
    }
  });

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setInputType('url')}
            className={`px-4 py-2 rounded-md ${
              inputType === 'url' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Globe className="h-4 w-4 inline-block mr-2" />
            URL Analysis
          </button>
          <button
            onClick={() => setInputType('text')}
            className={`px-4 py-2 rounded-md ${
              inputType === 'text'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FileText className="h-4 w-4 inline-block mr-2" />
            Content Analysis
          </button>
        </div>

        {inputType === 'url' ? (
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL to analyze..."
            className="w-full p-3 border rounded-md"
          />
        ) : (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full h-40 p-3 border rounded-md"
          />
        )}

        <button
          onClick={() => analyzeContent()}
          disabled={isLoading || !input}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </div>

      {analysis && (
        <>
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Content Score"
              value={analysis.metrics.readability}
              icon={Target}
              suffix="/100"
            />
            <MetricCard
              title="Word Count"
              value={analysis.metrics.wordCount}
              icon={FileText}
            />
            <MetricCard
              title="Link Opportunities"
              value={analysis.opportunities.filter(o => 
                o.type === 'internal_link' || o.type === 'external_link'
              ).length}
              icon={Link}
            />
            <MetricCard
              title="Topic Relevance"
              value={Math.round(analysis.metrics.topics[0]?.relevance * 100)}
              icon={MessageCircle}
              suffix="%"
            />
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <KeywordAnalysis keywords={analysis.metrics.keywords} />
            <ContentOpportunities opportunities={analysis.opportunities} />
          </div>

          {/* Topic Analysis */}
          <TopicAnalysis topics={analysis.metrics.topics} />
        </>
      )}
    </div>
  );
}

// Keyword Analysis Component
function KeywordAnalysis({ keywords }: { keywords: ContentAnalysis['metrics']['keywords'] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Keyword Analysis</h3>
      <div className="space-y-4">
        {keywords.map((keyword, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{keyword.keyword}</span>
              <span className="text-sm text-gray-600">
                {keyword.density.toFixed(2)}% density
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">
                Volume: {keyword.searchVolume.toLocaleString()}
              </span>
              <span className="text-gray-600">
                Competition: {(keyword.competition * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content Opportunities Component
function ContentOpportunities({ 
  opportunities 
}: { 
  opportunities: ContentAnalysis['opportunities'] 
}) {
  const getOpportunityIcon = (type: string) => {
    switch(type) {
      case 'internal_link': return Link;
      case 'external_link': return Share2;
      case 'keyword': return Target;
      default: return Zap;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Content Opportunities</h3>
      <div className="space-y-4">
        {opportunities.map((opp, index) => {
          const Icon = getOpportunityIcon(opp.type);
          return (
            <div 
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icon className={`h-5 w-5 ${
                    opp.priority > 7 ? 'text-red-500' :
                    opp.priority > 5 ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{opp.value}</p>
                  <p className="text-sm text-gray-600">{opp.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Topic Analysis Component
function TopicAnalysis({ topics }: { topics: ContentAnalysis['metrics']['topics'] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Topic Analysis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic, index) => (
          <div 
            key={index}
            className="p-4 bg-gray-50 rounded-lg text-center"
          >
            <div className="font-medium mb-1">{topic.topic}</div>
            <div className="text-sm text-gray-600">
              {(topic.relevance * 100).toFixed(1)}% relevant
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
