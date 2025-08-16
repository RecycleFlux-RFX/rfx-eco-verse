import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NFTPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>RFXVerse NFTs</CardTitle>
            <CardDescription>Collect and trade environmental NFTs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>NFT marketplace coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NFTPage;