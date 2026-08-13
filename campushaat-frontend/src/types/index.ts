// Shared TypeScript types & interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  condition: string;
  images: string[];
  campus: string;
  views: number;
  size?: string;
  isNegotiable?: boolean;
  status?: 'Active' | 'Sold' | 'Draft';
  seller: {
    id: string;
    name: string;
    isVerified: boolean;
    memberSince: string;
    rating: number;
    reviews: number;
    responseTime: string;
  };
  createdAt: string;
  isSaved?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  listing: {
    id: string;
    title: string;
    price: number;
    thumbnailUrl: string;
  };
  otherUser: {
    id: string;
    name: string;
    isVerified: boolean;
    avatarUrl?: string;
  };
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
}
