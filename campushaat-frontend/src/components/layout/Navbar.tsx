import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Bell, Search, Plus, Sun, Moon } from 'lucide-react';
import { CampusSeal } from '../ui/CampusSeal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  isUnreadMessages?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isUnreadMessages = true }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-surface/95 border-b border-[#EEF2FA] dark:border-slate-700 h-16 shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0 h-11 focus:outline-none focus:ring-2 focus:ring-[#3B6FE3] rounded-xl px-1.5 transition-transform hover:scale-[1.02]">
          <CampusSeal color="indigo" size="lg" />
          <span className="font-display font-semibold text-2xl text-[#3B6FE3] tracking-tight">
            CampusHaat
          </span>
        </Link>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-xl px-4">
          <Input 
            leftIcon={Search}
            placeholder="Search textbooks, electronics, furniture..." 
            className="rounded-full bg-[#F1F4F9] dark:bg-surface border-transparent dark:border-slate-700 font-body font-medium text-[#1A2340] dark:text-slate-100 placeholder:text-[#6B7690] dark:placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:bg-white dark:focus:bg-surface focus:border-[#3B6FE3] focus:ring-2 focus:ring-[#3B6FE3]/20"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          <Link 
            to="/messages" 
            className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-[#F1F4F9] dark:hover:bg-slate-800 transition-colors text-[#6B7690] dark:text-slate-300 hover:text-[#1A2340] dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]"
            aria-label="Messages"
          >
            <Icon icon={MessageCircle} />
            {isUnreadMessages && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
            )}
          </Link>

          <button 
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-[#F1F4F9] dark:hover:bg-slate-800 transition-colors text-[#6B7690] dark:text-slate-300 hover:text-[#1A2340] dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]"
            aria-label="Notifications"
          >
            <Icon icon={Bell} />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button 
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-[#F1F4F9] dark:hover:bg-slate-800 transition-colors text-[#6B7690] dark:text-slate-200 hover:text-[#3B6FE3] dark:hover:text-[#93C5FD] focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]"
            aria-label="Toggle dark mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <Icon icon={theme === 'dark' ? Sun : Moon} />
          </button>

          <div className="hidden sm:block ml-2">
            <Link to="/create-listing" tabIndex={-1}>
              <Button leftIcon={Plus} className="bg-[#3B6FE3] hover:bg-[#2B58C9] text-white shadow-sm font-semibold rounded-full">
                New Listing
              </Button>
            </Link>
          </div>

          {/* Mobile only Create button */}
          <Link 
            to="/create-listing" 
            className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#3B6FE3] text-white shadow-sm hover:bg-[#2B58C9] focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]"
            aria-label="New Listing"
          >
            <Icon icon={Plus} />
          </Link>

          <Link 
            to="/profile" 
            className="ml-2 flex items-center justify-center w-11 h-11 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B6FE3] focus:ring-offset-2"
            aria-label="Profile"
          >
            <Avatar 
              isVerified={true} 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" 
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
