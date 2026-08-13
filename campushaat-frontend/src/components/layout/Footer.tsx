import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Mail, Globe, MessageSquare, ArrowUpRight } from 'lucide-react';
import { CampusSeal } from '../ui/CampusSeal';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface dark:bg-[#070b14] mt-auto pt-4 pb-4 px-4 md:pt-12 md:pb-8 font-body transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: mobile two columns, desktop unchanged */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          
          {/* Col 1 & 2: Brand overview */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/dashboard" className="inline-flex items-center gap-2">
              <CampusSeal color="indigo" size="md" />
              <span className="font-display font-semibold text-xl text-primary tracking-tight dark:text-white">
                CampusHaat
              </span>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              The verified peer-to-peer marketplace built exclusively for university students. Buy, sell, and trade safely within your campus community.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Verified University Emails (.edu)</span>
            </div>
          </div>

          {/* Col 3: Marketplace Quick Links */}
          <div>
            <h4 className="font-mono text-sm sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  All Listings
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="hover:text-primary transition-all flex items-center gap-1 hover:gap-2">
                  Post a Listing <ArrowUpRight className="w-3 h-3 text-text-secondary" />
                </Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-primary transition-colors">
                  Messages & Chats
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  My Account & Saved Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="font-mono text-sm sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Textbooks & Course Work
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Laptops & Electronics
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Dorm Gear & Furniture
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Clothing & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Info */}
          <div>
            <h4 className="font-mono text-sm sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
              Community & Safety
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/landing" className="hover:text-primary transition-colors">
                  About CampusHaat
                </Link>
              </li>
              <li>
                <Link to="/landing#trust" className="hover:text-primary transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/landing#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="mailto:support@campushaat.edu" className="hover:text-primary transition-colors">
                  Campus Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} CampusHaat Academic Network. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for college campuses.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/landing" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/landing" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Community">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="mailto:contact@campushaat.edu" className="hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
