import { apiClient } from './api/client';

interface ReportData {
  backlinks: any[];
  metrics: any;
  opportunities: any[];
  content: any;
}

interface ReportConfig {
  format: string;
  sections: {
    backlinks: boolean;
    metrics: boolean;
    opportunities: boolean;
    content: boolean;
  };
}

export const reportService = {
  // Generate comprehensive report
  async generateReport(domain: string, config: ReportConfig) {
    try {
      const response = await apiClient.post('/reports/generate', [{
        domain,
        config,
        format: config.format,
        include_raw_data: true
      }]);
      return response.tasks[0].result[0];
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw new Error('Failed to generate report');
    }
  },

  // Schedule recurring reports
  async scheduleReport(domain: string, config: ReportConfig) {
    try {
      const response = await apiClient.post('/reports/schedule', {
        domain,
        config
      });
      return response.tasks[0].result[0];
    } catch (error) {
      console.error('Failed to schedule report:', error);
      throw new Error('Failed to schedule report');
    }
  },

  // Get report status
  async getReportStatus(reportId: string) {
    try {
      const response = await apiClient.get(`/reports/status/${reportId}`);
      return response.tasks[0].result[0];
    } catch (error) {
      console.error('Failed to get report status:', error);
      throw new Error('Failed to get report status');
    }
  },

  // Download report
  async downloadReport(reportId: string) {
    try {
      const response = await apiClient.get(`/reports/download/${reportId}`);
      return response.tasks[0].result[0];
    } catch (error) {
      console.error('Failed to download report:', error);
      throw new Error('Failed to download report');
    }
  },

  // Internal methods
  private async gatherReportData(domain: string, config: ReportConfig): Promise<ReportData> {
    const promises: Promise<any>[] = [];
    
    if (config.sections.backlinks) {
      promises.push(apiClient.post('/dataforseo/backlinks/summary', { target: domain }));
    }
    if (config.sections.metrics) {
      promises.push(apiClient.post('/dataforseo/domain_analytics/domain', { target: domain }));
    }
    if (config.sections.opportunities) {
      promises.push(apiClient.post('/dataforseo/domain_analytics/competitors', { target: domain }));
    }
    if (config.sections.content) {
      promises.push(apiClient.post('/dataforseo/content_analysis/summary', { target: domain }));
    }

    const results = await Promise.all(promises);
    
    return {
      backlinks: results[0]?.data || [],
      metrics: results[1]?.data || {},
      opportunities: results[2]?.data || [],
      content: results[3]?.data || {}
    };
  },

  private async generatePDFReport(data: ReportData) {
    // Implementation would use a PDF generation library
    // Example using jsPDF or similar
    return await apiClient.post('/reports/generate-pdf', { data });
  },

  private async generateCSVReport(data: ReportData) {
    // Implementation would convert data to CSV format
    const csvData = this.convertToCSV(data);
    return new Blob([csvData], { type: 'text/csv' });
  },

  private async generateExcelReport(data: ReportData) {
    // Implementation would use xlsx library or similar
    return await apiClient.post('/reports/generate-excel', { data });
  },

  private convertToCSV(data: ReportData): string {
    // Implementation would convert data to CSV format
    // This is a simplified example
    const rows = [];
    
    // Add headers
    rows.push([
      'Metric',
      'Value',
      'Change',
      'Date'
    ].join(','));

    // Add data rows
    // ... implementation details ...

    return rows.join('\n');
  }
};
