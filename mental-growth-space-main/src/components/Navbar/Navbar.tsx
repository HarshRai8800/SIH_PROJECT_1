import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Calendar,
  BookOpen,
  Users,
  User,
  Brain,
  BarChart3,
} from "lucide-react";
import { ProgressRing } from "@/components/Profile/ProgressRing";
import { useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslation } from "react-i18next";
// ✅ NEW: import user profile context
import { useUserProfile } from "@/context/UserProfileContext";

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: t("home"), icon: Brain },
    { path: "/chatbot", label: t("chatbot"), icon: MessageSquare },
    { path: "/counselling", label: t("counselling"), icon: Calendar },
    { path: "/resources", label: t("resources"), icon: BookOpen },
    { path: "/forum", label: t("forum"), icon: Users },
    { path: "/admin", label: t("dashboard"), icon: BarChart3 },
  ];


 

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Language toggle + Logo + Role selection */}
          <div className="flex items-center space-x-2">
            {/* ✅ Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {t("language")}: {i18n.language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("hi")}>
                  हिन्दी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("ks")}>
                  کٲشُر / ڈوگری
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("ur")}>
                  اردو
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("pa")}>
                  ਪੰਜਾਬੀ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">MindSpark</span>
            </Link>

            {/* Role Selection Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <span>{t("chooseRole")}</span>
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

          {/* Sign-in / Sign-out */}
          <SignedOut>
            <Link to="/sign-up">
              <button>Sign-up</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>


          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* ✅ Profile Section - dynamic counsellor info + conditional link
          <Link
            to={profile?.role === "counsellor" ? "/counsellor/profile" : "/profile"}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <ProgressRing progress={70} size={40} strokeWidth={3} />
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="hidden sm:block">
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
          </Link> */}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="grid grid-cols-3 py-2">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center py-2 px-1"
                >
                  <Icon
                    className={`w-5 h-5 ${isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                      }`}
                  />
                  <span
                    className={`text-xs mt-1 ${isActive(item.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;