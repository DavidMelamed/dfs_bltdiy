import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (data: { 
    keyword: string; 
    location: string; 
    language: string; 
  }) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState({
    keyword: '',
    location: 'United States',
    language: 'en'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.keyword) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="keyword" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Keyword
        </label>
        <input
          id="keyword"
          type="text"
          value={formData.keyword}
          onChange={(e) => setFormData(prev => ({ ...prev, keyword: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your search keyword"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="location" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., United States"
          />
        </div>

        <div>
          <label 
            htmlFor="language" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.keyword}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Search className="h-5 w-5" />
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
