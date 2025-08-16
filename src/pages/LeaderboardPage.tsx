import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>See top eco-miners and their achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Leaderboard page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;