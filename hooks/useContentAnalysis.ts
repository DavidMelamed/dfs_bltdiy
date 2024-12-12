// src/hooks/useContentAnalysis.ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';

export function useContentAnalysis() {
  const [analysisParams, setAnalysisParams] = useState<{
    type: 'url' | 'text';
    content: string;
  } | null>(null);

  const analysis = useQuery({
    queryKey: ['content-analysis', analysisParams],
    queryFn: () => 
      analysisParams 
        ? contentService.analyzeContent(analysisParams)
        : Promise.reject('No content to analyze'),
    enabled: !!analysisParams,
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });

  const analyze = (type: 'url' | 'text', content: string) => {
    setAnalysisParams({ type, content });
  };

  return {
    analyze,
    ...analysis,
    reset: () => setAnalysisParams(null)
  };
}

// Hook for content suggestions
export function useContentSuggestions(topic: string) {
  return useQuery({
    queryKey: ['content-suggestions', topic],
    queryFn: () => contentService.getContentSuggestions(topic),
    enabled: !!topic
  });
}
