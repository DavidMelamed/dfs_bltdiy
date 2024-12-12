import React, { useState } from 'react';
import { useQuery } from '../contexts/QueryContext';
import { useComprehensiveData } from '@hooks/useComprehensiveData';
import { CompetitorMetrics } from '@components/competitors/CompetitorMetrics';
import { KeywordGapAnalysis } from '@components/competitors/KeywordGapAnalysis';
import { BacklinkComparison } from '@components/competitors/BacklinkComparison';
import { CompetitorSearch } from '@components/competitors/CompetitorSearch';

export default function CompetitorAnalysis() {
  const { state, addCompetitor, removeCompetitor } = useQuery();
  const { data, isLoading } = useComprehensiveData();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'keywords', label: 'Keyword Gap' },
    { id: 'backlinks', label: 'Backlink Analysis' },
    { id: 'content', label: 'Content Comparison' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with competitor selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Competitor Analysis</h1>
            <p className="text-gray-600 mt-1">
              Compare your site against up to 5 competitors
            </p>
          </div>
          <CompetitorSearch
            onAdd={addCompetitor}
            maxCompetitors={5}
            currentCount={state.competitors.length}
          />
        </div>

        {/* Selected Competitors */}
        <div className="flex flex-wrap gap-2 mt-4">
          {state.competitors.map(competitor => (
            <div
              key={competitor}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700"
            >
              <span>{competitor}</span>
              <button
                onClick={() => removeCompetitor(competitor)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 text-sm font-medium border-b-2 
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <CompetitorMetrics
              mainDomain={state.selectedDomain}
              competitors={state.competitors}
              data={data}
              loading={isLoading}
            />
          )}
          
          {activeTab === 'keywords' && (
            <KeywordGapAnalysis
              mainDomain={state.selectedDomain}
              competitors={state.competitors}
              data={data}
              loading={isLoading}
            />
          )}
          
          {activeTab === 'backlinks' && (
            <BacklinkComparison
              mainDomain={state.selectedDomain}
              competitors={state.competitors}
              data={data}
              loading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
