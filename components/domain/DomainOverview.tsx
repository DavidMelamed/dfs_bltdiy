import React from 'react';
import { Globe, TrendingUp, Users, Link as LinkIcon, Search } from 'lucide-react';

interface DomainMetric {
  label: string;
  value: string;
  trend?: number;
  icon: React.ComponentType<any>;
}

const metrics: DomainMetric[] = [
  { label: 'Domain Rating', value: '76/100', trend: 5, icon: Globe },
  { label: 'Organic Traffic', value: '250K', trend: 8, icon: Users },
  { label: 'Backlinks', value: '12.5K', trend: 15, icon: LinkIcon },
  { label: 'Organic Keywords', value: '15.2K', trend: 12, icon: Search },
];

export const DomainOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-600">{metric.label}</span>
                </div>
                {metric.trend && (
                  <div className={`flex items-center ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className={`h-4 w-4 ${metric.trend > 0 ? '' : 'transform rotate-180'}`} />
                    <span className="ml-1 text-sm">{Math.abs(metric.trend)}%</span>
                  </div>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Traffic Distribution</h3>
          {/* Add traffic distribution chart component here */}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          {/* Add top pages table component here */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Historical Performance</h3>
        {/* Add historical performance chart component here */}
      </div>
    </div>
  );
};

export default DomainOverview;
