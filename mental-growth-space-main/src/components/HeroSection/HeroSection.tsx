import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Users, 
  Trophy,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  Star,
  Phone,
  CheckCircle,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    satisfaction: 0,
    sessions: 0
  });

  useEffect(() => {
    setIsVisible(true);
    // Animate stats
    const timer = setTimeout(() => {
      setAnimatedStats({
        students: 2500,
        satisfaction: 95,
        sessions: 15000
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "24/7 support with our intelligent wellness assistant powered by advanced AI",
      href: "/chatbot",
      color: "primary",
      benefits: ["Instant responses", "Personalized guidance", "Available anytime"]
    },
    {
      icon: Calendar,
      title: "Counselling",
      description: "Book confidential sessions with licensed mental health professionals",
      href: "/counselling",
      color: "secondary",
      benefits: ["Licensed therapists", "Flexible scheduling", "Complete privacy"]
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Comprehensive library of articles, videos, and relaxation tools",
      href: "/resources",
      color: "accent",
      benefits: ["Evidence-based content", "Interactive tools", "Self-paced learning"]
    },
    {
      icon: Users,
      title: "Peer Support",
      description: "Connect with fellow students in our moderated safe community",
      href: "/forum",
      color: "wellness",
      benefits: ["Peer connections", "Moderated discussions", "Safe environment"]
    },
    {
      icon: Trophy,
      title: "Success Stories",
      description: "Be inspired by others' wellness journeys and transformations",
      href: "/success-stories",
      color: "primary",
      benefits: ["Real experiences", "Inspiring journeys", "Hope and motivation"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      year: "Junior, Psychology",
      quote: "This platform helped me navigate my anxiety during finals week. The AI chatbot was like having a friend available 24/7.",
      rating: 5,
      image: "👩‍🎓"
    },
    {
      name: "Alex K.",
      year: "Senior, Engineering",
      quote: "The counselling sessions were game-changing. I learned coping strategies that I still use today.",
      rating: 5,
      image: "👨‍🎓"
    },
    {
      name: "Maya P.",
      year: "Sophomore, Art",
      quote: "Finding peers who understood my struggles made all the difference. I'm not alone anymore.",
      rating: 5,
      image: "👩‍🎨"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your secure, anonymous profile",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "Explore",
      description: "Browse resources, chat with AI, or book counselling",
      icon: Lightbulb
    },
    {
      step: 3,
      title: "Connect",
      description: "Join peer discussions and share experiences",
      icon: Users
    },
    {
      step: 4,
      title: "Grow",
      description: "Track progress and celebrate your wellness journey",
      icon: Target
    }
  ];

  const whyChooseUs = [
    {
      title: "100% Confidential",
      description: "Your privacy is our top priority with end-to-end encryption",
      icon: Shield
    },
    {
      title: "Available 24/7",
      description: "Support when you need it most, day or night",
      icon: Clock
    },
    {
      title: "Evidence-Based",
      description: "All resources backed by psychological research and best practices",
      icon: Star
    },
    {
      title: "Student-Focused",
      description: "Designed specifically for college student challenges and lifestyle",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Emergency Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full bg-destructive hover:bg-destructive/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 pulse-wellness"
          onClick={() => window.open('tel:988', '_blank')}
        >
          <Phone className="w-5 h-5 mr-2" />
          Crisis Support
        </Button>
      </div>

      {/* Hero Section */}
      <div className="neural-bg relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-wellness/10 text-wellness px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4 animate-pulse" />
                <span>Your Mental Health Matters</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
                Digital Wellness
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Support System
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Empowering college students with personalized mental health resources, 
                AI-powered support, and a caring community dedicated to your well-being and success.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/chatbot">
                  <Button size="lg" className="group min-w-[200px] bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                    Start Wellness Chat
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/counselling">
                  <Button variant="outline" size="lg" className="min-w-[200px] hover:scale-105 hover:bg-primary/10 transition-all duration-300">
                    Book Counseling
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${animatedStats.students}+`, label: "Students Helped", icon: Users },
              { number: `${animatedStats.satisfaction}%`, label: "Satisfaction Rate", icon: Star },
              { number: `${animatedStats.sessions}+`, label: "Support Sessions", icon: MessageSquare },
              { number: "24/7", label: "Available Support", icon: Clock }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-4 group cursor-pointer">
                  <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Cards with Enhanced Hover Effects */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Support <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to support your mental wellness journey in one place
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} to={feature.href}>
                  <Card className="relative p-8 text-left group cursor-pointer border-0 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-${feature.color}/10 group-hover:bg-${feature.color}/20 group-hover:scale-110 transition-all duration-300`}>
                          <Icon className={`w-8 h-8 text-${feature.color} group-hover:rotate-12 transition-transform duration-300`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      {/* Benefits list - appears on hover */}
                      <div className="space-y-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-wellness" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300 mt-4" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It <span className="text-secondary">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with your wellness journey is simple and secure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="bg-primary/10 w-20 h-20 rounded-full mx-auto flex items-center justify-center group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-300">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-secondary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Student <span className="text-wellness">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from students who found support and healing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center group cursor-pointer border-0 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-xl">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {testimonial.image}
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.year}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-accent">MindCare</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed with your privacy, accessibility, and success in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center space-y-4 group hover:scale-105 transition-all duration-300">
                  <div className="bg-accent/10 w-16 h-16 rounded-full mx-auto flex items-center justify-center group-hover:bg-accent/20 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found support, healing, and growth through our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/chatbot">
              <Button size="lg" className="group min-w-[250px] bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" size="lg" className="min-w-[250px] hover:scale-105 hover:bg-primary/10 transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;