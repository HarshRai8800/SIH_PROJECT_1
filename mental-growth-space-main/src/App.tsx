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
import Counse from "./pages/Counselling";
import AddStudentPage from "./pages/AddStudent";
import AddCounsellorPage from "./pages/AddCounsellor";
import BlockRequestPage from "./pages/BlockRequest"; 
// ✅ New role-based sign-in pages
import StudentSignIn from "./pages/StudentSignIn";
import CounsellorSignIn from "./pages/CounsellorSignIn";

// ✅ New dashboards for roles
import StudentDashboard from "./pages/StudentDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import CustomSignUp from "./components/Sign-up/CustomSignUp";
import SSOCallback from "./pages/SSOCallback";

// ✅ NEW: Edit profile page
import EditProfilePage from "./pages/EditProfilePage";

//counsellorProfile
import CounsellorProfile from "@/pages/CounsellorProfile";

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
          <Route path="/counse" element={<Counselling />} />
          <Route path="/add-student" element={<AddStudentPage />} />
        <Route path="/add-counsellor" element={<AddCounsellorPage />}/>
         <Route path="/block-request" element={<BlockRequestPage />} />

          {/* ✅ New role-based routes */}
          <Route path="/student" element={<StudentSignIn />} />
          <Route path="/counsellor" element={<CounsellorSignIn />} />

          {/* ✅ Dashboards after login */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/counsellor/dashboard" element={<CounsellorDashboard />} />
          {/* ✅ Edit Profile route */}
          <Route path="/edit-profile" element={<EditProfilePage />} />

          <Route path="/sign-up/*" element={<CustomSignUp/>} />
          <Route path="/sso-callback" element={<SSOCallback />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
