import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { WellnessChart } from '@/components/Charts/WellnessChart';
import { StressLevelsChart } from '@/components/Charts/StressLevelsChart';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useUser, useAuth } from '@clerk/clerk-react';

interface Appointment {
  id: number;
  description: string;
  timing: string;
  level: string;
  severity: string;
  counsellor?: {
    firstName: string;
    lastName: string;
  };
}

const StudentDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.post(
          'https://sih-project-1-9wgj.onrender.com/api/ticket/get_upcoming_tickets',
          {
            clerkId: user?.id ?? '',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUpcomingAppointments(data || []);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
        setUpcomingAppointments([]);
      }
    };

    fetchAppointments();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, [getToken, user?.id]);

  // Stats tailored for a student view
  const studentStats = [
    {
      title: t('Sessions Attended'),
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Calendar,
      color: 'primary',
    },
    {
      title: t('Messages Exchanged'),
      value: '45',
      change: '+10',
      trend: 'up',
      icon: MessageSquare,
      color: 'secondary',
    },
    {
      title: t('Wellness Milestones'),
      value: '3',
      change: '+1',
      trend: 'up',
      icon: CheckCircle,
      color: 'wellness',
    },
  ];

  const personalConcerns = [
    { concern: t('Exam Anxiety'), percentage: 60, change: '+5%' },
    { concern: t('Sleep Issues'), percentage: 40, change: '-3%' },
    { concern: t('Academic Pressure'), percentage: 55, change: '+2%' },
  ];

  const handleReportCounsellor = () => {
    window.location.href = '/student/block-counselor';
  };

  // Sort upcoming appointments by nearest timing
  const sortedAppointments = [...upcomingAppointments].sort(
    (a, b) => new Date(a.timing).getTime() - new Date(b.timing).getTime()
  );

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
                <span>{t('Student Dashboard')}</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('My Wellness Overview')}
              </h1>
              <p className="text-muted-foreground mb-4">
                {t('View your wellness trends, sessions, and progress over time.')}
              </p>

              {/* Report Counsellor Button */}
              <Button
                variant="destructive"
                onClick={handleReportCounsellor}
                className="flex items-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{t('Report Counsellor')}</span>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {studentStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="card-gradient p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </span>
                        <Badge
                          variant={stat.trend === 'up' ? 'default' : 'secondary'}
                          className="text-xs bg-wellness/10 text-wellness"
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

          {/* Charts and Concerns */}
          <div className="space-y-8">
            {/* Engagement Chart */}
            <Card className="card-gradient p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('My Engagement')}
                </h3>
                <Badge variant="outline">{t('Last 6 Months')}</Badge>
              </div>
              <WellnessChart />
            </Card>

            {/* Wellness Trends */}
            <Card className="card-gradient p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('Personal Wellness Trend')}
                </h3>
                <Badge variant="outline">{t('Last 6 Weeks')}</Badge>
              </div>
              <StressLevelsChart />
            </Card>

            {/* Personal Concerns */}
            <Card className="card-gradient p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t('My Top Concerns')}
              </h3>
              <div className="space-y-4">
                {personalConcerns.map((concern) => (
                  <div key={concern.concern} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {concern.concern}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {concern.percentage}%
                        </span>
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

            {/* Upcoming Appointments Section */}
            <Card className="card-gradient p-6 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t('Upcoming Appointments')}
              </h3>

              {sortedAppointments.length === 0 ? (
                <p className="text-muted-foreground">
                  {t('No upcoming appointments.')}
                </p>
              ) : (
                <div className="space-y-4">
                  {sortedAppointments.slice(0, 6).map((appt) => (
                    <div
                      key={appt.id}
                      className="flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      {/* Left side: Counsellor + Description */}
                      <div className="space-y-1">
                        <span className="font-medium text-foreground">
                          {appt.counsellor
                            ? `${appt.counsellor.firstName} ${appt.counsellor.lastName}`
                            : t('Unassigned Counsellor')}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {appt.description}
                        </p>

                        {/* Date & Time */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(appt.timing).toLocaleDateString(undefined, {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(appt.timing).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false, // ✅ 24-hour format
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Right side: Level + Severity */}
                      <div className="flex space-x-2 mt-3 md:mt-0">
                        <Badge variant="outline" className="text-xs">
                          {"Status"+" = "+appt.level}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            appt.severity === 'Emergency'
                              ? 'text-destructive'
                              : 'text-primary'
                          }`}
                        >
                          {"Severity"+ " = "+appt.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
