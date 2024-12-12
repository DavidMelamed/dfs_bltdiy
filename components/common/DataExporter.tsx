import React, { useState } from 'react';
import { Download, FileText, Table, Calendar } from 'lucide-react';

interface ExportOption {
  id: string;
  label: string;
  description: string;
  formats: string[];
  icon: React.ComponentType<any>;
}

const exportOptions: ExportOption[] = [
  {
    id: 'keywords',
    label: 'Keyword Rankings',
    description: 'Export your keyword positions and metrics',
    formats: ['CSV', 'XLSX', 'JSON'],
    icon: FileText
  },
  {
    id: 'backlinks',
    label: 'Backlink Data',
    description: 'Export your backlink profile data',
    formats: ['CSV', 'XLSX', 'JSON'],
    icon: Link
  },
  {
    id: 'competitors',
    label: 'Competitor Analysis',
    description: 'Export competitor comparison data',
    formats: ['CSV', 'XLSX', 'JSON'],
    icon: Users
  }
];

export const DataExporter: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('CSV');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Add your export logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      // Success notification would go here
    } catch (error) {
      // Error handling would go here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Export Data</h2>

      {/* Export Options */}
      <div className="space-y-4 mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Select Data to Export
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`${
                  selectedOption === option.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                } p-4 border rounded-lg text-left transition-all`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Selection */}
      {selectedOption && (
        <div className="space-y-4 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Select Format
          </label>
          <div className="flex space-x-4">
            {exportOptions
              .find((opt) => opt.id === selectedOption)
              ?.formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`${
                    selectedFormat === format
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  } px-4 py-2 border rounded-md transition-all`}
                >
                  {format}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Date Range */}
      {selectedOption && (
        <div className="space-y-4 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      {selectedOption && (
        <button
          onClick={handleExport}
          disabled={isExporting || !dateRange.start || !dateRange.end}
          className={`${
            isExporting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Export Data
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default DataExporter;
