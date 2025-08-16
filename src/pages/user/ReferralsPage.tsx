import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ReferralsPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Referral Program</CardTitle>
            <CardDescription>Invite friends and earn bonus RFX tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Referrals page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralsPage;