// src/components/backlinks/AdvancedBacklinkTools.tsx
import React, { useState } from 'react';
import { useComprehensiveData } from '../../hooks/useComprehensiveData';
import { 
  Globe, 
  Search, 
  BarChart2, 
  ExternalLink,
  Archive,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { formatNumber, formatDate } from '../../utils/formatting';

interface BacklinkDetails {
  url: string;
  domain: string;
  indexedStatus?: 'indexed' | 'not_indexed' | 'checking';
  metrics: {
    traffic: number;
    domainRating: number;
    trustFlow: number;
    referringDomains: number;
  };
  contentMetrics?: {
    wordCount: number;
    readability: number;
    lastModified: string;
  };
}

export function AdvancedBacklinkTools() {
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [batchAction, setBatchAction] = useState<string>('');
  const { data, isLoading } = useComprehensiveData();
  
  // Batch check indexing status
  const checkIndexingStatus = async (urls: string[]) => {
    // Implementation would batch process URLs and update state
  };

  // Get traffic data for domains
  const fetchTrafficData = async (domains: string[]) => {
    // Implementation would fetch comprehensive traffic data
  };

  return (
    <div className="space-y-6">
      {/* Batch Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedLinks.length} links selected
            </span>
            <select 
              value={batchAction}
              onChange={(e) => setBatchAction(e.target.value)}
              className="rounded-md border-gray-300"
            >
              <option value="">Batch Actions</option>
              <option value="check_index">Check Index Status</option>
              <option value="fetch_metrics">Fetch All Metrics</option>
              <option value="export">Export Details</option>
            </select>
            <button
              disabled={!batchAction || selectedLinks.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              onClick={() => {/* Handle batch action */}}
            >
              Apply
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Select All
            </button>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Clear Selection
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Link Analysis */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Detailed Link Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL / Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Index Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.backlinks?.map((link: BacklinkDetails) => (
                <BacklinkRow
                  key={link.url}
                  link={link}
                  selected={selectedLinks.includes(link.url)}
                  onSelect={(url) => {
                    setSelectedLinks(prev => 
                      prev.includes(url)
                        ? prev.filter(u => u !== url)
                        : [...prev, url]
                    );
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickMetricsCard data={data} loading={isLoading} />
        <IndexingStatusCard data={data} loading={isLoading} />
        <ContentQualityCard data={data} loading={isLoading} />
      </div>
    </div>
  );
}

// Individual backlink row with detailed metrics
function BacklinkRow({ 
  link, 
  selected, 
  onSelect 
}: { 
  link: BacklinkDetails; 
  selected: boolean;
  onSelect: (url: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className={selected ? 'bg-blue-50' : undefined}>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(link.url)}
            className="rounded text-blue-600"
          />
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              {link.url.length > 60 ? link.url.substring(0, 60) + '...' : link.url}
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
            <span className="text-sm text-gray-500">{link.domain}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <IndexStatus status={link.indexedStatus} />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <MetricBadge
              label="DR"
              value={link.metrics.domainRating}
              color="blue"
            />
            <MetricBadge
              label="TF"
              value={link.metrics.trustFlow}
              color="green"
            />
            <MetricBadge
              label="Traffic"
              value={formatNumber(link.metrics.traffic)}
              color="purple"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          {link.contentMetrics && (
            <div className="text-sm text-gray-600">
              <div>{link.contentMetrics.wordCount} words</div>
              <div>Modified: {formatDate(link.contentMetrics.lastModified)}</div>
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {/* Check indexing */}}
              className="text-gray-400 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => {/* Fetch metrics */}}
              className="text-gray-400 hover:text-blue-600"
            >
              <BarChart2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-blue-600"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-6 py-4 bg-gray-50">
            <BacklinkDetails link={link} />
          </td>
        </tr>
      )}
    </>
  );
}

// Component for showing indexed status with visual indicator
function IndexStatus({ status }: { status?: string }) {
  switch (status) {
    case 'indexed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-4 w-4 mr-1" />
          Indexed
        </span>
      );
    case 'not_indexed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="h-4 w-4 mr-1" />
          Not Indexed
        </span>
      );
    case 'checking':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-4 w-4 mr-1" />
          Checking
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unknown
        </span>
      );
  }
}
