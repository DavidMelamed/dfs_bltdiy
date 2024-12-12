import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BarChart2, 
  Users, 
  FileText, 
  Globe, 
  Link as LinkIcon,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  Wrench,
  Database
} from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  metrics?: {
    value: string;
    label: string;
    trend?: number;
  }[];
  status?: 'new' | 'updated';
}

const featureCards: FeatureCard[] = [
  {
    title: 'Domain Analytics',
    description: 'Comprehensive domain analysis and metrics',
    icon: Database,
    route: '/domain-analytics',
    metrics: [
      { value: '76/100', label: 'Domain Rating', trend: 5 },
      { value: '12.5K', label: 'Backlinks', trend: 8 }
    ],
    status: 'new'
  },
  {
    title: 'SERP Analysis',
    description: 'Track and analyze search engine rankings',
    icon: Search,
    route: '/serp-analysis',
    metrics: [
      { value: '250+', label: 'Keywords Tracked' },
      { value: '15', label: 'Competitors', trend: 5 }
    ]
  },
  {
    title: 'Competitor Analysis',
    description: 'Monitor and analyze your competitors',
    icon: Users,
    route: '/competitor-analysis',
    metrics: [
      { value: '25', label: 'Competitors Tracked' },
      { value: '85%', label: 'Market Share', trend: -2 }
    ]
  },
  {
    title: 'Content Analysis',
    description: 'Analyze and optimize your content',
    icon: FileText,
    route: '/content-analysis',
    metrics: [
      { value: '150+', label: 'Pages Analyzed' },
      { value: '92%', label: 'Content Score', trend: 3 }
    ]
  },
  {
    title: 'Keyword Research',
    description: 'Find and analyze valuable keywords',
    icon: Search,
    route: '/keyword-research',
    metrics: [
      { value: '1.2M+', label: 'Keywords Database' },
      { value: '500+', label: 'Daily Searches', trend: 12 }
    ],
    status: 'updated'
  },
  {
    title: 'Backlink Analysis',
    description: 'Monitor your backlink profile',
    icon: LinkIcon,
    route: '/backlink-analysis',
    metrics: [
      { value: '15K+', label: 'Total Backlinks' },
      { value: '89', label: 'Domain Authority', trend: 4 }
    ]
  },
  {
    title: 'Technical SEO',
    description: 'Analyze technical SEO aspects',
    icon: Wrench,
    route: '/technical-seo',
    metrics: [
      { value: '98/100', label: 'Site Health' },
      { value: '0.8s', label: 'Load Time', trend: -15 }
    ]
  },
  {
    title: 'Rank Tracking',
    description: 'Track your keyword rankings',
    icon: BarChart2,
    route: '/rank-tracking',
    metrics: [
      { value: '65%', label: 'Top 10 Rankings', trend: 8 },
      { value: '32', label: 'Position Changes', trend: -5 }
    ]
  }
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600">DataForSEO Analytics</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your comprehensive SEO analytics platform. Get started by exploring our powerful tools below.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-10">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { name: 'Total Keywords', stat: '71,897', change: '12%', changeType: 'increase' },
              { name: 'Avg. Position', stat: '3.2', change: '2.1%', changeType: 'increase' },
              { name: 'Total Traffic', stat: '250K', change: '4.3%', changeType: 'decrease' },
            ].map((item) => (
              <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div className="absolute bg-indigo-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                  <p className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Feature Cards */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Keyword Research',
                description: 'Find and analyze the best keywords for your website',
                icon: Search,
                path: '/keyword-research'
              },
              {
                title: 'SERP Analysis',
                description: 'Track and analyze search engine rankings',
                icon: BarChart2,
                path: '/serp-analysis'
              },
              {
                title: 'Competitor Analysis',
                description: 'Monitor and analyze your competitors',
                icon: Users,
                path: '/competitor-analysis'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(feature.path)}
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <ArrowRight className="h-6 w-6" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
