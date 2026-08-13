import { useQuery } from '@tanstack/react-query';
import type { Listing } from '../types';

// Mock data generator
const generateMockListings = (): Listing[] => {
  return [
    {
      id: 'l-1',
      title: 'Introduction to Algorithms, 3rd Edition',
      price: 45.00,
      description: 'Barely used textbook for CS101. No highlights.',
      category: 'Textbooks',
      condition: 'Like New',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
        'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?w=800&q=80',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80'
      ],
      campus: 'Stanford University',
      views: 12,
      isNegotiable: true,
      seller: { id: 'u-1', name: 'Alice Chen', isVerified: true, memberSince: '2023', rating: 4.8, reviews: 14, responseTime: 'within an hour' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      isSaved: false,
    },
    {
      id: 'l-2',
      title: 'Sony WH-1000XM4 Noise Canceling Headphones',
      price: 150.00,
      description: 'Upgrading to XM5. Works perfectly.',
      category: 'Electronics',
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80'],
      campus: 'Stanford University',
      views: 89,
      isNegotiable: false,
      seller: { id: 'u-2', name: 'Bob Smith', isVerified: false, memberSince: '2025', rating: 5.0, reviews: 2, responseTime: 'within a day' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      isSaved: true,
    },
    {
      id: 'l-3',
      title: 'Mini Fridge with Freezer Compartment',
      price: 60.00,
      description: 'Perfect for a dorm room. Must pick up.',
      category: 'Dorm Gear',
      condition: 'Fair',
      images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80'],
      campus: 'Stanford University',
      views: 45,
      isNegotiable: true,
      seller: { id: 'u-3', name: 'Charlie Davis', isVerified: true, memberSince: '2022', rating: 4.5, reviews: 32, responseTime: 'within few hours' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      isSaved: false,
    },
    {
      id: 'l-4',
      title: 'University Hoodie (Size M)',
      price: 25.00,
      description: 'Washed once, slightly too small for me.',
      category: 'Clothing',
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'],
      campus: 'Stanford University',
      views: 104,
      isNegotiable: true,
      seller: { id: 'u-1', name: 'Alice Chen', isVerified: true, memberSince: '2023', rating: 4.8, reviews: 14, responseTime: 'within an hour' },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      isSaved: false,
    },
    {
      id: 'l-5',
      title: 'Calculus Early Transcendentals 8th Ed',
      price: 30.00,
      description: 'Has some highlights in chapter 3, otherwise good condition.',
      category: 'Textbooks',
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1588580000645-4562a6d2c839?w=800&q=80'],
      campus: 'Stanford University',
      views: 5,
      isNegotiable: false,
      seller: { id: 'u-4', name: 'Diana Prince', isVerified: true, memberSince: '2024', rating: 4.9, reviews: 8, responseTime: 'within a day' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      isSaved: false,
    },
    {
      id: 'l-6',
      title: 'IKEA Desk Lamp (Black)',
      price: 15.00,
      description: 'Includes a smart bulb.',
      category: 'Dorm Gear',
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?w=800&q=80'],
      campus: 'Stanford University',
      views: 22,
      isNegotiable: true,
      seller: { id: 'u-5', name: 'Evan Wright', isVerified: false, memberSince: '2025', rating: 0, reviews: 0, responseTime: 'usually responds quickly' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      isSaved: false,
    },
    {
      id: 'l-7',
      title: 'iPad Pro 11-inch (2021) + Apple Pencil',
      price: 550.00,
      description: 'Used for note taking. Screen protector applied since day 1.',
      category: 'Electronics',
      condition: 'Excellent',
      images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'],
      campus: 'Stanford University',
      views: 215,
      isNegotiable: true,
      seller: { id: 'u-6', name: 'Fiona Gallagher', isVerified: true, memberSince: '2021', rating: 4.7, reviews: 45, responseTime: 'within few hours' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      isSaved: true,
    },
    {
      id: 'l-8',
      title: 'Chemistry Lab Goggles & Coat',
      price: 20.00,
      description: 'Used for Chem 101. Size Large coat.',
      category: 'Misc',
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1614935151651-0bea6508abb0?w=800&q=80'],
      campus: 'Stanford University',
      views: 31,
      isNegotiable: false,
      seller: { id: 'u-2', name: 'Bob Smith', isVerified: false, memberSince: '2025', rating: 5.0, reviews: 2, responseTime: 'within a day' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      isSaved: false,
    }
  ];
};

const getCustomListings = (): Listing[] => {
  try {
    const saved = localStorage.getItem('campushaat_custom_listings');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const useListings = (filters?: { category?: string, searchQuery?: string, condition?: string, priceRange?: string, sortBy?: string }) => {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const customListings = getCustomListings();
      let data = [...customListings, ...generateMockListings()];

      // Apply mock local filtering
      if (filters?.category && filters.category !== 'All') {
        data = data.filter(l => l.category === filters.category);
      }

      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        data = data.filter(l =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
        );
      }

      if (filters?.condition && filters.condition !== 'Any Condition') {
        data = data.filter(l => l.condition === filters.condition);
      }

      if (filters?.priceRange && filters.priceRange !== 'Any Price') {
        if (filters.priceRange === 'Under ₹500') data = data.filter(l => l.price < 500);
        else if (filters.priceRange === '₹500 - ₹2000') data = data.filter(l => l.price >= 500 && l.price <= 2000);
        else if (filters.priceRange === '₹2000 - ₹5000') data = data.filter(l => l.price > 2000 && l.price <= 5000);
        else if (filters.priceRange === 'Over ₹5000') data = data.filter(l => l.price > 5000);
      }

      if (filters?.sortBy) {
        if (filters.sortBy === 'Price: Low to High') data.sort((a, b) => a.price - b.price);
        else if (filters.sortBy === 'Price: High to Low') data.sort((a, b) => b.price - a.price);
        else if (filters.sortBy === 'Newest') data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      return data;
    },
  });
};
