// src/components/reporting/ReportGenerator.tsx
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar,
  Clock,
  Settings
} from 'lucide-react';
import { formatDate } from '../../utils/formatting';

interface ReportConfig {
  sections: {
    backlinks: boolean;
    metrics: boolean;
    opportunities: boolean;
    content: boolean;
  };
  format: 'pdf' | 'csv' | 'excel';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    email: string;
  };
}

export function ReportGenerator() {
  const [config, setConfig] = useState<ReportConfig>({
    sections: {
      backlinks: true,
      metrics: true,
      opportunities: true,
      content: true
    },
    format: 'pdf'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // Implementation would gather data and generate report
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Download or email the report
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Generate Report</h2>
        <p className="text-gray-600 mt-1">
          Customize and export your backlink analysis
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Report Sections */}
        <div>
          <h3 className="text-lg font-medium mb-4">Include Sections</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(config.sections).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      [key]: e.target.checked
                    }
                  }))}
                  className="rounded text-blue-600"
                  id={`section-${key}`}
                />
                <label 
                  htmlFor={`section-${key}`}
                  className="text-gray-700 capitalize"
                >
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Export Format */}
        <div>
          <h3 className="text-lg font-medium mb-4">Export Format</h3>
          <div className="grid grid-cols-3 gap-4">
            {['pdf', 'csv', 'excel'].map(format => (
              <button
                key={format}
                onClick={() => setConfig(prev => ({ ...prev, format: format as any }))}
                className={`
                  p-4 rounded-lg border-2 text-center
                  ${config.format === format 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <FileText className="h-6 w-6 mx-auto mb-2" />
                <span className="uppercase">{format}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scheduling Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Schedule Reports</h3>
            <button
              onClick={() => setScheduleEnabled(!scheduleEnabled)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {scheduleEnabled ? 'Disable' : 'Enable'} Scheduling
            </button>
          </div>

          {scheduleEnabled && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select 
                  className="w-full rounded-md border-gray-300"
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    schedule: {
                      ...prev.schedule!,
                      frequency: e.target.value as any
                    }
                  }))}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Recipients
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border-gray-300"
                  placeholder="Enter email addresses"
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    schedule: {
                      ...prev.schedule!,
                      email: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setConfig({
              sections: {
                backlinks: true,
                metrics: true,
                opportunities: true,
                content: true
              },
              format: 'pdf'
            })}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Reset
          </button>
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {isGenerating ? (
              <>
                <Clock className="animate-spin h-4 w-4 mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
