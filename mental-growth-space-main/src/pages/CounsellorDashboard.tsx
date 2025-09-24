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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const CounsellorDashboard = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const [count, setCount] = useState({
    allApp: 0,
    todayApp: 0,
    completedApp: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const counsellorStats = [
    {
      title: t('Upcoming Appointments'),
      value: count.allApp,
      trend: 'up',
      icon: CheckCircle,
      color: 'primary',
      clickable: true,
      type: 'appointments',
    },
    {
      title: t('Upcoming Sessions Today'),
      value: count.todayApp,
      trend: 'up',
      icon: Calendar,
      color: 'secondary',
      clickable: true,
      type: 'todayAppointments',
    },
    {
      title: t('Appointments past current time'),
      value: count.completedApp,
      trend: 'up',
      icon: MessageSquare,
      color: 'wellness',
      clickable: true,
      type: 'pastAppointments',
    },
  ];

  // 📌 Upcoming Appointments
  const getAppointments = async () => {
    const token = await getToken();
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://sih-project-1-1.onrender.com/api/ticket/get_counsellor_tickets',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(data.tickets);
      setCount((prev) => ({ ...prev, allApp: data.totalCount }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Today’s Appointments
  const getTodayAppointments = async () => {
    const token = await getToken();
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://sih-project-1-1.onrender.com/api/ticket/get_counsellor_todaysTicket',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(data.tickets);
      console.log(data)
      setCount((prev) => ({ ...prev, todayApp: data.totalCount }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Past Appointments
  const getPastAppointments = async () => {
    const token = await getToken();
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://sih-project-1-9wgj.onrender.com/api/ticket/get_counsellor_pastTickets',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data)
      setAppointments(data.tickets);
      setCount((prev) => ({ ...prev, completedApp: data.totalCount }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load default (upcoming)
  useEffect(() => {
    getAppointments();
    getTodayAppointments();
    getPastAppointments();
  }, []);

  // Switch based on selected card
  useEffect(() => {
    if (selected === 'appointments') getAppointments();
    if (selected === 'todayAppointments') getTodayAppointments();
    if (selected === 'pastAppointments') getPastAppointments();
  }, [selected]);

  const handleBlockStudent = () => {
    alert('Student block request has been send');
    window.location.href = '/counsellor/block-student';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Dynamic header
  const getHeaderTitle = () => {
    if (selected === 'todayAppointments') return "Today's Appointments";
    if (selected === 'pastAppointments') return 'Completed Appointments';
    return 'Upcoming Appointments';
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
                {t(
                  'Track your sessions, student progress, and key wellbeing trends.'
                )}
              </p>

              {/* Block Student Button */}
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
            {counsellorStats.map((stat, idx) => (
              <Card
                key={idx}
                className={`p-6 cursor-pointer shadow-md rounded-2xl border border hover:shadow-lg transition ${
                  stat.clickable ? 'hover:border-primary' : ''
                }`}
                onClick={() => (stat.clickable ? setSelected(stat.type) : null)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </Card>
            ))}
          </div>

          {/* Appointments Table */}
          {(selected === 'appointments' ||
            selected === 'todayAppointments' ||
            selected === 'pastAppointments') && (
            <Card className="w-full p-6 mb-8 shadow-md rounded-2xl border border">
              <h2 className="text-xl font-semibold mb-4">
                {getHeaderTitle()}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th className="p-3">ID</th>
                      <th className="p-3">Created At</th>
                      <th className="p-3">Appointment Time</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
  {loading ? (
    [...Array(4)].map((_, i) => (
      <tr key={i} className="animate-pulse border-b">
        <td className="p-3">
          <div className="h-4 w-10 bg-muted/40 rounded" />
        </td>
        <td className="p-3">
          <div className="h-4 w-28 bg-muted/40 rounded" />
        </td>
        <td className="p-3">
          <div className="h-4 w-32 bg-muted/40 rounded" />
        </td>
        <td className="p-3">
          <div className="h-4 w-16 bg-muted/40 rounded" />
        </td>
        <td className="p-3">
          <div className="h-4 w-40 bg-muted/40 rounded" />
        </td>
        <td className="p-3">
          <div className="h-8 w-24 bg-muted/40 rounded" />
        </td>
      </tr>
    ))
  ) : appointments.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="p-6 text-center text-muted-foreground italic"
      >
        🚫 No appointments found
      </td>
    </tr>
  ) : (
    appointments.map((appt) => (
      <tr
        key={appt.id}
        className="border-b hover:bg-muted/30 transition"
      >
        <td className="p-3 font-medium">#{appt.id}</td>
        <td className="p-3">{formatDate(appt.createdAt)}</td>
        <td className="p-3">{formatDate(appt.timing)}</td>
        <td className="p-3">
          <Badge
            variant={
              appt.severity === 'HIGH'
                ? 'destructive'
                : appt.severity === 'MEDIUM'
                ? 'secondary'
                : 'outline'
            }
          >
            {appt.severity}
          </Badge>
        </td>
        <td className="p-3">{appt.description}</td>
        <td className="p-3">
          <Badge
            variant={
              appt.status === 'OPEN'
                ? 'destructive'
                : appt.status === 'IN_PROGRESS'
                ? 'secondary'
                : 'outline'
            }
          >
            Status : {appt.status}
          </Badge>
        </td>
      </tr>
    ))
  )}
</tbody>

                </table>
              </div>
            </Card>
          )}

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-md rounded-2xl border border">
              <h2 className="text-lg font-semibold mb-4">Wellness Overview</h2>
              <WellnessChart />
            </Card>
            <Card className="p-6 shadow-md rounded-2xl border border">
              <h2 className="text-lg font-semibold mb-4">Stress Levels</h2>
              <StressLevelsChart />
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CounsellorDashboard;
