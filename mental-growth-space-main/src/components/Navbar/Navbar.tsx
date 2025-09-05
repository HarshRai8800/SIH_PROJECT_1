import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Users, 
  User,
  Brain,
  BarChart3
} from 'lucide-react';
import { ProgressRing } from '@/components/Profile/ProgressRing';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Brain },
    { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
    { path: '/counselling', label: 'Counselling', icon: Calendar },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/forum', label: 'Forum', icon: Users },
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">MindCare</span>
          </Link>

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

          {/* Profile Section */}
          <Link to="/profile" className="flex items-center space-x-3">
            <div className="relative">
              <ProgressRing progress={70} size={40} strokeWidth={3} />
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-foreground">Alex Johnson</div>
              <div className="text-xs text-muted-foreground">Wellness: 70%</div>
            </div>
          </Link>
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
                    className={`w-5 h-5 ${
                      isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                    }`} 
                  />
                  <span className={`text-xs mt-1 ${
                    isActive(item.path) ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
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