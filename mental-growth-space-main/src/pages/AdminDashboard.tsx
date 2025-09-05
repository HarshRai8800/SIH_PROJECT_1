import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';
import { WellnessChart } from '@/components/Charts/WellnessChart';
import { StressLevelsChart } from '@/components/Charts/StressLevelsChart';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const AdminDashboard = () => {
  const dashboardStats = [
    {
      title: 'Active Students',
      value: '2,547',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Sessions This Month',
      value: '1,892',
      change: '+8%',
      trend: 'up',
      icon: MessageSquare,
      color: 'secondary'
    },
    {
      title: 'Counselling Bookings',
      value: '234',
      change: '+15%',
      trend: 'up',
      icon: Calendar,
      color: 'wellness'
    },
    {
      title: 'High-Risk Alerts',
      value: '12',
      change: '-20%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'destructive'
    }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'high-risk',
      message: 'Student showing signs of severe stress in chatbot interactions',
      student: 'Anonymous ID: STU***789',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'crisis',
      message: 'Crisis keywords detected in forum post',
      student: 'Anonymous ID: STU***456',
      timestamp: '4 hours ago',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'wellbeing',
      message: 'Student completed wellness milestone - 30 day streak',
      student: 'Anonymous ID: STU***123',
      timestamp: '6 hours ago',
      status: 'completed'
    }
  ];

  const topConcerns = [
    { concern: 'Exam Anxiety', percentage: 68, change: '+5%' },
    { concern: 'Sleep Issues', percentage: 45, change: '+12%' },
    { concern: 'Social Anxiety', percentage: 38, change: '-3%' },
    { concern: 'Academic Pressure', percentage: 52, change: '+8%' },
    { concern: 'Homesickness', percentage: 29, change: '+15%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'resolved': return 'wellness';
      case 'completed': return 'primary';
      default: return 'muted';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high-risk': return AlertTriangle;
      case 'crisis': return AlertTriangle;
      case 'wellbeing': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BarChart3 className="w-4 h-4" />
                <span>Administrative Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Wellness Analytics</h1>
              <p className="text-muted-foreground">
                Monitor student wellbeing trends and system usage (All data anonymized)
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm">
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="card-gradient p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                        <Badge 
                          variant={stat.trend === 'up' ? 'default' : 'secondary'}
                          className={
                            stat.trend === 'up' 
                              ? 'text-xs bg-wellness/10 text-wellness' 
                              : stat.color === 'destructive' 
                                ? 'text-xs bg-wellness/10 text-wellness'
                                : 'text-xs bg-muted'
                          }
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                      <Icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Engagement Chart */}
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Student Engagement</h3>
                  <Badge variant="outline">Last 6 Months</Badge>
                </div>
                <WellnessChart />
              </Card>

              {/* Wellness Trends */}
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Wellness Trend Analysis</h3>
                  <Badge variant="outline">Last 6 Weeks</Badge>
                </div>
                <StressLevelsChart />
              </Card>

              {/* Top Concerns */}
              <Card className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Most Common Concerns</h3>
                <div className="space-y-4">
                  {topConcerns.map((concern) => (
                    <div key={concern.concern} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{concern.concern}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{concern.percentage}%</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              concern.change.startsWith('+') 
                                ? 'text-destructive' 
                                : 'text-wellness'
                            }`}
                          >
                            {concern.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${concern.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Alerts */}
              <Card className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                  Recent Alerts
                </h3>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className="p-4 rounded-lg border border-border/50 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            <Icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                            <div className="space-y-1 flex-1">
                              <p className="text-sm font-medium text-foreground leading-tight">
                                {alert.message}
                              </p>
                              <p className="text-xs text-muted-foreground">{alert.student}</p>
                            </div>
                          </div>
                          <Badge className={`text-xs bg-${getStatusColor(alert.status)}/10 text-${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Alerts
                </Button>
              </Card>

              {/* System Health */}
              <Card className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Chatbot Uptime</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-wellness rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">99.9%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-wellness rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">&lt; 2s</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Database Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-wellness rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">Healthy</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">API Calls Today</span>
                    <span className="text-sm font-medium text-foreground">47,392</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Monitor Chatbot
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Counselling Queue
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics Report
                  </Button>
                </div>
              </Card>

              {/* Privacy Notice */}
              <Card className="bg-muted/50 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-2">Privacy & Compliance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All student data is anonymized and HIPAA compliant. Individual identification is not possible through this dashboard.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;