import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Settings, Globe, Gauge } from 'lucide-react';

interface Issue {
  type: 'error' | 'warning' | 'success';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

const mockIssues: Issue[] = [
  {
    type: 'error',
    title: 'Missing SSL Certificate',
    description: 'Your website is not served over HTTPS',
    impact: 'High',
    recommendation: 'Install SSL certificate and enforce HTTPS'
  },
  {
    type: 'warning',
    title: 'Slow Page Load Speed',
    description: 'Average page load time is above 3 seconds',
    impact: 'Medium',
    recommendation: 'Optimize images and enable caching'
  },
  {
    type: 'success',
    title: 'Mobile Responsive',
    description: 'Your website is properly optimized for mobile devices',
    impact: 'Positive',
    recommendation: 'Continue monitoring mobile performance'
  }
];

const mockMetrics = {
  performance: {
    score: 85,
    loadTime: '2.5s',
    firstContentfulPaint: '1.2s',
    largestContentfulPaint: '2.8s'
  },
  security: {
    score: 92,
    sslValid: true,
    securityHeaders: 8,
    vulnerabilities: 0
  },
  accessibility: {
    score: 78,
    issues: 12,
    warnings: 5,
    passing: 95
  }
};

export default function TechnicalSEO() {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement domain analysis logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Technical SEO Analysis</h1>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Analyze
          </button>
        </form>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score</span>
              <span className="font-semibold">{mockMetrics.performance.score}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Load Time</span>
              <span className="font-semibold">{mockMetrics.performance.loadTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">FCP</span>
              <span className="font-semibold">{mockMetrics.performance.firstContentfulPaint}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score</span>
              <span className="font-semibold">{mockMetrics.security.score}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SSL Status</span>
              <span className={`font-semibold ${mockMetrics.security.sslValid ? 'text-green-600' : 'text-red-600'}`}>
                {mockMetrics.security.sslValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Security Headers</span>
              <span className="font-semibold">{mockMetrics.security.securityHeaders}/10</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Accessibility</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score</span>
              <span className="font-semibold">{mockMetrics.accessibility.score}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Issues</span>
              <span className="font-semibold text-red-600">{mockMetrics.accessibility.issues}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Passing Tests</span>
              <span className="font-semibold text-green-600">{mockMetrics.accessibility.passing}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Issues Found</h2>
        <div className="space-y-6">
          {mockIssues.map((issue, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                {issue.type === 'error' && (
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                )}
                {issue.type === 'warning' && (
                  <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                )}
                {issue.type === 'success' && (
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                  <p className="text-gray-600 mb-4">{issue.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Impact</span>
                      <p className="mt-1">{issue.impact}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Recommendation</span>
                      <p className="mt-1">{issue.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
