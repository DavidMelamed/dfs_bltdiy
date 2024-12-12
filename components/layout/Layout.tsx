import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Settings,
  LogOut,
  Sun,
  Moon,
  BarChart2,
  Search,
  Globe,
  Users,
  Link as LinkIcon,
  FileText,
  Wrench,
  TrendingUp
} from 'lucide-react';
import { appRoutes } from '@/routes';
import { useTheme } from '@/components/theme-provider';
import { Transition } from '@headlessui/react';

const IconMap = {
  BarChart2,
  Search,
  Globe,
  Users,
  Link: LinkIcon,
  FileText,
  Wrench,
  TrendingUp
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  const currentRoute = appRoutes.find(route => route.path === location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform 
          transition-transform duration-300 lg:transform-none"
        enter="transition ease-out duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DataForSEO</h1>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 
                  dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {appRoutes
              .filter(route => route.showInNav)
              .map((route) => {
                const Icon = route.icon ? IconMap[route.icon as keyof typeof IconMap] : null;
                return (
                  <button
                    key={route.path}
                    onClick={() => {
                      navigate(route.path);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`
                      w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 
                      ${location.pathname === route.path
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
                    `}
                  >
                    {Icon && <Icon className="h-5 w-5 mr-3 flex-shrink-0" />}
                    <span className="flex-1 truncate">{route.title}</span>
                  </button>
                );
              })}
          </nav>
        </div>
      </Transition>

      {/* Main Content */}
      <div className={`lg:pl-64 flex flex-col min-h-screen`}>
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100
                  dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              {currentRoute && (
                <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {currentRoute.title}
                </h1>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100
                  dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100
                  dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  // Add logout logic here
                  navigate('/login');
                }}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100
                  dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
