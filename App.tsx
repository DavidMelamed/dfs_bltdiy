import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/common/LoadingScreen';
import { appRoutes } from '@/routes';

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AuthRequired({ children }: { children: React.ReactNode }) {
  // Add your auth check logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <Toaster position="top-right" />
          <BrowserRouter>
            <Layout>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {appRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.requiresAuth ? (
                          <AuthRequired>
                            {route.element}
                          </AuthRequired>
                        ) : (
                          route.element
                        )
                      }
                    />
                  ))}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
