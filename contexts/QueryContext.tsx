// src/contexts/QueryContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface QueryState {
  selectedDomain: string;
  selectedKeywords: string[];
  competitors: string[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
  filters: {
    location: string;
    language: string;
    deviceType: 'desktop' | 'mobile' | 'tablet';
  };
}

interface QueryContextType {
  state: QueryState;
  setDomain: (domain: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  addCompetitor: (domain: string) => void;
  removeCompetitor: (domain: string) => void;
  setDateRange: (start: string, end: string) => void;
  updateFilters: (filters: Partial<QueryState['filters']>) => void;
}

const defaultState: QueryState = {
  selectedDomain: '',
  selectedKeywords: [],
  competitors: [],
  dateRange: {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString()
  },
  filters: {
    location: 'United States',
    language: 'en',
    deviceType: 'desktop'
  }
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QueryState>(defaultState);

  const setDomain = (domain: string) => {
    setState(prev => ({ ...prev, selectedDomain: domain }));
  };

  const addKeyword = (keyword: string) => {
    setState(prev => ({
      ...prev,
      selectedKeywords: [...new Set([...prev.selectedKeywords, keyword])]
    }));
  };

  const removeKeyword = (keyword: string) => {
    setState(prev => ({
      ...prev,
      selectedKeywords: prev.selectedKeywords.filter(k => k !== keyword)
    }));
  };

  const addCompetitor = (domain: string) => {
    setState(prev => ({
      ...prev,
      competitors: [...new Set([...prev.competitors, domain])]
    }));
  };

  const removeCompetitor = (domain: string) => {
    setState(prev => ({
      ...prev,
      competitors: prev.competitors.filter(d => d !== domain)
    }));
  };

  const setDateRange = (startDate: string, endDate: string) => {
    setState(prev => ({
      ...prev,
      dateRange: { startDate, endDate }
    }));
  };

  const updateFilters = (filters: Partial<QueryState['filters']>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  return (
    <QueryContext.Provider value={{
      state,
      setDomain,
      addKeyword,
      removeKeyword,
      addCompetitor,
      removeCompetitor,
      setDateRange,
      updateFilters
    }}>
      {children}
    </QueryContext.Provider>
  );
}

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within QueryProvider');
  }
  return context;
};
