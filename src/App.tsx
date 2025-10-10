import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import Startups from "./pages/Startups";
import Blogs from "./pages/Blogs";
import Scholarships from "./pages/Scholarships";
import Courses from "./pages/Courses";
import PaidCourses from "./pages/PaidCourses";
import FreeCourses from "./pages/FreeCourses";
import CourseMaterials from "./pages/CourseMaterials";
import StartupSchemes from "./pages/StartupSchemes";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";
import Podcasts from "./pages/Podcasts";
import StudentDiscounts from "./pages/StudentDiscounts";
import AIBotFab from "@/components/ui/AIBotFab";
import Landing from "./pages/Landing";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-react";
import { ReactPlugin } from "@21st-extension/react";
import ProjectHunt from "./pages/ProjectHunt";
import StudentDashboard from "./pages/StudentDashboard";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import Studverse from "./pages/Studverse";
import CompanyJobs from "./pages/CompanyJobs";
import AITools from "./pages/AITools";
import Profile from "./pages/Profile";
import Certifications from "./pages/Certifications";
import Projects from "@/pages/Projects";

const queryClient = new QueryClient();

// --- Error Boundary Types ---
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// --- ErrorBoundary Fix ---
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Protected Route ---
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  useScrollToTop();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* Protected routes */}
        <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/project-hunt" element={<ProtectedRoute><ProjectHunt /></ProtectedRoute>} />
        <Route path="/startups" element={<ProtectedRoute><Startups /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/paid-courses" element={<ProtectedRoute><PaidCourses /></ProtectedRoute>} />
        <Route path="/free-courses" element={<ProtectedRoute><FreeCourses /></ProtectedRoute>} />
        <Route path="/course-materials" element={<ProtectedRoute><CourseMaterials /></ProtectedRoute>} />
        <Route path="/startup-schemes" element={<ProtectedRoute><StartupSchemes /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
        <Route path="/youtube-shorts" element={<ProtectedRoute><YouTubeShorts /></ProtectedRoute>} />
        <Route path="/podcasts" element={<ProtectedRoute><Podcasts /></ProtectedRoute>} />
        <Route path="/student-discounts" element={<ProtectedRoute><StudentDiscounts /></ProtectedRoute>} />
        <Route path="/studverse" element={<ProtectedRoute><Studverse /></ProtectedRoute>} />
        <Route path="/company-jobs" element={<ProtectedRoute><CompanyJobs /></ProtectedRoute>} />
        <Route path="/ai-tools" element={<ProtectedRoute><AITools /></ProtectedRoute>} />
        <Route path="/certifications" element={<ProtectedRoute><Certifications /></ProtectedRoute>} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Only show AIBotFab on allowed pages */}
      {!(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/") && <AIBotFab />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
          <AuthProvider>
            <BrowserRouter>
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
