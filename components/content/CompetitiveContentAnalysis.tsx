// src/components/content/CompetitiveContentAnalysis.tsx
import React, { useState } from 'react';
import { useComprehensiveData } from '../../hooks/useComprehensiveData';
import { useContentAnalysis } from '../../hooks/useContentAnalysis';
import { 
  TrendingUp, 
  Award, 
  Link, 
  Share2, 
  Copy,
  BookOpen,
  BarChart2 
} from 'lucide-react';

interface ContentPattern {
  type: string;
  frequency: number;
  examples: string[];
  performance: {
    avgLinks: number;
    avgShares: number;
    avgEngagement: number;
  };
}

export default function CompetitiveContentAnalysis() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const { data, isLoading } = useComprehensiveData();

  return (
    <div className="space-y-6">
      {/* Competitor Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Competitive Content Analysis</h2>
        <CompetitorSelector
          competitors={data?.competitors?.mainCompetitors || []}
          selected={selectedCompetitors}
          onChange={setSelectedCompetitors}
        />
      </div>

      {/* Content Pattern Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingContent 
          competitors={selectedCompetitors}
          data={data}
          loading={isLoading}
        />
        <ContentPatterns 
          competitors={selectedCompetitors}
          data={data}
          loading={isLoading}
        />
      </div>

      {/* Content Gap Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Content Opportunities</h3>
          <p className="text-gray-600">Gaps and opportunities based on competitor analysis</p>
        </div>
        <ContentGapAnalysis
          competitors={selectedCompetitors}
          data={data}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

// Content Patterns Analysis
function ContentPatterns({ 
  competitors, 
  data, 
  loading 
}: { 
  competitors: string[];
  data: any;
  loading: boolean;
}) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  const patterns = data?.content?.patterns || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Content Patterns</h3>
      <div className="space-y-4">
        {patterns.map((pattern: ContentPattern, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{pattern.type}</span>
              <span className="text-sm text-gray-600">
                {pattern.frequency} occurrences
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <MetricBox
                label="Avg. Links"
                value={pattern.performance.avgLinks}
                icon={Link}
              />
              <MetricBox
                label="Avg. Shares"
                value={pattern.performance.avgShares}
                icon={Share2}
              />
              <MetricBox
                label="Engagement"
                value={pattern.performance.avgEngagement}
                icon={TrendingUp}
              />
            </div>
            <div className="mt-3">
              <button
                onClick={() => {/* Open examples modal */}}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View Examples ({pattern.examples.length})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content Gap Analysis Component
function ContentGapAnalysis({
  competitors,
  data,
  loading
}: {
  competitors: string[];
  data: any;
  loading: boolean;
}) {
  const gaps = data?.content?.gaps || [];

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-6">
      <div className="grid gap-6">
        {gaps.map((gap: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium mb-1">{gap.topic}</h4>
                <p className="text-sm text-gray-600">{gap.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm font-medium text-blue-600">
                  {gap.potential_traffic.toLocaleString()} potential visits
                </div>
                <div className="text-sm text-gray-500">
                  {gap.competitor_count} competitors ranking
                </div>
              </div>
            </div>
            <div className="mt-4">
              <CompetitorContentBreakdown 
                topic={gap.topic}
                competitors={gap.competitor_content}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                onClick={() => {/* Create content plan */}}
              >
                Create Content Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Competitor Content Breakdown
function CompetitorContentBreakdown({
  topic,
  competitors
}: {
  topic: string;
  competitors: Array<{
    domain: string;
    url: string;
    metrics: {
      backlinks: number;
      shares: number;
      ranking: number;
    };
  }>;
}) {
  return (
    <div className="space-y-2">
      {competitors.map((comp, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <a 
            href={comp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            {comp.domain}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
          <div className="flex items-center space-x-4">
            <span>{comp.metrics.backlinks.toLocaleString()} links</span>
            <span>{comp.metrics.shares.toLocaleString()} shares</span>
            <span className="text-green-600">#{comp.metrics.ranking}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
