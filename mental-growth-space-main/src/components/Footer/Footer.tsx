import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">University Wellness Center</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Supporting student mental health and well-being through innovative digital interventions and personalized care.
            </p>
            <div className="flex items-center space-x-2 text-wellness">
              <Heart className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">Your wellness matters</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Crisis Support', href: '/crisis' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Accessibility', href: '/accessibility' }
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">24/7 Crisis: (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">support@university.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Student Center, Room 201</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Emergency Resources</h4>
            <div className="space-y-2">
              <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm font-medium text-destructive">Crisis Hotline</p>
                <p className="text-sm text-destructive">988 - Suicide & Crisis Lifeline</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm font-medium text-secondary">Campus Safety</p>
                <p className="text-sm text-secondary">(555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 University Wellness Center. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Confidential & HIPAA Compliant</span>
            <span>•</span>
            <span>Available 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;