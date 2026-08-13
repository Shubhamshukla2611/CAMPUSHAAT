import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, PackageOpen, ArrowRight } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

import { Icon } from '../components/ui/Icon';
import { Card } from '../components/ui/Card';
import { ListingCard } from '../components/ListingCard';

type TabType = 'listings' | 'saved' | 'purchases';

const MOCK_USER = {
  name: 'Alice Chen',
  university: 'Stanford University',
  rollNumber: 'STU-99281',
  bio: 'CS major. I usually reply within an hour. Happy to negotiate on bundles!',
  verifiedSince: 'Aug 2023',
  rating: 4.8,
  reviews: 14,
  responseRate: '98%',
  itemsSold: 24,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
};

const MOCK_PURCHASES = [
  { id: 'p-1', title: 'Calculus Early Transcendentals 8th Ed', price: 25.00, date: 'Oct 12, 2025', image: 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?w=200&q=80' },
  { id: 'p-2', title: 'Desk Organizer Set', price: 12.50, date: 'Sep 28, 2025', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?w=200&q=80' }
];

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('listings');
  const { data: listings } = useListings();

  // Mock data derived from global listings for demonstration
  const myListings = listings?.filter(l => l.seller.id === 'u-1').map((l, idx) => ({
    ...l,
    // Just mock some statuses for the profile view showcase
    status: idx === 0 ? 'Active' : idx === 1 ? 'Sold' : 'Draft'
  })) || [];

  const savedListings = listings?.filter(l => l.isSaved) || [];

  return (
    <div className="w-full flex flex-col gap-8 max-w-5xl mx-auto">

      {/* Header Block */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <Avatar
          src={MOCK_USER.avatarUrl}
          alt={MOCK_USER.name}
          size="lg"
          isVerified={true}
          className="w-24 h-24 md:w-32 md:h-32 text-4xl"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col gap-1 mb-3">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-[-0.02em]">{MOCK_USER.name}</h1>
            <div className="font-mono text-sm text-text-secondary flex items-center gap-2">
              <span>{MOCK_USER.university}</span>
              <span>•</span>
              <span>{MOCK_USER.rollNumber}</span>
            </div>
          </div>

          <p className="text-text-primary max-w-2xl mb-4 leading-relaxed">
            {MOCK_USER.bio}
          </p>

          <div className="flex items-center gap-3 mb-8 border-l-4 border-emerald-500 pl-4 py-1">
            <Badge variant="emerald" icon={ShieldCheck}>Verified Student</Badge>
            <span className="text-sm text-text-secondary font-medium">Since {MOCK_USER.verifiedSince}</span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full mt-4">
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_USER.rating}
              </span>
              <span className="text-2xl font-bold text-text-primary flex items-center gap-1.5 relative z-10 mb-1">
                {MOCK_USER.rating} <Icon icon={Star} size={20} className="fill-primary text-primary" />
              </span>
              <span className="text-sm text-text-secondary font-medium relative z-10">{MOCK_USER.reviews} Reviews</span>
            </div>
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_USER.responseRate.replace('%', '')}
              </span>
              <span className="text-2xl font-bold text-text-primary relative z-10 mb-1">{MOCK_USER.responseRate}</span>
              <span className="text-sm text-text-secondary font-medium relative z-10">Response Rate</span>
            </div>
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_USER.itemsSold}
              </span>
              <span className="text-2xl font-bold text-text-primary relative z-10 mb-1">{MOCK_USER.itemsSold}</span>
              <span className="text-sm text-text-secondary font-medium relative z-10">Items Sold</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-border flex gap-8 overflow-x-auto scrollbar-hide">
        {(['listings', 'saved', 'purchases'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-h-[44px] px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 focus:outline-none flex items-center ${activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
          >
            {tab === 'listings' && 'My Listings'}
            {tab === 'saved' && 'Saved'}
            {tab === 'purchases' && 'Purchase History'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">

        {/* My Listings */}
        {activeTab === 'listings' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-end">
              <Link 
                to="/create-listing" 
                className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1 hover:gap-2 transition-all focus:outline-none"
              >
                Post a new listing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
                You haven't posted any listings yet.
              </div>
            )}
          </div>
        )}

        {/* Saved */}
        {activeTab === 'saved' && (
          <div className="flex flex-col gap-6">
            {savedListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
                You have no saved listings.
              </div>
            )}
          </div>
        )}

        {/* Purchase History */}
        {activeTab === 'purchases' && (
          <div className="flex flex-col gap-4">
            {MOCK_PURCHASES.length > 0 ? (
              MOCK_PURCHASES.map(purchase => (
                <Card key={purchase.id} className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-background border border-border">
                    <img src={purchase.image} alt={purchase.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{purchase.title}</h3>
                    <p className="text-sm text-text-secondary flex items-center gap-2">
                      <Icon icon={PackageOpen} size={14} />
                      Purchased on {purchase.date}
                    </p>
                  </div>
                  <div className="font-mono font-bold text-price text-lg">
                    ₹{purchase.price.toFixed(2)}
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
                No purchase history found.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
export default ProfilePage;
