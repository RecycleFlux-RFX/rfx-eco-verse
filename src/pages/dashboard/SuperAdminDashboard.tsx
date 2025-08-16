import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

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
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard 👑</h1>
          <Badge className="bg-gradient-primary">Platform-wide Control</Badge>
          <p className="text-muted-foreground mt-4">
            This is a placeholder for the Super Admin dashboard. Full implementation coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;