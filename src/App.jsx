import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/shared/CustomCursor';
import AnimatedRoutes from '@/components/layout/AnimatedRoutes';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageReady(true), 600);
    const handleLoad = () => setIsPageReady(true);
    window.addEventListener('load', handleLoad);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isPageReady || isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-black/10 border-t-black animate-spin" />
          <p className="font-display text-xl text-black">Setting the scene…</p>
        </div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col bg-white">
            <CustomCursor />
            <Navbar />
            <main className="flex-1 overflow-x-hidden">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App