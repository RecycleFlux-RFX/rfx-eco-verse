import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
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

const SuperAdminDashboard = () => {
  const { user } = useAuth();

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
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +18.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RFX Tokens Distributed</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
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
              <div className="text-2xl font-bold">$45.2K</div>
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
              <div className="text-2xl font-bold text-success">99.9%</div>
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
                  <Badge variant="outline">5 RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Campaign Reward Limit</p>
                    <p className="text-xs text-muted-foreground">Max RFX per campaign</p>
                  </div>
                  <Badge variant="outline">500 RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Referral Bonus</p>
                    <p className="text-xs text-muted-foreground">RFX for successful referral</p>
                  </div>
                  <Badge variant="outline">25 RFX</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Platform accessibility</p>
                  </div>
                  <Badge className="bg-success/20 text-success">Active</Badge>
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
                {[
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
                  <span className="font-medium">847K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-medium">2.3 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Query Performance</span>
                  <Badge className="bg-success/20 text-success">Optimal</Badge>
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
                  <span className="font-medium">3,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Countries</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peak Concurrent</span>
                  <span className="font-medium">8,921</span>
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
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Firewall</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Threats Blocked</span>
                  <span className="font-medium">247</span>
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
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div>
                  <p className="text-sm font-medium">High Token Distribution Rate</p>
                  <p className="text-xs text-muted-foreground">
                    Daily RFX distribution exceeding 95% of daily limit
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Review Limits
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                <div>
                  <p className="text-sm font-medium">System Backup Completed</p>
                  <p className="text-xs text-muted-foreground">
                    Automated daily backup successful at 3:00 AM UTC
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;