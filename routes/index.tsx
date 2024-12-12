import { lazy, ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const KeywordResearch = lazy(() => import('@/pages/KeywordResearch'));
const SerpAnalysis = lazy(() => import('@/pages/SerpAnalysis'));
const CompetitorAnalysis = lazy(() => import('@/pages/CompetitorAnalysis'));
const BacklinkAnalysis = lazy(() => import('@/pages/BacklinkAnalysis'));
const ContentAnalysis = lazy(() => import('@/pages/ContentAnalysis'));
const ContentTools = lazy(() => import('@/pages/ContentTools'));
const DomainAnalytics = lazy(() => import('@/pages/DomainAnalytics'));
const RankTracking = lazy(() => import('@/pages/RankTracking'));
const Home = lazy(() => import('@/pages/Home'));

export type RouteIcon = 'BarChart2' | 'Search' | 'Globe' | 'Users' | 'Link' | 'FileText' | 'Wrench' | 'TrendingUp';

export interface AppRoute extends Omit<RouteObject, 'element'> {
  element: ReactNode;
  title: string;
  icon?: RouteIcon;
  showInNav?: boolean;
  requiresAuth?: boolean;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <Home />,
    title: 'Home',
    showInNav: false
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'Dashboard',
    icon: 'BarChart2',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/keywords',
    element: <KeywordResearch />,
    title: 'Keyword Research',
    icon: 'Search',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/serp',
    element: <SerpAnalysis />,
    title: 'SERP Analysis',
    icon: 'Globe',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/competitors',
    element: <CompetitorAnalysis />,
    title: 'Competitor Analysis',
    icon: 'Users',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/backlinks',
    element: <BacklinkAnalysis />,
    title: 'Backlink Analysis',
    icon: 'Link',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/content',
    element: <ContentAnalysis />,
    title: 'Content Analysis',
    icon: 'FileText',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/content-tools',
    element: <ContentTools />,
    title: 'Content Tools',
    icon: 'Wrench', // Changed from Tool to Wrench
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/domain',
    element: <DomainAnalytics />,
    title: 'Domain Analytics',
    icon: 'Globe',
    showInNav: true,
    requiresAuth: true
  },
  {
    path: '/rank-tracking',
    element: <RankTracking />,
    title: 'Rank Tracking',
    icon: 'TrendingUp',
    showInNav: true,
    requiresAuth: true
  }
];

export default appRoutes;
