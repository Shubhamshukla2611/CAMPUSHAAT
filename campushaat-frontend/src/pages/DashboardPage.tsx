import React, { useState } from 'react';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { Chip } from '../components/ui/Chip';
import { ListingCard } from '../components/ListingCard';

import { Icon } from '../components/ui/Icon';

const CATEGORIES = ['All', 'Textbooks', 'Electronics', 'Dorm Gear', 'Clothing', 'Misc'];
const CONDITIONS = ['Any Condition', 'New', 'Like New', 'Excellent', 'Good', 'Fair'];
const PRICE_RANGES = ['Any Price', 'Under ₹500', '₹500 - ₹2000', '₹2000 - ₹5000', 'Over ₹5000'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Relevant'];

export const DashboardPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [condition, setCondition] = useState('Any Condition');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Newest');

  // In a real app we might get searchQuery from URL params or a global store if the navbar search sets it.
  const { data: listings, isLoading } = useListings({ category: activeCategory, condition, priceRange, sortBy });

  const clearFilters = () => {
    setActiveCategory('All');
    setCondition('Any Condition');
    setPriceRange('Any Price');
    setSortBy('Newest');
  };

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* SaaS Dashboard Welcome Banner (Secondary Accent: soft gradient #DCE9FF to #EAF1FF) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-6 md:p-8 border border-slate-200/70 shadow-[0_20px_80px_rgba(15,23,42,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider w-fit border border-slate-200 shadow-sm">
            ✨ Verified Campus Network
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Explore Campus Marketplace
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg">
            Buy & sell verified textbooks, tech gadgets, and dorm essentials with fellow students near you.
          </p>
        </div>

        {/* Quick SaaS Stats Pills (Vibe inspired by reference SaaS dashboard) */}
        <div className="flex items-center gap-3 shrink-0 z-10 overflow-x-auto pb-1 md:pb-0">
          <div className="bg-white dark:bg-slate-950/95 px-5 py-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-w-[110px]">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">2,400+</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Items</span>
          </div>
          <div className="bg-white dark:bg-slate-950/95 px-5 py-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-w-[110px]">
            <span className="text-xl font-bold text-[#2563EB] dark:text-[#93C5FD]">100%</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verified .edu</span>
          </div>
          <div className="bg-[#2563EB] text-white px-5 py-4 rounded-3xl shadow-sm flex flex-col items-center justify-center min-w-[110px]">
            <span className="text-xl font-bold">&lt; 1 hr</span>
            <span className="text-xs font-medium text-white/80">Avg Response</span>
          </div>
        </div>

        {/* Soft background glow circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-slate-300/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Header section (Categories + Filters) */}
      <div className="flex flex-col gap-5">
        {/* Categories Segmented Pill Row */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map(cat => (
            <Chip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Chip>
          ))}
        </div>

        {/* Desktop Filters Row (Light card style with soft shadow, rounded-xl corners, subtle border) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Condition Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-[#EEF2FA] rounded-xl px-4 min-h-[42px] pr-10 text-sm font-semibold text-[#1A2340] shadow-xs hover:border-[#3B6FE3]/30 focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]/20 transition-all cursor-pointer"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Icon icon={ChevronDown} size={16} className="absolute right-3 top-3 text-[#6B7690] pointer-events-none" />
            </div>

            {/* Price Range Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-[#EEF2FA] rounded-xl px-4 min-h-[42px] pr-10 text-sm font-semibold text-[#1A2340] shadow-xs hover:border-[#3B6FE3]/30 focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]/20 transition-all cursor-pointer"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {PRICE_RANGES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <Icon icon={ChevronDown} size={16} className="absolute right-3 top-3 text-[#6B7690] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7690]">Sort by:</span>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-[#EEF2FA] rounded-xl px-4 min-h-[42px] pr-10 text-sm font-semibold text-[#1A2340] shadow-xs hover:border-[#3B6FE3]/30 focus:outline-none focus:ring-2 focus:ring-[#3B6FE3]/20 transition-all cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <Icon icon={ChevronDown} size={16} className="absolute right-3 top-3 text-[#6B7690] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-[#EEF2FA]/60 rounded-2xl aspect-[3/4] w-full" />
          ))}
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-[#EEF2FA] rounded-3xl bg-white shadow-xs">
          <div className="w-16 h-16 bg-[#F4F7FC] rounded-full flex items-center justify-center mb-4 border border-[#EEF2FA]">
            <Icon icon={Search} size={28} className="text-[#6B7690]" />
          </div>
          <h3 className="font-display font-bold text-2xl text-[#1A2340] mb-2 tracking-tight">
            No listings match these filters
          </h3>
          <p className="text-[#6B7690] mb-6 max-w-md text-sm">
            Try adjusting your category, condition, or price range to find what you're looking for.
          </p>
          <button 
            onClick={clearFilters}
            className="text-sm text-[#3B6FE3] hover:text-[#2B58C9] font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all focus:outline-none bg-[#E4ECFC] px-4 py-2 rounded-full"
          >
            Clear all filters <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
