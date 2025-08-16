import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CampaignDetailPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>View campaign information and participate</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Campaign detail page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailPage;