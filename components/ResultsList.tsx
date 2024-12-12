import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  position: number;
}

interface ResultsListProps {
  results: SearchResult[];
}

export function ResultsList({ results }: ResultsListProps) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No results found. Try adjusting your search terms.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div
          key={`${result.url}-${index}`}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {result.title}
              </h3>
              <p className="text-gray-600 mb-2">{result.snippet}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Position: {result.position}
                </span>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  Visit <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
up to date, audited 340 packages in 750ms

65 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
