import React from 'react';
import { FileText, Edit, BarChart2, Search, ArrowRight } from 'lucide-react';

interface ContentCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  metrics?: {
    label: string;
    value: string;
  }[];
  status?: 'draft' | 'published' | 'scheduled';
}

const contentCards: ContentCard[] = [
  {
    title: 'SEO Best Practices Guide',
    description: 'Comprehensive guide to modern SEO techniques and strategies',
    icon: FileText,
    metrics: [
      { label: 'Views', value: '2.5K' },
      { label: 'Time on Page', value: '5:30' }
    ],
    status: 'published'
  },
  {
    title: 'Content Optimization Tips',
    description: 'Learn how to optimize your content for better search rankings',
    icon: Edit,
    metrics: [
      { label: 'Views', value: '1.8K' },
      { label: 'Time on Page', value: '4:15' }
    ],
    status: 'published'
  },
  {
    title: 'Analytics Deep Dive',
    description: 'Understanding SEO analytics and metrics',
    icon: BarChart2,
    metrics: [
      { label: 'Views', value: '3.2K' },
      { label: 'Time on Page', value: '6:45' }
    ],
    status: 'published'
  },
  {
    title: 'Keyword Research Guide',
    description: 'Master the art of finding the right keywords',
    icon: Search,
    metrics: [
      { label: 'Views', value: '1.5K' },
      { label: 'Time on Page', value: '3:45' }
    ],
    status: 'draft'
  }
];

export default function ContentHub() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Hub</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Create Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.description}</p>
                  </div>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  card.status === 'published' 
                    ? 'bg-green-100 text-green-800'
                    : card.status === 'draft'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {card.status}
                </span>
              </div>

              {card.metrics && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {card.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className="text-lg font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
