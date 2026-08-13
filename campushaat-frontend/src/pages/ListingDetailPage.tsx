import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Flag, MessageCircle, Heart, Star, Eye, CheckCircle2 } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { useChatStore } from '../store/chatStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { ListingCard } from '../components/ListingCard';

export const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listings, isLoading } = useListings();
  const getOrCreateConversation = useChatStore(state => state.getOrCreateConversation);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const listing = listings?.find(l => l.id === id);

  // Initialize isSaved when listing loads
  React.useEffect(() => {
    if (listing) {
      setIsSaved(listing.isSaved || false);
    }
  }, [listing]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-display font-semibold text-2xl text-text-primary mb-2">Listing not found</h2>
        <p className="text-text-secondary mb-6">The listing you're looking for might have been removed or sold.</p>
        <Button onClick={() => navigate('/dashboard')} leftIcon={ArrowLeft}>Back to Dashboard</Button>
      </div>
    );
  }

  const safeImages = listing.images && listing.images.length > 0
    ? listing.images
    : ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60'];

  const currentImage = safeImages[activeImageIndex] || safeImages[0];

  // Pick some similar listings
  const similarListings = listings?.filter(l => l.category === listing.category && l.id !== listing.id).slice(0, 3) || [];

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offer sent:', { listingId: listing.id, price: offerPrice, message: offerMessage });
    setIsOfferModalOpen(false);
  };

  const handleMakeOfferClick = () => {
    setOfferPrice(listing.price ? listing.price.toString() : '0');
    setIsOfferModalOpen(true);
  };

  const handleMessageSeller = () => {
    const chatId = getOrCreateConversation(listing, listing.seller);
    navigate(`/messages/${chatId}`);
  };

  // Navigate back to previous page if available, otherwise go to dashboard.
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

  return (
    <div>

      {/* MOBILE-ONLY LAYOUT (below 640px) */}
      <div className="sm:hidden px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <button onClick={handleBack} className="flex items-center gap-2 text-sm text-text-primary focus:outline-none">
            <Icon icon={ArrowLeft} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border text-text-secondary">
              <Icon icon={Heart} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border text-text-secondary">
              <Icon icon={Share} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full rounded-2xl overflow-hidden bg-[#F4F7FC] border border-[#EEF2FA]">
          <img src={currentImage} alt={listing.title} className="w-full h-64 object-cover" />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-4">
          {safeImages.map((_, i) => (
            <span key={i} className={i === activeImageIndex ? 'w-3 h-3 rounded-full bg-[#3B6FE3]' : 'w-2 h-2 rounded-full bg-[#D1D5DB]'} />
          ))}
        </div>

        {/* Seller link + rating */}
        <div className="mb-2">
          <button onClick={() => navigate(`/seller/${listing.seller?.id || 'u-1'}`)} className="text-sm text-[#3B6FE3] font-medium">
            Visit Seller Profile
          </button>
          <div className="text-xs text-text-secondary mt-1">{listing.seller?.rating ? `${listing.seller.rating} ★` : ''}</div>
        </div>

        {/* Title */}
        <h1 className="font-bold text-lg text-text-primary mb-2 line-clamp-3">{listing.title}</h1>

        {/* Price block */}
        <div className="bg-white p-3 rounded-xl border border-[#EEF2FA] mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-[#D97706]">₹{Number(listing.price || 0).toFixed(2)}</div>
          </div>
        </div>

        {/* Variant chips */}
        <div className="mb-3">
          <div className="text-sm text-text-secondary mb-2">Condition</div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-white border border-border rounded-full text-sm">{listing.condition}</button>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-20 text-sm text-text-secondary">
          <div className="font-medium text-text-primary">{listing.status !== 'Sold' ? 'In stock' : 'Unavailable'}</div>
          <div className="mt-1">Pickup: {listing.campus}</div>
          <div className="mt-1">Posted: {listing.createdAt}</div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="font-bold text-base mb-2">Description</h2>
          <p className="text-sm text-text-secondary whitespace-pre-wrap">{listing.description}</p>
        </div>

        {/* Seller details card */}
        <div className="mt-6 bg-white p-4 rounded-xl border border-border">
          <div className="flex items-center gap-3">
            <Avatar alt={listing.seller?.name} size="sm" isVerified={listing.seller?.isVerified} />
            <div>
              <div className="font-semibold">{listing.seller?.name}</div>
              <div className="text-xs text-text-secondary">{listing.campus}</div>
            </div>
          </div>
          <div className="mt-3 text-sm">Member since: {listing.seller?.memberSince || '2023'}</div>
        </div>

        {/* Similar listings last */}
        {similarListings.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold mb-3">You might also like</h3>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {similarListings.map(sl => (
                <div key={sl.id} className="w-[200px] shrink-0">
                  <ListingCard listing={sl} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP / TABLET LAYOUT (>=640px) - keep original markup untouched */}
      <div className="hidden sm:block">
        <div className="w-full flex flex-col md:flex-row gap-8">

          {/* Left Column (Images & Details) */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 hover:gap-2.5 text-sm text-[#6B7690] hover:text-[#1A2340] font-semibold transition-all w-fit mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B6FE3] rounded-full px-3 py-1.5 bg-white border border-[#EEF2FA] shadow-2xs -ml-1"
            >
              <Icon icon={ArrowLeft} />
              Back
            </button>

            {/* Gallery */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#F4F7FC] border border-[#EEF2FA] shadow-xs group mb-4">
              <img
                src={currentImage}
                alt={listing.title}
                className="w-full h-full object-cover"
              />

              {/* Action Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-11 h-11 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-md text-[#6B7690] hover:text-[#3B6FE3] transition-colors focus:outline-none">
                  <Icon icon={Share} />
                </button>
                <button className="w-11 h-11 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-md text-[#6B7690] hover:text-red-500 transition-colors focus:outline-none">
                  <Icon icon={Flag} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {safeImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8">
                {safeImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all focus:outline-none ${activeImageIndex === idx ? 'border-[#3B6FE3] shadow-sm scale-[1.02]' : 'border-[#EEF2FA] opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <section className="mb-10 bg-white p-6 md:p-8 rounded-3xl border border-[#EEF2FA] shadow-xs">
              <h3 className="font-display font-bold text-xl md:text-2xl text-[#1A2340] mb-4 tracking-tight">Description</h3>
              <p className="text-[#6B7690] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </section>

            {/* Similar Listings */}
            {similarListings.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[#1A2340] tracking-tight">Similar Listings</h3>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-[#3B6FE3] hover:text-[#2B58C9] font-semibold flex items-center gap-1 hover:gap-2 transition-all focus:outline-none"
                  >
                    See all similar listings <Icon icon={ArrowLeft} className="w-3 h-3 rotate-180" />
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {similarListings.map(sl => (
                    <div key={sl.id} className="w-[260px] shrink-0">
                      <ListingCard listing={sl} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Sticky Info Panel) */}
          <div className="w-full md:w-[380px] lg:w-[420px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">

              {/* Header Card */}
              <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-[#EEF2FA] shadow-xs">
                <div className="flex flex-col gap-2">
                  <h1 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-[#1A2340] leading-tight">
                    {listing.title}
                  </h1>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-sans font-bold text-3xl text-[#D97706] tracking-tight">
                      ₹{Number(listing.price || 0).toFixed(2)}
                    </span>
                    <Badge variant={listing.isNegotiable ? 'emerald' : 'amber-outline'}>
                      {listing.isNegotiable ? 'Negotiable' : 'Fixed Price'}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="slate" className="bg-[#E4ECFC] text-[#3B6FE3] border border-[#3B6FE3]/10 font-semibold px-3 py-1 rounded-full">{listing.condition}</Badge>
                  <Badge variant="indigo">{listing.category}</Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#6B7690] mt-2 pt-4 border-t border-[#EEF2FA]">
                  <div className="flex items-center gap-1.5">
                    <Icon icon={Eye} size={16} className="text-[#6B7690]" />
                    <span>{listing.views || 0} detail views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon icon={Heart} size={16} className="text-[#6B7690]" />
                    <span>{Math.floor((listing.views || 0) / 3)} saves</span>
                  </div>
                </div>
              </div>

              {/* Seller Block */}
              <Card className="p-6 md:p-8 flex flex-col gap-4 bg-white border border-[#EEF2FA] rounded-3xl shadow-xs">
                <div
                  onClick={() => navigate(`/seller/${listing.seller?.id || 'u-1'}`)}
                  className="flex items-center gap-3.5 cursor-pointer group/seller"
                >
                  <Avatar
                    size="lg"
                    isVerified={listing.seller?.isVerified}
                    alt={listing.seller?.name || 'Seller'}
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-bold text-[#1A2340] group-hover/seller:text-[#3B6FE3] transition-colors truncate">
                      {listing.seller?.name || 'Anonymous Seller'}
                    </h3>
                    <p className="text-xs text-[#6B7690] truncate">{listing.campus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs border-t border-[#EEF2FA] pt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6B7690]">Rating</span>
                    <div className="flex items-center gap-1 text-[#3B6FE3] font-bold">
                      <Icon icon={Star} size={14} className="fill-[#3B6FE3]" />
                      {Number(listing.seller?.rating || 5.0).toFixed(1)} ({listing.seller?.reviews || 0})
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6B7690]">Member since</span>
                    <span className="font-bold text-[#1A2340]">{listing.seller?.memberSince || '2023'}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[#6B7690]">Response time</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#1A2340]">
                      <Icon icon={CheckCircle2} size={14} className="text-[#10B981]" />
                      {listing.seller?.responseTime || 'within an hour'}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button size="default" leftIcon={MessageCircle} className="w-full bg-[#3B6FE3] hover:bg-[#2B58C9] text-white shadow-sm font-semibold rounded-full" onClick={handleMessageSeller}>
                  Message Seller
                </Button>

                {listing.isNegotiable && (
                  <Button
                    variant="outline"
                    className="w-full border-[#3B6FE3] text-[#3B6FE3] hover:bg-[#3B6FE3] hover:text-white rounded-full font-semibold"
                    onClick={handleMakeOfferClick}
                  >
                    Make an Offer
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className={`w-full mt-1 transition-colors rounded-full font-semibold ${isSaved ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-[#6B7690] hover:bg-[#F1F4F9]'}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Icon
                    icon={Heart}
                    className={`mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {isSaved ? 'Listing Saved' : 'Save Listing'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Make an Offer Modal */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title="Make an Offer"
      >
        <form onSubmit={handleSendOffer} className="flex flex-col gap-4 pt-2">
          <p className="text-sm text-text-secondary">
            Offer a fair price to the seller. They can choose to accept, decline, or counter your offer.
          </p>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-primary">Your Offer (₹)</label>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-primary">Message (Optional)</label>
            <textarea
              className="w-full min-h-[100px] px-4 py-2 border border-border rounded-xl bg-surface text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Hi, I can pick this up today..."
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" type="button" onClick={() => setIsOfferModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Send Offer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ListingDetailPage;
