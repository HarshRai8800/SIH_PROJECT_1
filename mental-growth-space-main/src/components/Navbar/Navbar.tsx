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
  Dumbbell,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { isSignedIn } = useUser();

  const [role, setRole] = useState<string | null>(null);

  // ✅ Load role from localStorage once
  useMemo(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  console.log(role)
  const isActive = (path: string) => location.pathname === path;

  const languageNames: Record<string, string> = {
    en: "English",
    hi: "हिन्दी",
    ks: "کٲشُر / ڈوگری",
    ur: "اردو",
    pa: "ਪੰਜਾਬੀ",
  };

  // Items visible to everyone
  const commonItems = [
    { path: "/", label: t("home"), icon: Brain },
  ];

  // Items for signed-in users (role-based)
  const privateItems = [
    { path: "/chatbot", label: t("chatbot"), icon: MessageSquare, role: "student" },
    { path: "/counselling", label: t("counselling"), icon: Calendar, role: "student" },
    { path: "/resources", label: t("resources"), icon: BookOpen, role: "student" },
    { path: "/forum", label: t("forum"), icon: Users, role: "student" },
    { path: "/student/dashboard", label: t("dashboard"), icon: BarChart3, role: "student" },
     { path: "/counsellor/dashboard", label: t("dashboard"), icon: BarChart3, role: "counsellor" },
    { path: "/admin", label: t("dashboard"), icon: BarChart3, role: "admin" },
    { path: "/admin/add-student", label: t("add student"), icon: BarChart3, role: "admin" },
    { path: "/admin/add-counsellor", label: t("add counsellor"), icon: BarChart3, role: "admin" },
    { path: "/admin/block-request", label: t("block request"), icon: BarChart3, role: "admin" },
    { path: "/exercises", label: t("Activities"), icon: Dumbbell }, 
  ];

  // 🌐 Language dropdown
  const LanguageButton = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isSignedIn ? "default" : "ghost"} size="sm">
          {languageNames[i18n.language] || i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem key={code} onClick={() => i18n.changeLanguage(code)}>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border fixed top-0 left-0 right-0 z-[9999] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/favicon.ico"
                alt="MindSpark Logo"
                className="h-16 w-16 object-contain"
              />
              <span className="font-bold text-xl text-foreground">MindSpark</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {commonItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            {!isSignedIn && LanguageButton}

            <SignedIn>
              {privateItems.map((item) => {
                if (item.role && role !== item.role) return null;
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {LanguageButton}

              <Link to="/profile">
                <Button
                  variant={isActive("/profile") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="capitalize">{t("profile")}</span>
                </Button>
              </Link>

              <UserButton />
            </SignedIn>

            <SignedOut>
              <Link to="/sign-up">
                <Button
                  variant={isActive("/sign-up") ? "default" : "ghost"}
                  size="sm"
                >
                  <span>{t("sign_up") || "Sign Up"}</span>
                </Button>
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden border-t border-border">
            <div className="grid grid-cols-3 py-2">
              {commonItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} className="flex flex-col items-center py-2 px-1">
                    <Icon
                      className={`w-5 h-5 ${isActive(item.path) ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className={`capitalize text-xs mt-1 ${isActive(item.path) ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {LanguageButton}

              {!isSignedIn ? (
                <Link to="/sign-up" className="flex flex-col items-center py-2 px-1">
                  <span className="text-xs mt-1 text-primary font-medium">
                    {t("sign_up") || "Sign Up"}
                  </span>
                </Link>
              ) : (
                <Link to="/profile" className="flex flex-col items-center py-2 px-1">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs mt-1">{t("profile")}</span>
                </Link>
              )}

              <SignedIn>
                {privateItems.map((item) => {
                  if (item.role && role !== item.role) return null;
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path} className="flex flex-col items-center py-2 px-1">
                      <Icon
                        className={`w-5 h-5 ${isActive(item.path) ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className={`capitalize text-xs mt-1 ${isActive(item.path) ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
