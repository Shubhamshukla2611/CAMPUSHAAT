import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Bookmark, Eye } from 'lucide-react';
import { Card } from './ui/Card';
import { CampusSeal } from './ui/CampusSeal';
import { Badge } from './ui/Badge';
import { Icon } from './ui/Icon';
import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(listing.isSaved || false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  // Format relative time (mock implementation for "2h ago" etc)
  const formatTime = (_dateStr: string) => {
    // In a real app we'd use date-fns formatDistanceToNow, but stubbing for visual
    return '2h ago'; 
  };

  return (
    <Card 
      ref={cardRef}
      className="p-0 cursor-pointer group bg-white dark:bg-surface border border-[#EEF2FA] dark:border-slate-700 rounded-2xl saas-card-shadow saas-card-hover h-full flex flex-col reveal-on-scroll overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-[#F4F7FC]">
        <img 
          src={listing.images[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60'} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Verification Badge (on white circle with light shadow) */}
        {listing.seller.isVerified && (
          <div className="absolute top-3 left-3 bg-white p-1 rounded-full shadow-md border border-[#EEF2FA] flex items-center justify-center">
            <CampusSeal size="sm" />
          </div>
        )}

        {/* Status Badge or Bookmark Button */}
        {listing.status ? (
          <div className="absolute top-3 right-3">
            <Badge 
              variant={listing.status === 'Active' ? 'emerald' : listing.status === 'Draft' ? 'amber-outline' : 'slate'}
              className={listing.status === 'Sold' ? 'bg-white shadow-xs' : ''}
            >
              {listing.status}
            </Badge>
          </div>
        ) : (
          <button 
            type="button"
            onClick={handleBookmarkClick}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[#6B7690] dark:text-slate-300 hover:text-[#3B6FE3] dark:hover:text-[#93C5FD] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]"
            aria-label={isSaved ? "Remove bookmark" : "Bookmark listing"}
          >
            <Icon 
              icon={Bookmark} 
              size={18} 
              className={isSaved ? "fill-[#3B6FE3] text-[#3B6FE3]" : ""} 
            />
          </button>
        )}
      </div>

      {/* Content Container (Increased padding for breathing room) */}
      <div className={cn("p-5 flex flex-col flex-1", listing.status === 'Sold' && "opacity-60")}>
        
        {/* Title */}
        <h3 className="font-sans font-semibold text-lg text-[#1A2340] truncate mb-2 group-hover:text-[#3B6FE3] transition-colors" title={listing.title}>
          {listing.title}
        </h3>
        
        {/* Price & Condition Tag Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-sans font-bold text-[#D97706] text-xl tracking-tight">
            ₹{listing.price.toFixed(2)}
          </div>
          <Badge variant="slate" className="bg-[#E4ECFC] text-[#3B6FE3] border border-[#3B6FE3]/10 font-semibold px-3 py-1 rounded-full">
            {listing.condition}
          </Badge>
        </div>
        
        <div className="flex-1" />

        {/* Location + time + views row */}
        <div className="flex items-center justify-between text-xs text-[#6B7690] pt-3.5 border-t border-[#EEF2FA]">
          <div className="truncate pr-2 font-medium">
            {listing.campus} • {formatTime(listing.createdAt)}
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[#6B7690]" title="Detail-page views">
            <Icon icon={Eye} size={14} className="text-[#6B7690]" />
            <span>{listing.views}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
