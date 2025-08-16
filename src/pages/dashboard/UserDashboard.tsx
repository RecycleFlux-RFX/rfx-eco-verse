import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  Leaf, 
  Trophy, 
  Target, 
  Users, 
  Gift,
  TrendingUp,
  Calendar,
  Gamepad2,
  Award,
  ArrowUpRight
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const xpToNextLevel = 1000;
  const currentXP = user.xp % 1000;
  const xpProgress = (currentXP / xpToNextLevel) * 100;

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text-primary">{user.username}</span>! 👋
          </h1>
          <p className="text-muted-foreground">
            Your eco-mining dashboard. Track your progress and impact.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RFX Balance</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.rfxBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12.5% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Leaf className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.co2Saved} kg</div>
              <p className="text-xs text-muted-foreground">
                Environmental impact
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <Trophy className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level {user.level}</div>
              <div className="mt-2">
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {currentXP}/{xpToNextLevel} XP to next level
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.achievements.length}</div>
              <p className="text-xs text-muted-foreground">
                Eco-milestones reached
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Active Campaigns
              </CardTitle>
              <CardDescription>Join environmental campaigns and earn RFX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Beach Cleanup Drive</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tree Planting Initiative</span>
                  <Badge className="bg-accent/20 text-accent">Joined</Badge>
                </div>
              </div>
              <Link to="/campaigns">
                <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                  View All Campaigns
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2 text-secondary" />
                Eco Games
              </CardTitle>
              <CardDescription>Play games to learn and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recycle Rush</span>
                  <Badge className="bg-secondary/20 text-secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trash Sort Challenge</span>
                  <Badge variant="outline">Popular</Badge>
                </div>
              </div>
              <Link to="/games">
                <Button className="w-full mt-4 bg-gradient-secondary hover:opacity-90">
                  Play Games
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-accent" />
                Referral Program
              </CardTitle>
              <CardDescription>Invite friends and earn bonus RFX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">+25 RFX</div>
                <p className="text-sm text-muted-foreground">per successful referral</p>
              </div>
              <Link to="/referrals">
                <Button className="w-full mt-4 bg-gradient-accent hover:opacity-90">
                  Start Referring
                  <Gift className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Completed Beach Cleanup Campaign', reward: '+15 RFX', time: '2 hours ago', type: 'campaign' },
                { action: 'Won Recycle Rush Game', reward: '+5 XP', time: '1 day ago', type: 'game' },
                { action: 'Referred new user @ecowarrior23', reward: '+25 RFX', time: '2 days ago', type: 'referral' },
                { action: 'Level up to Level 5', reward: '+50 XP', time: '3 days ago', type: 'achievement' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    className={
                      activity.type === 'campaign' ? 'bg-primary/20 text-primary' :
                      activity.type === 'game' ? 'bg-secondary/20 text-secondary' :
                      activity.type === 'referral' ? 'bg-accent/20 text-accent' :
                      'bg-warning/20 text-warning'
                    }
                  >
                    {activity.reward}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;