import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FileText, BarChart2, MessageCircle } from 'lucide-react';
import { content } from '../services/content';
import { BarChart } from '../components/analytics/BarChart';

export default function ContentTools() {
  const [inputContent, setInputContent] = useState('');

  const { mutate: analyze, data: analysisResult, isLoading } = useMutation(
    (content: string) => content.analyzeContent({ content })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputContent) {
      analyze(inputContent);
    }
  };

  const keywordData = analysisResult?.content_info.keywords.map(kw => ({
    keyword: kw.keyword,
    count: kw.count,
    density: kw.density * 100
  })) || [];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <FileText className="mr-2" /> Content Analysis
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Enter your content to analyze..."
            className="w-full h-48 px-4 py-2 border border-gray-300 rounded-md resize-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </form>
      </div>

      {analysisResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2" /> Keyword Analysis
            </h2>
            <div className="h-80">
              <BarChart
                data={keywordData}
                xKey="keyword"
                yKey="count"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2" /> Content Stats
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Word Count</p>
                <p className="text-2xl font-bold">{analysisResult.content_info.word_count}</p>
              </div>
              <div>
                <p className="text-gray-600">Character Count</p>
                <p className="text-2xl font-bold">{analysisResult.content_info.char_count}</p>
              </div>
              <div>
                <p className="text-gray-600">Sentence Count</p>
                <p className="text-2xl font-bold">{analysisResult.content_info.sentence_count}</p>
              </div>
              <div>
                <p className="text-gray-600">Average Word Length</p>
                <p className="text-2xl font-bold">{analysisResult.content_info.avg_word_length.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
