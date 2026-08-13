import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, ArrowLeft } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Icon } from '../components/ui/Icon';
import { ListingCard } from '../components/ListingCard';

const MOCK_SELLER = {
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

export const SellerProfilePage: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listings } = useListings();

  const handleBack = () => {
    try {
      if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      navigate('/dashboard');
    }
  };

  const sellerListings = listings?.filter(l => l.seller.name === MOCK_SELLER.name) || [];

  return (
    <div className="w-full flex flex-col gap-8 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 hover:gap-2 text-sm text-text-secondary hover:text-text-primary font-medium transition-all w-fit focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 min-h-[44px] -ml-2"
      >
        <Icon icon={ArrowLeft} />
        Back
      </button>

      {/* Header Block */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <Avatar
          src={MOCK_SELLER.avatarUrl}
          alt={MOCK_SELLER.name}
          size="lg"
          isVerified={true}
          className="w-24 h-24 md:w-32 md:h-32 text-4xl"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col gap-1 mb-3">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-[-0.02em]">{MOCK_SELLER.name}</h1>
            <div className="font-mono text-sm text-text-secondary flex items-center gap-2">
              <span>{MOCK_SELLER.university}</span>
              <span>•</span>
              <span>{MOCK_SELLER.rollNumber}</span>
            </div>
          </div>

          <p className="text-text-primary max-w-2xl mb-4 leading-relaxed">
            {MOCK_SELLER.bio}
          </p>

          <div className="flex items-center gap-3 mb-8 border-l-4 border-emerald-500 pl-4 py-1">
            <Badge variant="emerald" icon={ShieldCheck}>Verified Student</Badge>
            <span className="text-sm text-text-secondary font-medium">Since {MOCK_SELLER.verifiedSince}</span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full mt-4">
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_SELLER.rating}
              </span>
              <span className="text-2xl font-bold text-text-primary flex items-center gap-1.5 relative z-10 mb-1">
                {MOCK_SELLER.rating} <Icon icon={Star} size={20} className="fill-primary text-primary" />
              </span>
              <span className="text-sm text-text-secondary font-medium relative z-10">{MOCK_SELLER.reviews} Reviews</span>
            </div>
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_SELLER.responseRate.replace('%', '')}
              </span>
              <span className="text-2xl font-bold text-text-primary relative z-10 mb-1">{MOCK_SELLER.responseRate}</span>
              <span className="text-sm text-text-secondary font-medium relative z-10">Response Rate</span>
            </div>
            <div className="flex flex-col relative group hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-2xl bg-surface border border-border hover:shadow-xl hover:border-primary/30 overflow-hidden">
              <span className="text-7xl font-bold tracking-tighter text-indigo-500/10 dark:text-indigo-400/10 absolute -bottom-2 -right-2 select-none group-hover:scale-110 transition-transform duration-500">
                {MOCK_SELLER.itemsSold}
              </span>
              <span className="text-2xl font-bold text-text-primary relative z-10 mb-1">{MOCK_SELLER.itemsSold}</span>
              <span className="text-sm text-text-secondary font-medium relative z-10">Items Sold</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seller's Listings */}
      <div className="mt-8">
        <h3 className="font-display font-bold text-2xl text-text-primary tracking-tight mb-6">Active Listings</h3>
        
        {sellerListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
            This seller doesn't have any active listings right now.
          </div>
        )}
      </div>

    </div>
  );
};
export default SellerProfilePage;
