import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import {
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface AdminDashboardData {
  totalUsers: number;
  newUsersLastMonthPercentage: number;
  activeCampaignsCount: number;
  pendingCampaignApprovalsCount: number;
  pendingReviewsCount: number;
  completedSubmissionsTodayCount: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
        setIsLoading(false);
        setError('You don\'t have permission to access this page.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<AdminDashboardData>(`${API_BASE_URL}/admin/dashboard-summary`);
        setDashboardData(response.data);
      } catch (err: any) {
        console.error('Failed to fetch admin dashboard data:', err.response?.data?.message || err.message);
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
          <CardTitle className="text-2xl mb-4">Loading Admin Dashboard...</CardTitle>
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

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <CardTitle className="text-2xl mb-4">Access Denied</CardTitle>
          <CardDescription>You don\'t have permission to access this page.</CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin Dashboard 🛠️
          </h1>
          <p className="text-muted-foreground">
            Manage users, campaigns, and platform analytics.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +{dashboardData?.newUsersLastMonthPercentage}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Target className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.activeCampaignsCount}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData?.pendingCampaignApprovalsCount} pending approval
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <AlertCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.pendingReviewsCount}</div>
              <p className="text-xs text-muted-foreground">
                User submissions
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.completedSubmissionsTodayCount}</div>
              <p className="text-xs text-muted-foreground">
                Campaign submissions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Management */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </span>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-1" />
                  Add User
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[ // This data should be fetched from /api/admin/users
                  { name: 'Alice Cooper', email: 'alice@example.com', status: 'Active', role: 'User' },
                  { name: 'Bob Smith', email: 'bob@example.com', status: 'Suspended', role: 'User' },
                  { name: 'Carol Johnson', email: 'carol@example.com', status: 'Active', role: 'Admin' },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {user.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Users
              </Button>
            </CardContent>
          </Card>

          {/* Campaign Management */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Campaign Management
                </span>
                <Button size="sm" className="bg-gradient-secondary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-1" />
                  New Campaign
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[ // This data should be fetched from /api/admin/campaigns
                  { name: 'Beach Cleanup Drive', status: 'Active', participants: 156 },
                  { name: 'Tree Planting Initiative', status: 'Pending', participants: 89 },
                  { name: 'Recycling Challenge', status: 'Completed', participants: 234 },
                ].map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <p className="text-sm font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">{campaign.participants} participants</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          campaign.status === 'Active' ? 'default' :
                          campaign.status === 'Pending' ? 'secondary' : 
                          'outline'
                        }
                        className="text-xs"
                      >
                        {campaign.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Campaigns
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Pending Approvals
            </CardTitle>
            <CardDescription>User submissions requiring review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[ // This data should be fetched from /api/admin/submissions/pending
                { 
                  user: 'Sarah Wilson', 
                  campaign: 'Beach Cleanup Drive', 
                  type: 'Photo Submission',
                  time: '2 hours ago',
                  status: 'pending'
                },
                { 
                  user: 'Mike Johnson', 
                  campaign: 'Recycling Challenge', 
                  type: 'Video Submission',
                  time: '4 hours ago',
                  status: 'pending'
                },
                { 
                  user: 'Emma Davis', 
                  campaign: 'Tree Planting Initiative', 
                  type: 'Photo Submission',
                  time: '6 hours ago',
                  status: 'pending'
                },
              ].map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">{submission.user} - {submission.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {submission.campaign} • {submission.time}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-gradient-accent hover:opacity-90">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
