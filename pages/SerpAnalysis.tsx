import React, { useState } from 'react';
import { useSearch } from '@hooks/useSearch';
import { SearchForm } from '@/components/SearchForm';
import { ResultsList } from '@/components/ResultsList';
import { toast } from 'react-hot-toast';

export default function SerpAnalysis() {
  const [searchParams, setSearchParams] = useState<{
    keyword: string;
    location: string;
    language: string;
  } | null>(null);

  const { data, isLoading, error } = useSearch({
    type: 'serp',
    // Only call the search when we have parameters
    enabled: !!searchParams,
    params: searchParams
  });

  const handleSearch = (formData: { keyword: string; location: string; language: string }) => {
    setSearchParams(formData);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
          <h3 className="text-sm font-medium text-red-800">
            Error loading SERP results
          </h3>
          <p className="mt-2 text-sm text-red-700">
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            SERP Analysis
          </h1>
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : data?.items ? (
          <ResultsList results={data.items} />
        ) : null}

        {/* No Results State */}
        {!isLoading && searchParams && !data?.items?.length && (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
