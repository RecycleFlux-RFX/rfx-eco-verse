import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  User,
  Wallet,
  Gamepad2,
  Target,
  Trophy,
  Users,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  Crown,
  BarChart3,
  UserCheck,
  Zap
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const userNavItems = [
    { path: '/user-dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/games', label: 'Games', icon: Gamepad2 },
    { path: '/campaigns', label: 'Campaigns', icon: Target },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/referrals', label: 'Referrals', icon: Users },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/nft', label: 'NFTs', icon: Zap },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin Dashboard', icon: Shield },
    { path: '/admin/users', label: 'Manage Users', icon: UserCheck },
    { path: '/admin/games', label: 'Manage Games', icon: Gamepad2 },
    { path: '/admin/campaigns', label: 'Manage Campaigns', icon: Target },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const superAdminNavItems = [
    { path: '/super-admin', label: 'Super Admin', icon: Crown },
    { path: '/super-admin/platform', label: 'Platform Settings', icon: Settings },
    { path: '/super-admin/reports', label: 'Reports', icon: BarChart3 },
    ...adminNavItems,
  ];

  const getNavItems = () => {
    switch (user.role) {
      case 'super_admin':
        return [...userNavItems, ...superAdminNavItems];
      case 'admin':
        return [...userNavItems, ...adminNavItems];
      default:
        return userNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text-primary">RFX EcoVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Badge 
              className={
                user.role === 'super_admin' ? 'bg-gradient-accent' :
                user.role === 'admin' ? 'bg-gradient-secondary' :
                'bg-gradient-primary'
              }
            >
              {user.role === 'super_admin' ? 'Super Admin' :
               user.role === 'admin' ? 'Admin' : 'User'}
            </Badge>
            
            <div className="flex items-center space-x-2">
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;