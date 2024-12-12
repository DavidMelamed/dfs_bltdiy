import React, { useState } from 'react';
import { LineChart } from '../analytics/LineChart';
import { CompetitorComparisonChart } from '../analytics/CompetitorComparisonChart';
import { dataForSEOService } from '../../../services/api/dataForSeo';
import { toast } from 'react-hot-toast';

interface ReportData {
  domain: string;
  dateRange: string;
  keywordTrends: any[];
  competitorData: any[];
  backlinkData: any[];
  summary: {
    totalKeywords: number;
    organicTraffic: number;
    domainAuthority: number;
    totalBacklinks: number;
  };
}

export const ReportGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [domain, setDomain] = useState('');
  const [dateRange, setDateRange] = useState('30d'); // Options: 7d, 30d, 90d, 12m

  const generateReport = async () => {
    if (!domain) {
      toast.error('Please enter a domain');
      return;
    }

    setLoading(true);
    try {
      // Fetch all necessary data in parallel
      const [
        keywordData,
        competitorData,
        backlinkData,
        domainMetrics
      ] = await Promise.all([
        dataForSEOService.getHistoricalSearchVolume({ domain, dateRange }),
        dataForSEOService.analyzeCompetitors({ domain }),
        dataForSEOService.getBacklinkData({ domain }),
        dataForSEOService.getDomainMetrics({ domain })
      ]);

      setReportData({
        domain,
        dateRange,
        keywordTrends: keywordData.tasks[0].result,
        competitorData: competitorData.tasks[0].result,
        backlinkData: backlinkData.tasks[0].result,
        summary: {
          totalKeywords: domainMetrics.tasks[0].result[0].total_keywords,
          organicTraffic: domainMetrics.tasks[0].result[0].organic_traffic,
          domainAuthority: domainMetrics.tasks[0].result[0].domain_authority,
          totalBacklinks: domainMetrics.tasks[0].result[0].total_backlinks
        }
      });

      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!reportData) return;

    const reportJson = JSON.stringify(reportData, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${reportData.domain}-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="12m">Last 12 months</option>
        </select>
        <button
          onClick={generateReport}
          disabled={loading || !domain}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {reportData && (
        <div className="space-y-8">
          {/* Summary Section */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="text-sm text-gray-500">Total Keywords</h4>
              <p className="text-2xl font-semibold">{reportData.summary.totalKeywords}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="text-sm text-gray-500">Organic Traffic</h4>
              <p className="text-2xl font-semibold">{reportData.summary.organicTraffic}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="text-sm text-gray-500">Domain Authority</h4>
              <p className="text-2xl font-semibold">{reportData.summary.domainAuthority}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="text-sm text-gray-500">Total Backlinks</h4>
              <p className="text-2xl font-semibold">{reportData.summary.totalBacklinks}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Keyword Trends</h3>
              <LineChart data={reportData.keywordTrends} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Competitor Comparison</h3>
              <CompetitorComparisonChart data={reportData.competitorData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Backlink Distribution</h3>
              <LineChart data={reportData.backlinkData} />
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={downloadReport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
