import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import {
  Crown,
  Users,
  Target,
  Gamepad2,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Shield,
  Activity,
  Database,
  Zap,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface SuperAdminDashboardData {
  totalPlatformUsers: number;
  newUsersLastMonthPercentage: number;
  rfxTokensDistributed: number;
  platformRevenueMonthly: number;
  systemUptimePercentage: number;
  dailyRewardAmount: number;
  campaignRewardLimit: number;
  referralBonus: number;
  maintenanceMode: string;
  databaseTotalRecords: number;
  databaseStorageUsedGB: number;
  databaseQueryPerformance: string;
  activeSessions: number;
  countriesCount: number;
  peakConcurrentUsers: number;
  sslStatus: string;
  firewallStatus: string;
  threatsBlockedCount: number;
  alerts: { type: string; message: string; details: string; }[];
}

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<SuperAdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || user.role !== 'super_admin') {
        setIsLoading(false);
        setError('You don\'t have permission to access this page.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<SuperAdminDashboardData>(`${API_BASE_URL}/super-admin/dashboard-summary`);
        setDashboardData(response.data);
      } catch (err: any) {
        console.error('Failed to fetch super admin dashboard data:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg p-6 flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <CardTitle className="text-2xl mb-4">Loading Super Admin Dashboard...</CardTitle>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen animated-bg p-6 flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <CardTitle className="text-2xl mb-4">Access Denied</CardTitle>
          <CardDescription>{error}</CardDescription>
        </Card>
      </div>
    );
  }

  if (!user || user.role !== 'super_admin') {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <CardTitle className="text-2xl mb-4">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this page.</CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Crown className="w-8 h-8 mr-3 text-accent" />
            Super Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform-wide control and analytics. Manage all aspects of RFX EcoVerse.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Platform Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalPlatformUsers}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +{dashboardData?.newUsersLastMonthPercentage}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RFX Tokens Distributed</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.rfxTokensDistributed / 1000000}M</div>
              <p className="text-xs text-muted-foreground">
                Total ecosystem circulation
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(dashboardData?.platformRevenueMonthly / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground">
                Monthly recurring revenue
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{dashboardData?.systemUptimePercentage}%</div>
              <p className="text-xs text-muted-foreground">
                Uptime this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Platform Settings
                </span>
                <Button size="sm" className="bg-gradient-accent hover:opacity-90">
                  <Edit className="w-4 h-4 mr-1" />
                  Configure
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Daily Reward Amount</p>
                    <p className="text-xs text-muted-foreground">Base RFX for daily login</p>
                  </div>
                  <Badge variant="outline">{dashboardData?.dailyRewardAmount} RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Campaign Reward Limit</p>
                    <p className="text-xs text-muted-foreground">Max RFX per campaign</p>
                  </div>
                  <Badge variant="outline">{dashboardData?.campaignRewardLimit} RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Referral Bonus</p>
                    <p className="text-xs text-muted-foreground">RFX for successful referral</p>
                  </div>
                  <Badge variant="outline">{dashboardData?.referralBonus} RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Platform accessibility</p>
                  </div>
                  <Badge className={dashboardData?.maintenanceMode === 'Active' ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>{dashboardData?.maintenanceMode}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Management */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Admin Management
                </span>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Admin
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[ // This data should be fetched from /api/super-admin/admins
                  { name: 'David Wilson', email: 'david@rfx.com', status: 'Active', lastLogin: '2 hours ago' },
                  { name: 'Emma Johnson', email: 'emma@rfx.com', status: 'Active', lastLogin: '1 day ago' },
                  { name: 'Mike Brown', email: 'mike@rfx.com', status: 'Suspended', lastLogin: '1 week ago' },
                ].map((admin, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <p className="text-sm font-medium">{admin.name}</p>
                      <p className="text-xs text-muted-foreground">{admin.email} • {admin.lastLogin}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={admin.status === 'Active' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {admin.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Records</span>
                  <span className="font-medium">{dashboardData?.databaseTotalRecords / 1000}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-medium">{dashboardData?.databaseStorageUsedGB} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Query Performance</span>
                  <Badge className="bg-success/20 text-success">{dashboardData?.databaseQueryPerformance}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Global Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-medium">{dashboardData?.activeSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Countries</span>
                  <span className="font-medium">{dashboardData?.countriesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peak Concurrent</span>
                  <span className="font-medium">{dashboardData?.peakConcurrentUsers}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">SSL Status</span>
                  {dashboardData?.sslStatus === 'OK' ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertTriangle className="w-4 h-4 text-destructive" />}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Firewall</span>
                  {dashboardData?.firewallStatus === 'OK' ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertTriangle className="w-4 h-4 text-destructive" />}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Threats Blocked</span>
                  <span className="font-medium">{dashboardData?.threatsBlockedCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        <Card className="glass-card border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Platform Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.alerts.length > 0 ? (
                dashboardData.alerts.map((alert, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${alert.type === 'warning' ? 'bg-warning/10 border border-warning/20' : 'bg-success/10 border border-success/20'}`}>
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.details}
                      </p>
                    </div>
                    {alert.type === 'warning' ? (
                      <Button size="sm" variant="outline">
                        Review Limits
                      </Button>
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No platform alerts.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
