import { useState, useCallback, useRef } from 'react';
import { dataForSEOService, DataForSEOError } from '@services/api/dataForSeo';
import type { SERPParams, KeywordParams, DomainParams } from '@types/api';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SearchFormData, SearchResult } from '@types';

interface UseSearchOptions {
  type: 'serp' | 'keyword' | 'domain';
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useSearch({ type, onSuccess, onError }: UseSearchOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(async (params: SERPParams | KeywordParams | DomainParams) => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      let result;
      switch (type) {
        case 'serp':
          result = await dataForSEOService.searchSERP(params as SERPParams);
          break;
        case 'keyword':
          result = await dataForSEOService.searchKeywords(params as KeywordParams);
          break;
        case 'domain':
          result = await dataForSEOService.searchDomain(params as DomainParams);
          break;
        default:
          throw new Error('Invalid search type');
      }
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [type, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    search,
    reset,
    cancel,
    isLoading,
    error,
    data
  };
}

export function useSearchMutation() {
  return useMutation<SearchResult[], DataForSEOError, SearchFormData>(
    async (data) => {
      const result = await dataForSEOService.performSearch({
        keyword: data.keyword,
        location: data.location,
        language: data.language,
      });

      return result.items.map((item, index) => ({
        id: `${index}-${item.rank_group}`,
        keyword: data.keyword,
        position: item.rank_group,
        url: item.url,
        title: item.title,
        snippet: item.snippet,
      }));
    }
  );
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => dataForSEOService.getLocations(),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => dataForSEOService.getLanguages(),
  });
}
