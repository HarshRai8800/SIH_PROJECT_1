import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import HomePage from "./pages/HomePage";
import ChatbotPage from "./pages/ChatbotPage";
import CounsellingPage from "./pages/CounsellingPage";
import ResourcesPage from "./pages/ResourcesPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import NotFound from "./pages/NotFound";

// ✅ New role-based sign-in pages
import StudentSignIn from "./pages/StudentSignIn";
import CounsellorSignIn from "./pages/CounsellorSignIn";

// ✅ New dashboards for roles
import StudentDashboard from "./pages/StudentDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import CustomSignUp from "./components/Sign-up/CustomSignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/counselling" element={<CounsellingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />

          {/* ✅ New role-based routes */}
          <Route path="/student" element={<StudentSignIn />} />
          <Route path="/counsellor" element={<CounsellorSignIn />} />

          {/* ✅ Dashboards after login */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/counsellor/dashboard" element={<CounsellorDashboard />} />

          <Route path="/sign-up" element={<CustomSignUp/>} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
