import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface DomainSearchProps {
  onSearch: (domain: string) => void;
  placeholder?: string;
}

export const DomainSearch: React.FC<DomainSearchProps> = ({ 
  onSearch, 
  placeholder = "Enter domain name..." 
}) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onSearch(domain.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};
