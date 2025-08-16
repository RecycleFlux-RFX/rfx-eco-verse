import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WalletPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
            <CardDescription>Manage your RFX tokens and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Wallet page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;