import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Shield, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useToast } from '@/hooks/use-toast';

const CounsellingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    preferredTime: '',
    counsellor: '',
    reason: '',
    urgency: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const counsellors = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'Anxiety & Stress Management' },
    { id: 'dr-johnson', name: 'Dr. Michael Johnson', specialty: 'Depression & Mood Disorders' },
    { id: 'dr-williams', name: 'Dr. Lisa Williams', specialty: 'Academic Stress & Performance' },
    { id: 'dr-brown', name: 'Dr. David Brown', specialty: 'Relationship & Social Issues' }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Appointment Request Submitted",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Request Submitted Successfully
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Thank you for reaching out. Our counselling team will review your request and contact you within 24 hours to schedule your appointment.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-wellness" />
                <span>All appointments are confidential</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-wellness" />
                <span>Response within 24 hours</span>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full mt-6"
            >
              Return Home
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
              <span>Professional Counselling</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Book a Counselling Session</h1>
            <p className="text-muted-foreground">
              Schedule a confidential appointment with our licensed mental health professionals
            </p>
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
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@university.edu"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange('studentId', e.target.value)}
                        placeholder="Enter your student ID"
                        required
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-secondary" />
                      Appointment Preferences
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Preferred Time Slot</Label>
                        <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Counsellor Preference</Label>
                        <Select onValueChange={(value) => handleInputChange('counsellor', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a counsellor" />
                          </SelectTrigger>
                          <SelectContent>
                            {counsellors.map((counsellor) => (
                              <SelectItem key={counsellor.id} value={counsellor.id}>
                                {counsellor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Urgency Level</Label>
                      <Select onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How urgent is your need for support?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General support (within a week)</SelectItem>
                          <SelectItem value="medium">Medium - Moderate concern (within 3 days)</SelectItem>
                          <SelectItem value="high">High - Urgent support (within 24 hours)</SelectItem>
                          <SelectItem value="crisis">Crisis - Immediate help needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="reason">
                        What would you like to discuss? (Optional)
                      </Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="Briefly describe what you'd like support with..."
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        This helps us assign the most suitable counsellor for your needs.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Appointment Request
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Counsellors */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">Our Counsellors</h3>
                <div className="space-y-4">
                  {counsellors.map((counsellor) => (
                    <div key={counsellor.id} className="space-y-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {counsellor.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {counsellor.specialty}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Information */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">Important Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-wellness mt-0.5" />
                    <span className="text-muted-foreground">
                      All sessions are completely confidential and HIPAA compliant
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-muted-foreground">
                      Sessions are typically 50 minutes long
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-secondary mt-0.5" />
                    <span className="text-muted-foreground">
                      We'll confirm your appointment within 24 hours
                    </span>
                  </div>
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-destructive/10 border-destructive/20 p-6">
                <h3 className="font-semibold text-destructive mb-2">Crisis Support</h3>
                <p className="text-sm text-destructive mb-3">
                  If you're experiencing a mental health emergency:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-destructive">Call 988</div>
                  <div className="text-destructive/80">Suicide & Crisis Lifeline</div>
                  <div className="font-medium text-destructive">Call (555) 123-4567</div>
                  <div className="text-destructive/80">Campus Crisis Line</div>
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