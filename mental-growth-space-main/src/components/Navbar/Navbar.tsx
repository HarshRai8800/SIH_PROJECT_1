import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Calendar,
  BookOpen,
  Users,
  User,
  Brain,
  BarChart3,
  Dumbbell,        // ✅ icon for Exercises
} from "lucide-react";
import { ProgressRing } from "@/components/Profile/ProgressRing";
import { useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useUserProfile } from "@/context/UserProfileContext";

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { profile } = useUserProfile();
  const { getToken, isSignedIn } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // ✅ Added Exercises entry
  const navItems = [
    { path: "/", label: t("home"), icon: Brain },
    { path: "/chatbot", label: t("chatbot"), icon: MessageSquare },
    { path: "/counselling", label: t("counselling"), icon: Calendar },
    { path: "/resources", label: t("resources"), icon: BookOpen },
    { path: "/exercises", label: t("Activities"), icon: Dumbbell }, // NEW
    { path: "/forum", label: t("forum"), icon: Users },
    { path: "/admin", label: t("dashboard"), icon: BarChart3 },
  ];

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;
      const token = await getToken();
      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    };
    syncUser();
  }, [isSignedIn, getToken]);

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ---------- LEFT: Logo & selectors ---------- */}
          <div className="flex items-center space-x-4">
            {/* Logo hard-left */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">
                MindSpark
              </span>
            </Link>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {t("language")}: {i18n.language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {["en","hi","ks","ur","pa"].map((lng) => (
                  <DropdownMenuItem
                    key={lng}
                    onClick={() => i18n.changeLanguage(lng)}
                  >
                    {lng === "en"
                      ? "English"
                      : lng === "hi"
                      ? "हिन्दी"
                      : lng === "ks"
                      ? "کٲشُر / ڈوگری"
                      : lng === "ur"
                      ? "اردو"
                      : "ਪੰਜਾਬੀ"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {t("chooseRole")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/student">{t("roles.student")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/counsellor">{t("roles.counsellor")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin">{t("roles.admin")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ---------- CENTER/RIGHT: Nav links & auth ---------- */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth & Profile */}
          <div className="flex items-center space-x-8 ml-6">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Profile preview */}
            <Link
              to={
                profile?.role === "counsellor"
                  ? "/counsellor/profile"
                  : "/profile"
              }
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <ProgressRing progress={70} size={40} strokeWidth={3} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">
                  {profile?.role === "counsellor"
                    ? profile.fullName
                    : "Guest"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {profile?.role === "counsellor"
                    ? `${profile.specialization} (${profile.yearsExperience} yrs)`
                    : `${t("wellness")}: 70%`}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ---------- MOBILE ---------- */}
        <div className="md:hidden border-t border-border">
          <div className="grid grid-cols-3 py-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center py-2 px-1"
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive(path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                    isActive(path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
