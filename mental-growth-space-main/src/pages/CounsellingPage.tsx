import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar, Clock, User, Shield, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useToast } from '@/hooks/use-toast';
import { socketconnection } from '@/lib/socketconnection';


const CounsellingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [briefmsg, setbriefmsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connection event listeners
    const handleConnect = () => {
      console.log("CounsellingPage: Connected to server");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("CounsellingPage: Disconnected from server");
      setIsConnected(false);
    };

    const handleConnectError = (error: any) => {
      console.error("CounsellingPage: Connection error:", error);
      setIsConnected(false);
    };

    const handleBrief = (msg: string) => {
      console.log("Received counselling summary:", msg);
      setbriefmsg(msg);
    };

    // Add event listeners
    socketconnection.on("connect", handleConnect);
    socketconnection.on("disconnect", handleDisconnect);
    socketconnection.on("connect_error", handleConnectError);
    socketconnection.on("book_counselling", handleBrief);

    // Check if already connected
    if (socketconnection.connected) {
      setIsConnected(true);
    }

    return () => {
      // Remove event listeners but don't disconnect the global connection
      socketconnection.off("connect", handleConnect);
      socketconnection.off("disconnect", handleDisconnect);
      socketconnection.off("connect_error", handleConnectError);
      socketconnection.off("book_counselling", handleBrief);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    preferredTime: '',
    counsellor: '',
    reason: briefmsg,
    urgency: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const counsellors = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: t('Anxiety & Stress Management') },
    { id: 'dr-johnson', name: 'Dr. Michael Johnson', specialty: t('Depression & Mood Disorders') },
    { id: 'dr-williams', name: 'Dr. Lisa Williams', specialty: t('Academic Stress & Performance') },
    { id: 'dr-brown', name: 'Dr. David Brown', specialty: t('Relationship & Social Issues') }
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: t('Appointment Request Submitted'),
      description: t("We'll contact you within 24 hours to confirm your appointment.")
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="card-gradient max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-wellness/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-wellness" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('Request Submitted Successfully')}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("Thank you for reaching out. Our counselling team will review your request and contact you within 24 hours to schedule your appointment.")}
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-wellness" />
                <span>{t('All appointments are confidential')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-wellness" />
                <span>{t('Response within 24 hours')}</span>
              </div>
            </div>
            <Button onClick={() => window.location.href = '/'} className="w-full mt-6">
              {t('Return Home')}
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              <span>{t('Professional Counselling')}</span>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('Book a Counselling Session')}</h1>
            <p className="text-muted-foreground">{t('Schedule a confidential appointment with our licensed mental health professionals')}</p>
            {!isConnected && (
              <p className="text-yellow-600 text-sm mt-2">
                Connecting to server... Please wait
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="card-gradient p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      {t('Personal Information')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('Full Name')}</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder={t('Enter your full name')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('Email Address')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder={t('your.email@university.edu')}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentId">{t('Student ID')}</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange('studentId', e.target.value)}
                        placeholder={t('Enter your student ID')}
                        required
                      />
                    </div>
                  </div>

                  {/* Appointment Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-secondary" />
                      {t('Appointment Preferences')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('Preferred Time Slot')}</Label>
                        <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select a time slot')} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(slot => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{t('Counsellor Preference')}</Label>
                        <Select onValueChange={(value) => handleInputChange('counsellor', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select a counsellor')} />
                          </SelectTrigger>
                          <SelectContent>
                            {counsellors.map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t('Urgency Level')}</Label>
                      <Select onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('How urgent is your need for support?')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t('Low - General support (within a week)')}</SelectItem>
                          <SelectItem value="medium">{t('Medium - Moderate concern (within 3 days)')}</SelectItem>
                          <SelectItem value="high">{t('High - Urgent support (within 24 hours)')}</SelectItem>
                          <SelectItem value="crisis">{t('Crisis - Immediate help needed')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">{t('Additional Information')}</h3>
                    {briefmsg && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium mb-1">AI Chat Summary:</p>
                        <p className="text-sm text-blue-700">{briefmsg}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="reason">{t("What would you like to discuss? (Optional)")}</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder={t("Briefly describe what you'd like support with...")}
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">{t("This helps us assign the most suitable counsellor for your needs.")}</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">{t('Submit Appointment Request')}</Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Counsellors */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">{t('Our Counsellors')}</h3>
                <div className="space-y-4">
                  {counsellors.map(c => (
                    <div key={c.id} className="space-y-1">
                      <h4 className="font-medium text-sm text-foreground">{c.name}</h4>
                      <p className="text-xs text-muted-foreground">{c.specialty}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Important Info */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">{t('Important Information')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-wellness mt-0.5" />
                    <span className="text-muted-foreground">{t('All sessions are completely confidential and HIPAA compliant')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{t('Sessions are typically 50 minutes long')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-secondary mt-0.5" />
                    <span className="text-muted-foreground">{t("We'll confirm your appointment within 24 hours")}</span>
                  </div>
                </div>
              </Card>

              {/* Crisis */}
              <Card className="bg-destructive/10 border-destructive/20 p-6">
                <h3 className="font-semibold text-destructive mb-2">{t('Crisis Support')}</h3>
                <p className="text-sm text-destructive mb-3">{t("If you're experiencing a mental health emergency:")}</p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-destructive">{t('Call 988')}</div>
                  <div className="text-destructive/80">{t('Suicide & Crisis Lifeline')}</div>
                  <div className="font-medium text-destructive">{t('Call (555) 123-4567')}</div>
                  <div className="text-destructive/80">{t('Campus Crisis Line')}</div>
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

export default CounsellingPage;
