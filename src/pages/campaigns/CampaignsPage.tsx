import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CampaignsPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Eco Campaigns</CardTitle>
            <CardDescription>Join environmental campaigns and make an impact</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Campaigns page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignsPage;