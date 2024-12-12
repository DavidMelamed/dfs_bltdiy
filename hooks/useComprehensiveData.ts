import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useQuery as useQueryContext } from '../contexts/QueryContext';
import {
  getDomainAnalysis,
  getKeywordAnalysis,
  getCompetitorAnalysis,
  getContentAnalysis
} from '../services/comprehensiveApi';

export function useComprehensiveData() {
  const { state } = useQueryContext();
  const { selectedDomain, selectedKeywords, competitors, filters } = state;

  // Domain Analysis
  const domainQuery = useQuery(
    ['domain-analysis', selectedDomain, filters],
    () => getDomainAnalysis(selectedDomain, filters),
    { enabled: !!selectedDomain }
  );

  // Keyword Analysis
  const keywordQuery = useQuery(
    ['keyword-analysis', selectedKeywords, filters],
    () => getKeywordAnalysis(selectedKeywords, filters),
    { enabled: selectedKeywords.length > 0 }
  );

  // Competitor Analysis
  const competitorQuery = useQuery(
    ['competitor-analysis', selectedDomain, competitors, filters],
    () => getCompetitorAnalysis(selectedDomain, competitors, filters),
    { enabled: !!selectedDomain && competitors.length > 0 }
  );

  // Combined data with loading states
  return {
    data: {
      domain: domainQuery.data,
      keywords: keywordQuery.data,
      competitors: competitorQuery.data
    },
    isLoading: domainQuery.isLoading || keywordQuery.isLoading || competitorQuery.isLoading,
    error: domainQuery.error || keywordQuery.error || competitorQuery.error
  };
}

// Hook for content analysis
export function useContentAnalysis(url: string, content: string) {
  const { state: { selectedKeywords } } = useQueryContext();

  return useQuery(
    ['content-analysis', url, content, selectedKeywords],
    () => getContentAnalysis(url, content, selectedKeywords),
    { enabled: !!(url || content) }
  );
}
