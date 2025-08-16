import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationsPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated with platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Notifications page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;