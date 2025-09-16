import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Calendar,
  MessageSquare,
  CheckCircle,
  UserX,
} from 'lucide-react';
import { WellnessChart } from '@/components/Charts/WellnessChart';
import { StressLevelsChart } from '@/components/Charts/StressLevelsChart';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useTranslation } from 'react-i18next';

const CounsellorDashboard = () => {
  const { t } = useTranslation();

  const counsellorStats = [
    {
      title: t('My Active Students'),
      value: '42',
      change: '+10%',
      trend: 'up',
      icon: CheckCircle,
      color: 'primary',
    },
    {
      title: t('Sessions This Month'),
      value: '58',
      change: '+6%',
      trend: 'up',
      icon: Calendar,
      color: 'secondary',
    },
    {
      title: t('Messages/Follow-ups'),
      value: '134',
      change: '+15%',
      trend: 'up',
      icon: MessageSquare,
      color: 'wellness',
    },
  ];

  const topConcerns = [
    { concern: t('Exam Anxiety'), percentage: 70, change: '+4%' },
    { concern: t('Sleep Issues'), percentage: 50, change: '+8%' },
    { concern: t('Academic Pressure'), percentage: 40, change: '-2%' },
  ];

  const handleBlockStudent = () => {
    // Replace this alert with real block logic or API call
    alert('Student has been blocked.');
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
                <span>{t('Counsellor Dashboard')}</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('My Counselling Analytics')}
              </h1>
              <p className="text-muted-foreground mb-4">
                {t('Track your sessions, student progress, and key wellbeing trends.')}
              </p>

              {/* 🔴 Block Student Button */}
              <Button
                variant="destructive"
                onClick={handleBlockStudent}
                className="flex items-center space-x-2"
              >
                <UserX className="w-4 h-4" />
                <span>{t('Block Student')}</span>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {counsellorStats.map((stat) => {
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
                  {t('Student Engagement')}
                </h3>
                <Badge variant="outline">{t('Last 6 Months')}</Badge>
              </div>
              <WellnessChart />
            </Card>

            {/* Wellness Trends */}
            <Card className="card-gradient p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('Wellness Trend Analysis')}
                </h3>
                <Badge variant="outline">{t('Last 6 Weeks')}</Badge>
              </div>
              <StressLevelsChart />
            </Card>

            {/* Top Concerns */}
            <Card className="card-gradient p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t('Most Common Concerns')}
              </h3>
              <div className="space-y-4">
                {topConcerns.map((concern) => (
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CounsellorDashboard;
