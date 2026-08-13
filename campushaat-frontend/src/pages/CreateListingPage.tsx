import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UploadCloud, X, Lock, Check, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';
import { Toggle } from '../components/ui/Toggle';
import { Chip } from '../components/ui/Chip';
import { ListingCard } from '../components/ListingCard';

const createListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(70, "Title is too long"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  isNegotiable: z.boolean().default(false),
  category: z.string().min(1, "Please select a category"),
  condition: z.string().min(1, "Please select a condition"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  size: z.string().optional(),
  campus: z.string().optional(),
});

const CATEGORIES = ['Textbooks', 'Electronics', 'Dorm Gear', 'Clothing', 'Misc'];
const CONDITIONS = ['New', 'Like New', 'Very Good', 'Good', 'Fair'];
const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Other'];
const MOCK_CAMPUS = "Stanford University";

export const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: '',
      price: 0,
      isNegotiable: false,
      category: '',
      condition: '',
      description: '',
      campus: MOCK_CAMPUS,
    }
  });

  const formValues = watch();

  // Create a mock listing object for the live preview
  const previewListing = {
    id: 'preview',
    title: formValues.title || 'Listing Title',
    price: Number(formValues.price) || 0,
    description: formValues.description,
    category: formValues.category || 'Category',
    condition: formValues.condition || 'Condition',
    size: formValues.category === 'Clothing' ? formValues.size : undefined,
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80'],
    campus: MOCK_CAMPUS,
    views: 0,
    isNegotiable: !!formValues.isNegotiable,
    status: 'Draft' as const,
    seller: {
      id: 'current-user',
      name: 'Alice Chen',
      isVerified: true,
      memberSince: '2023',
      rating: 5.0,
      reviews: 10,
      responseTime: 'within an hour'
    },
    createdAt: new Date().toISOString(),
    isSaved: false,
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
    
    setImages(prev => [...prev, ...newImages].slice(0, 8)); // Max 8 images
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onSubmit = (data: any) => {
    const mockId = `l-${Date.now()}`;
    const newListing = {
      id: mockId,
      title: data.title,
      price: Number(data.price || 0),
      description: data.description,
      category: data.category,
      condition: data.condition,
      size: data.size,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80'],
      campus: MOCK_CAMPUS,
      views: 1,
      isNegotiable: !!data.isNegotiable,
      status: 'Active',
      seller: {
        id: 'u-1',
        name: 'Alice Chen',
        isVerified: true,
        memberSince: '2023',
        rating: 4.9,
        reviews: 12,
        responseTime: 'within an hour'
      },
      createdAt: new Date().toISOString(),
      isSaved: false,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('campushaat_custom_listings') || '[]');
      localStorage.setItem('campushaat_custom_listings', JSON.stringify([newListing, ...existing]));
    } catch (e) {
      console.error(e);
    }

    navigate(`/listing/${mockId}`);
  };

  const handleSaveDraft = () => {
    console.log('Saved as draft');
    navigate('/profile');
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Column: Form */}
        <div className="flex-1 w-full flex flex-col gap-8 min-w-0">
          
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2 tracking-[-0.02em]">Post a Listing</h1>
            <p className="text-text-secondary">Reach thousands of students across your campus.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 bg-white border border-[#EEF2FA] p-6 sm:p-8 rounded-3xl shadow-xs">
            
            {/* 1. Image Upload */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-[#1A2340]">Photos</h2>
              
              <div 
                className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-colors cursor-pointer group ${
                  isDragging 
                    ? 'border-[#3B6FE3] bg-[#DCE9FF]/60' 
                    : images.length > 0 
                      ? 'border-[#EEF2FA] bg-[#F4F7FC]' 
                      : 'border-[#3B6FE3]/30 bg-gradient-to-br from-[#DCE9FF]/40 to-[#EAF1FF]/60 hover:border-[#3B6FE3] hover:bg-[#DCE9FF]/60'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform border border-[#EEF2FA]">
                  <Icon icon={UploadCloud} size={28} className="text-[#3B6FE3]" />
                </div>
                <h3 className="font-semibold text-[#1A2340] mb-1">Click or drag images here</h3>
                <p className="text-sm text-[#6B7690]">SVG, PNG, JPG or GIF (max. 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  multiple 
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
              <p className="text-sm text-[#6B7690] font-medium">Listings with more photos get more responses.</p>

              {images.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mt-2">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl border border-border overflow-hidden group bg-background">
                      <img src={imgUrl} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center bg-surface/90 text-text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface hover:text-red-500 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <Icon icon={X} size={14} />
                      </button>
                      {idx === 0 && (
                        <div className="absolute bottom-0 left-0 w-full bg-primary/90 text-surface text-[10px] font-bold tracking-wide uppercase py-1 text-center backdrop-blur-sm">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 2. Title */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Title</h2>
              <Input 
                placeholder="What are you selling?"
                {...register('title')}
                error={errors.title?.message}
              />
            </section>

            {/* 3. Category */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Category</h2>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <Chip
                        key={cat}
                        active={field.value === cat}
                        onClick={() => field.onChange(cat)}
                      >
                        {cat}
                      </Chip>
                    ))}
                  </div>
                )}
              />
              {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
            </section>

            {/* Conditional Size Field (Only for Clothing) */}
            {formValues.category === 'Clothing' && (
              <section className="flex flex-col gap-3">
                <h2 className="font-semibold text-lg text-text-primary">Size</h2>
                <div className="relative max-w-[200px]">
                  <select 
                    {...register('size')}
                    className="appearance-none w-full bg-surface border border-border rounded-xl px-4 min-h-[44px] pr-10 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a size...</option>
                    {CLOTHING_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Icon icon={ChevronDown} size={16} className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
                </div>
              </section>
            )}

            {/* 4. Condition */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Condition</h2>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {CONDITIONS.map(cond => (
                      <Chip
                        key={cond}
                        active={field.value === cond}
                        onClick={() => field.onChange(cond)}
                      >
                        {cond}
                      </Chip>
                    ))}
                  </div>
                )}
              />
              {errors.condition && <span className="text-xs text-red-500">{errors.condition.message}</span>}
            </section>

            {/* 5. Price */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Price</h2>
              <div className="relative max-w-sm">
                <span className="absolute left-4 top-[11px] text-text-secondary font-mono font-semibold">₹</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`w-full min-h-[44px] pl-8 pr-4 py-2 bg-surface border rounded-xl font-mono text-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${errors.price ? 'border-red-500' : 'border-border'}`}
                  {...register('price')}
                />
              </div>
              {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
              
              <Controller
                name="isNegotiable"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-3 min-h-[44px]">
                      <Toggle 
                        checked={!!field.value} 
                        onChange={field.onChange} 
                      />
                      <span className="text-sm font-medium text-text-primary">Negotiable</span>
                    </div>
                    <p className="text-sm text-text-secondary pl-14 -mt-3">
                      {field.value ? "Buyers can send offers" : "Fixed price — no offers"}
                    </p>
                  </div>
                )}
              />
            </section>

            {/* 6. Description */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Description</h2>
              <textarea
                className={`w-full min-h-[120px] px-4 py-3 bg-surface border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-y ${errors.description ? 'border-red-500' : 'border-border'}`}
                placeholder="Describe your item in detail..."
                {...register('description')}
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
            </section>

            {/* 7. Campus */}
            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg text-text-primary">Campus</h2>
              <div className="relative max-w-sm">
                <Icon icon={Lock} size={18} className="absolute left-4 top-[13px] text-text-secondary" />
                <input
                  type="text"
                  readOnly
                  disabled
                  value={MOCK_CAMPUS}
                  className="w-full min-h-[44px] pl-11 pr-4 py-2 bg-background border border-border rounded-xl text-text-secondary cursor-not-allowed opacity-80"
                />
              </div>
              <p className="text-sm text-text-secondary flex items-center gap-1.5 mt-1">
                <Icon icon={Check} size={14} className="text-verified" />
                Matches your verified university
              </p>
            </section>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 pt-8 border-t border-border">
              <Button 
                type="submit"
                className="w-full sm:w-auto sm:min-w-[200px]"
              >
                Publish Listing
              </Button>
              <button 
                type="button" 
                onClick={handleSaveDraft}
                className="text-text-secondary hover:text-primary font-medium transition-colors focus:outline-none focus:underline"
              >
                Save as draft
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Live Preview (Sticky on Desktop) */}
        <div className="hidden lg:block w-[360px] xl:w-[400px] shrink-0">
          <div className="sticky top-24">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-6 tracking-tight">Live Preview</h3>
            <ListingCard listing={previewListing as any} />
          </div>
        </div>

      </div>
    </div>
  );
};
export default CreateListingPage;
