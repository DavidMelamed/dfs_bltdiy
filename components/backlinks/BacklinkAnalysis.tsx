// src/components/backlinks/BacklinkAnalysis.tsx
import React, { useState } from 'react';
import { useComprehensiveData } from '../../hooks/useComprehensiveData';
import { useQuery } from '../../contexts/QueryContext';
import { 
  Newspaper, 
  Users, 
  Globe, 
  Mail, 
  Twitter, 
  Rss,
  MessageCircle, 
  Award,
  Bookmark,
  Languages,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface BacklinkOpportunity {
  domain: string;
  authority: number;
  relevancy: number;
  outreachPotential: number;
  contactInfo?: {
    email?: string;
    social?: string[];
  };
  authorMetrics?: {
    articles: number;
    avgShares: number;
  };
  contentType: 'blog' | 'news' | 'resource' | 'directory';
  lastUpdated: string;
  language: string;
  topicalRelevance: string[];
}

export default function BacklinkAnalysis() {
  const { state } = useQuery();
  const { data, isLoading } = useComprehensiveData();
  const [view, setView] = useState<'opportunities'|'existing'|'lost'>('opportunities');
  const [filter, setFilter] = useState({
    minAuthority: 20,
    contentTypes: [] as string[],
    languages: [] as string[]
  });

  // Enhanced backlink opportunity scoring
  const scoreOpportunity = (link: BacklinkOpportunity) => {
    const scores = {
      authority: link.authority * 0.3,
      relevancy: link.relevancy * 0.3,
      outreach: link.outreachPotential * 0.2,
      freshness: getContentFreshnessScore(link.lastUpdated) * 0.1,
      engagement: getEngagementScore(link.authorMetrics) * 0.1
    };
    
    return {
      total: Object.values(scores).reduce((a, b) => a + b, 0),
      breakdown: scores
    };
  };

  return (
    <div className="space-y-6">
      {/* Opportunity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OpportunityMetrics data={data} loading={isLoading} />
        <RelationshipInsights data={data} loading={isLoading} />
        <OutreachPerformance data={data} loading={isLoading} />
      </div>

      {/* Main Analysis Interface */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Link Opportunities</h2>
              <p className="text-gray-600">
                Scored and ranked by potential impact and outreach success
              </p>
            </div>
            <div className="flex gap-4">
              <ViewSelector current={view} onChange={setView} />
              <FilterControls filter={filter} onChange={setFilter} />
            </div>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data?.opportunities?.map((opp: BacklinkOpportunity) => (
            <OpportunityCard
              key={opp.domain}
              opportunity={opp}
              score={scoreOpportunity(opp)}
            />
          ))}
        </div>
      </div>

      {/* Relationship Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OutreachTracker data={data} loading={isLoading} />
        <ContentStrategy data={data} loading={isLoading} />
      </div>
    </div>
  );
}

// Opportunity Card with rich insights
function OpportunityCard({ 
  opportunity, 
  score 
}: { 
  opportunity: BacklinkOpportunity;
  score: { total: number; breakdown: Record<string, number> };
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{opportunity.domain}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{opportunity.language}</span>
            <Calendar className="h-4 w-4 ml-2" />
            <span>Updated {formatDate(opportunity.lastUpdated)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold text-blue-600">
            {score.total.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Opportunity Score</div>
        </div>
      </div>

      {/* Metrics and Insights */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <MetricBadge
          icon={Award}
          label="Authority"
          value={opportunity.authority}
          color="blue"
        />
        <MetricBadge
          icon={TrendingUp}
          label="Relevancy"
          value={opportunity.relevancy}
          color="green"
        />
        <MetricBadge
          icon={Users}
          label="Outreach Potential"
          value={opportunity.outreachPotential}
          color="purple"
        />
      </div>

      {/* Topic Relevance Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity.topicalRelevance.map(topic => (
          <span
            key={topic}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Contact Information */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex gap-3">
          {opportunity.contactInfo?.email && (
            <Mail className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
          )}
          {opportunity.contactInfo?.social?.includes('twitter') && (
            <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
          )}
          <Rss className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
        </div>
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
          Start Outreach
        </button>
      </div>
    </div>
  );
}

// Outreach Tracking Component
function OutreachTracker({ data, loading }: { data: any; loading: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Outreach Pipeline</h3>
      <div className="space-y-4">
        {['Researching', 'Initial Contact', 'In Discussion', 'Agreement', 'Success'].map(stage => (
          <div key={stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{stage}</span>
            </div>
            <span className="font-semibold">
              {data?.outreach?.stages[stage]?.length || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content Strategy Component
function ContentStrategy({ data, loading }: { data: any; loading: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Content Opportunities</h3>
      <div className="space-y-4">
        {data?.content?.opportunities?.map((opp: any) => (
          <div key={opp.type} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{opp.type}</span>
              <span className="text-sm text-gray-600">
                {opp.potentialLinks} potential links
              </span>
            </div>
            <p className="text-sm text-gray-600">{opp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
