import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GamesPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Eco Games</CardTitle>
            <CardDescription>Play games to learn and earn RFX tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Games page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamesPage;