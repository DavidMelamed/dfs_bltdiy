import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CompetitorSearchProps {
  onAddCompetitor: (domain: string) => void;
  onRemoveCompetitor: (domain: string) => void;
  competitors: string[];
  maxCompetitors?: number;
}

export const CompetitorSearch: React.FC<CompetitorSearchProps> = ({
  onAddCompetitor,
  onRemoveCompetitor,
  competitors,
  maxCompetitors = 3
}) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain && competitors.length < maxCompetitors) {
      onAddCompetitor(domain);
      setDomain('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter competitor domain"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={competitors.length >= maxCompetitors}
        />
        <button
          type="submit"
          disabled={!domain || competitors.length >= maxCompetitors}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {competitors.map((comp) => (
          <div
            key={comp}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
          >
            <span className="text-sm">{comp}</span>
            <button
              onClick={() => onRemoveCompetitor(comp)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
