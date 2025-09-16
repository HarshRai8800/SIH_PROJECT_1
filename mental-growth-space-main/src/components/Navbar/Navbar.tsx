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
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslation } from "react-i18next";

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { isSignedIn } = useUser(); // ✅ check if user is signed in

  const isActive = (path: string) => location.pathname === path;

  const languageNames: Record<string, string> = {
    en: "English",
    hi: "हिन्दी",
    ks: "کٲشُر / ڈوگری",
    ur: "اردو",
    pa: "ਪੰਜਾਬੀ",
  };

  // Nav items visible to everyone
  const commonItems = [
    { path: "/", label: t("home"), icon: Brain },
  ];

  // Nav items only for signed-in users
  const privateItems = [
    { path: "/chatbot", label: t("chatbot"), icon: MessageSquare },
    { path: "/counselling", label: t("counselling"), icon: Calendar },
    { path: "/resources", label: t("resources"), icon: BookOpen },
    { path: "/forum", label: t("forum"), icon: Users },
    { path: "/student-dashboard", label: t("dashboard"), icon: BarChart3 },
  ];

  // Language dropdown element reused in both states
  const LanguageButton = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isSignedIn ? "default" : "ghost"} // 🔑 highlight when signed in
          size="sm"
        >
          {languageNames[i18n.language] || i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("hi")}>हिन्दी</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("ks")}>کٲشُر / ڈوگری</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("ur")}>اردو</DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("pa")}>ਪੰਜਾਬੀ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/favicon.ico"           // ✅ public folder path
                alt="MindSpark Logo"
                className="h-16 w-16 object-contain"
              />
              <span className="font-bold text-xl text-foreground">MindSpark</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home link */}
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
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            {/* 🌐 If signed out → show Language right after Home */}
            {!isSignedIn && LanguageButton}

            <SignedIn>
              {/* Dashboard links first */}
              {privateItems.map((item) => {
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

              {/* 🌐 Language button now between Dashboard and Profile */}
              {LanguageButton}

              {/* Profile button */}
              <Link to="/profile">
                <Button
                  variant={isActive("/profile") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{t("profile")}</span>
                </Button>
              </Link>

              {/* Clerk User Avatar */}
              <UserButton />
            </SignedIn>

            {/* Sign-up button for signed-out users */}
            <SignedOut>
              <Link to="/sign-up">
                <Button
                  variant={isActive("/sign-up") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <span>{t("Sign Up") || "Sign Up"}</span>
                </Button>
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-border">
            <div className="grid grid-cols-3 py-2">
              {commonItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center py-2 px-1"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive(item.path)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-xs mt-1 ${
                        isActive(item.path)
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* 🌐 Language always visible on mobile */}
              {LanguageButton}

              {/* Sign-up or Profile depending on auth */}
              {!isSignedIn ? (
                <Link
                  to="/sign-up"
                  className="flex flex-col items-center py-2 px-1"
                >
                  <span className="text-xs mt-1 text-primary font-medium">
                    {t("sign_up") || "Sign-up"}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="flex flex-col items-center py-2 px-1"
                >
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs mt-1">{t("profile")}</span>
                </Link>
              )}

              <SignedIn>
                {privateItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-center py-2 px-1"
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive(item.path)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-xs mt-1 ${
                          isActive(item.path)
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
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
