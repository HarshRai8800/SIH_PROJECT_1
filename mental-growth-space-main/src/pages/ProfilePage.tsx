import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Calendar,
  Trophy,
  Target,
  Heart,
  Brain,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  Settings
} from 'lucide-react';
import { ProgressRing } from '@/components/Profile/ProgressRing';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';   // ✅ added

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();                // ✅ added

  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    studentId: 'STU2024789',
    joinDate: 'September 2024',
    wellnessScore: 70,
    currentStreak: 12,
    totalSessions: 24,
    goalsCompleted: 8
  };

  const recentActivities = [
    {
      id: '1',
      type: 'session',
      title: t('Completed Stress Management Session'),
      description: t('Anxiety & Breathing Techniques'),
      date: t('2 hours ago'),
      icon: Brain,
      color: 'primary'
    },
    {
      id: '2',
      type: 'resource',
      title: t('Read Article: "Sleep Hygiene Tips"'),
      description: t('Sleep Health Resource'),
      date: t('1 day ago'),
      icon: CheckCircle,
      color: 'wellness'
    },
    {
      id: '3',
      type: 'goal',
      title: t('Achieved Daily Mindfulness Goal'),
      description: t('7-day mindfulness streak'),
      date: t('2 days ago'),
      icon: Target,
      color: 'secondary'
    },
    {
      id: '4',
      type: 'forum',
      title: t('Posted in Support Forum'),
      description: t('Shared experience with exam anxiety'),
      date: t('3 days ago'),
      icon: Heart,
      color: 'accent'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: t('First Week Complete'),
      description: t('Completed your first week of wellness tracking'),
      date: t('Earned 1 week ago'),
      icon: '🌟',
      color: 'wellness'
    },
    {
      id: '2',
      title: t('Resource Explorer'),
      description: t('Read 10 wellness articles'),
      date: t('Earned 3 days ago'),
      icon: '📚',
      color: 'primary'
    },
    {
      id: '3',
      title: t('Community Helper'),
      description: t('Received 5 helpful votes in forum'),
      date: t('Earned 1 week ago'),
      icon: '🤝',
      color: 'secondary'
    }
  ];

  const wellnessGoals = [
    {
      id: '1',
      title: t('Daily Mindfulness'),
      description: t('Practice 10 minutes of mindfulness daily'),
      progress: 85,
      target: t('Daily'),
      streak: 6
    },
    {
      id: '2',
      title: t('Sleep Schedule'),
      description: t('Maintain consistent 8-hour sleep schedule'),
      progress: 60,
      target: t('Daily'),
      streak: 3
    },
    {
      id: '3',
      title: t('Stress Check-ins'),
      description: t('Complete weekly stress level assessments'),
      progress: 75,
      target: t('Weekly'),
      streak: 2
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <User className="w-4 h-4" />
              <span>{t('Personal Dashboard')}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('Your Wellness Journey')}
            </h1>
            <p className="text-muted-foreground">
              {t('Track your progress and celebrate your mental health achievements')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="card-gradient p-6 text-center">
                <div className="relative mb-6">
                  <ProgressRing progress={userData.wellnessScore} size={120} strokeWidth={8} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <User className="w-8 h-8 text-primary mb-1" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {t('Wellness')}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-2">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{userData.email}</p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {userData.wellnessScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">{t('Wellness Score')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-wellness">{userData.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">{t('Day Streak')}</div>
                  </div>
                </div>

                {/* ✅ Navigate to edit profile page */}
                <Button
                  className="w-full mt-6"
                  variant="outline"
                  onClick={() => navigate('/edit-profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('Edit Profile')}
                </Button>
              </Card>

              {/* Quick Stats */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  {t('Quick Stats')}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('Total Sessions')}</span>
                    <span className="font-semibold text-foreground">{userData.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('Goals Completed')}</span>
                    <span className="font-semibold text-wellness">{userData.goalsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('Member Since')}</span>
                    <span className="font-semibold text-foreground">{userData.joinDate}</span>
                  </div>
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-wellness" />
                  {t('Recent Achievements')}
                </h3>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium text-sm text-foreground">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wellness Goals */}
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    {t('Wellness Goals')}
                  </h3>
                  <Button size="sm" variant="outline">
                    {t('Add Goal')}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {wellnessGoals.map((goal) => (
                    <Card key={goal.id} className="p-4 border-border/50">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <h4 className="font-medium text-foreground">{goal.title}</h4>
                            <p className="text-xs text-muted-foreground">{goal.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {goal.target}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{t('Progress')}</span>
                            <span className="font-medium text-foreground">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-wellness h-2 rounded-full transition-all duration-500"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-3 h-3 text-wellness" />
                            <span className="text-xs text-muted-foreground">
                              {goal.streak} {t('day streak')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-secondary" />
                  {t('Recent Activity')}
                </h3>

                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 rounded-lg border border-border/50"
                      >
                        <div className={`p-2 rounded-lg bg-${activity.color}/10`}>
                          <Icon className={`w-5 h-5 text-${activity.color}`} />
                        </div>
                        <div className="space-y-1 flex-1">
                          <h4 className="font-medium text-foreground">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  {t('View All Activity')}
                </Button>
              </Card>

              {/* Weekly Summary */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-accent" />
                  {t("This Week's Summary")}
                </h3>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary mb-1">5</div>
                    <div className="text-xs text-muted-foreground">{t('Sessions')}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/5">
                    <div className="text-2xl font-bold text-secondary mb-1">3</div>
                    <div className="text-xs text-muted-foreground">{t('Resources')}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-wellness/5">
                    <div className="text-2xl font-bold text-wellness mb-1">2</div>
                    <div className="text-xs text-muted-foreground">{t('Goals Met')}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/5">
                    <div className="text-2xl font-bold text-accent mb-1">7.2</div>
                    <div className="text-xs text-muted-foreground">{t('Avg Mood')}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
