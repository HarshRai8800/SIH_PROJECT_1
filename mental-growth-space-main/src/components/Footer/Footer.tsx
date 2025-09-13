import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-pink-100 border-t border-pink-200 mt-auto py-4">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left text-sm">
          
          {/* Brand / Motto */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-pink-700 text-base">MindSpark</h3>
            <p className="text-pink-600">Caring for your mind, one spark ✨</p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-pink-500">
              <Heart className="w-4 h-4" />
              <span>Your wellness matters</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-medium text-pink-700">Contact Us</h4>
            <div className="flex items-center justify-center md:justify-start space-x-2 hover:text-pink-700 transition-colors">
              <Phone className="w-4 h-4 text-pink-500" />
              <span>24/7 Crisis: 988</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 hover:text-pink-700 transition-colors">
              <Mail className="w-4 h-4 text-pink-500" />
              <span>support@mindspark.org</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 hover:text-pink-700 transition-colors">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>MindSpark HQ</span>
            </div>
          </motion.div>

          {/* Emergency Resources */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h4 className="font-medium text-pink-700">Emergency</h4>
            <div className="p-2 bg-pink-50 hover:bg-pink-100 rounded-md border border-pink-200 transition-colors cursor-pointer">
              <p className="font-medium text-pink-700">Crisis Hotline</p>
              <p className="text-pink-600">988 - Suicide & Crisis Lifeline</p>
            </div>
            <div className="p-2 bg-pink-50 hover:bg-pink-100 rounded-md border border-pink-200 transition-colors cursor-pointer">
              <p className="font-medium text-pink-700">Campus Safety</p>
              <p className="text-pink-600">(555) 987-6543</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-xs text-pink-600">
          <p>© 2024 MindSpark. All rights reserved.</p>
          <motion.div
            className="flex items-center space-x-3 mt-2 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="hover:text-pink-700 transition-colors cursor-pointer">Confidential</span>
            <span>•</span>
            <span className="hover:text-pink-700 transition-colors cursor-pointer">Available 24/7</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

