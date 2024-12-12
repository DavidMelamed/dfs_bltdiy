// src/utils/linkAnalysis.ts
import { parse as parseUrl } from 'url';
import { differenceInDays } from 'date-fns';

interface LinkMetrics {
  authority: number;
  trustFlow: number;
  relevancy: number;
  domainAge: number;
  trafficValue: number;
}

export const linkAnalysis = {
  // Calculate contextual relevancy score
  calculateRelevancy(sourceTopic: string[], targetTopic: string[]): number {
    const intersect = sourceTopic.filter(t => targetTopic.includes(t));
    return (intersect.length / Math.max(sourceTopic.length, targetTopic.length)) * 100;
  },

  // Score outreach potential
  scoreOutreachPotential(metrics: LinkMetrics, contactInfo: any): number {
    const scores = {
      authority: normalizeScore(metrics.authority, 0, 100) * 0.3,
      relevancy: normalizeScore(metrics.relevancy, 0, 100) * 0.3,
      accessibility: calculateAccessibilityScore(contactInfo) * 0.2,
      trust: normalizeScore(metrics.trustFlow, 0, 100) * 0.2
    };
    
    return Object.values(scores).reduce((a, b) => a + b, 0);
  },

  // Analyze link profile diversity
  analyzeLinkDiversity(links: any[]): {
    geographic: Record<string, number>;
    contentTypes: Record<string, number>;
    industries: Record<string, number>;
  } {
    return {
      geographic: groupAndCount(links, 'country'),
      contentTypes: groupAndCount(links, 'type'),
      industries: groupAndCount(links, 'industry')
    };
  },

  // Identify relationship-building opportunities
  identifyRelationshipOpportunities(links: any[]): any[] {
    return links
      .filter(link => {
        // Filter for high-value relationship potential
        const hasContactInfo = Boolean(link.contactInfo);
        const isRelevant = link.relevancy > 70;
        const isActive = differenceInDays(new Date(), new Date(link.lastPost)) < 90;
        return hasContactInfo && isRelevant && isActive;
      })
      .map(link => ({
        ...link,
        relationshipScore: calculateRelationshipScore(link),
        outreachPriority: calculateOutreachPriority(link)
      }))
      .sort((a, b) => b.relationshipScore - a.relationshipScore);
  },

  // Analyze competitor backlink strategies
  analyzeCompetitorStrategies(competitorLinks: Record<string, any[]>): {
    uniqueOpportunities: any[];
    commonPatterns: any[];
    gaps: any[];
  } {
    // Implementation would identify patterns and opportunities
    return {
      uniqueOpportunities: [],
      commonPatterns: [],
      gaps: []
    };
  }
};

// Helper functions
function normalizeScore(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

function calculateAccessibilityScore(contactInfo: any): number {
  let score = 0;
  if (contactInfo.email) score += 40;
  if (contactInfo.social?.length) score += 30;
  if (contactInfo.contactForm) score += 20;
  if (contactInfo.phone) score += 10;
  return score;
}

function calculateRelationshipScore(link: any): number {
  const factors = {
    contentQuality: normalizeScore(link.contentMetrics?.quality || 0, 0, 100) * 0.3,
    authorAuthority: normalizeScore(link.authorMetrics?.authority || 0, 0, 100) * 0.3,
    engagement: normalizeScore(link.socialMetrics?.engagement || 0, 0, 100) * 0.2,
    responsiveness: normalizeScore(link.outreachMetrics?.responseRate || 0, 0, 100) * 0.2
  };

  return Object.values(factors).reduce((a, b) => a + b, 0);
}

function calculateOutreachPriority(link: any): number {
  const weights = {
    domainAuthority: 0.3,
    relevancy: 0.25,
    relationships: 0.25,
    accessibility: 0.2
  };

  return Object.entries(weights).reduce((score, [factor, weight]) => {
    return score + (link.metrics[factor] || 0) * weight;
  }, 0);
}
