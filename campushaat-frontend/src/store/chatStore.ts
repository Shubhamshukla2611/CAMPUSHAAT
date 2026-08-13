import { create } from 'zustand';
import type { ChatConversation, ChatMessage } from '../types';

interface ChatState {
  conversations: ChatConversation[];
  messagesByChat: Record<string, ChatMessage[]>;
  sendMessage: (chatId: string, content: string, senderId: string) => void;
  markAsRead: (chatId: string) => void;
  getOrCreateConversation: (listing: { id: string; title: string; price: number; images?: string[] }, seller: { id: string; name: string; isVerified?: boolean; avatarUrl?: string }) => string;
}

const mockConversations: ChatConversation[] = [
  {
    id: 'c-1',
    listing: {
      id: 'l-1',
      title: 'Introduction to Algorithms, 3rd Edition',
      price: 45.0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&q=80',
    },
    otherUser: {
      id: 'u-1',
      name: 'Alice Chen',
      isVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
    },
    lastMessage: 'Is this still available?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 1,
  },
  {
    id: 'c-2',
    listing: {
      id: 'l-2',
      title: 'Sony WH-1000XM4 Noise Canceling Headphones',
      price: 150.0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80',
    },
    otherUser: {
      id: 'u-2',
      name: 'Bob Smith',
      isVerified: false,
    },
    lastMessage: 'I can do ₹130 if you can meet today.',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
  }
];

const mockMessages: Record<string, ChatMessage[]> = {
  'c-1': [
    {
      id: 'm-1',
      senderId: 'user-1',
      content: 'Hi, I saw your listing for the Algorithms book.',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: 'm-2',
      senderId: 'u-1',
      content: 'Is this still available?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    }
  ],
  'c-2': [
    {
      id: 'm-3',
      senderId: 'u-2',
      content: 'Hey, would you take ₹120?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: 'm-4',
      senderId: 'user-1',
      content: 'I can do ₹140, it is in perfect condition.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    },
    {
      id: 'm-5',
      senderId: 'u-2',
      content: 'I can do ₹130 if you can meet today.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    }
  ]
};

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: mockConversations,
  messagesByChat: mockMessages,
  
  sendMessage: (chatId, content, senderId) => {
    set((state) => {
      const newMessage: ChatMessage = {
        id: `m-${Date.now()}`,
        senderId,
        content,
        timestamp: new Date().toISOString(),
      };
      
      const chatMessages = state.messagesByChat[chatId] || [];
      
      const updatedConversations = state.conversations.map(conv => {
        if (conv.id === chatId) {
          return {
            ...conv,
            lastMessage: content,
            updatedAt: newMessage.timestamp,
          };
        }
        return conv;
      });
      
      updatedConversations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      return {
        messagesByChat: {
          ...state.messagesByChat,
          [chatId]: [...chatMessages, newMessage],
        },
        conversations: updatedConversations,
      };
    });
  },

  markAsRead: (chatId) => {
    set((state) => ({
      conversations: state.conversations.map(conv => 
        conv.id === chatId ? { ...conv, unreadCount: 0 } : conv
      )
    }));
  },

  getOrCreateConversation: (listing, seller) => {
    const state = get();
    const existing = state.conversations.find(c => c.listing.id === listing.id);
    if (existing) {
      return existing.id;
    }

    const newChatId = `c-${Date.now()}`;
    const newConv: ChatConversation = {
      id: newChatId,
      listing: {
        id: listing.id,
        title: listing.title,
        price: Number(listing.price || 0),
        thumbnailUrl: (listing.images && listing.images[0]) || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80',
      },
      otherUser: {
        id: seller.id || 'u-seller',
        name: seller.name || 'Seller',
        isVerified: seller.isVerified ?? true,
        avatarUrl: seller.avatarUrl,
      },
      lastMessage: 'Started conversation',
      updatedAt: new Date().toISOString(),
      unreadCount: 0,
    };

    set((s) => ({
      conversations: [newConv, ...s.conversations],
      messagesByChat: {
        ...s.messagesByChat,
        [newChatId]: [
          {
            id: `m-init-${Date.now()}`,
            senderId: 'user-1',
            content: `Hi ${seller.name}, I am interested in your listing "${listing.title}".`,
            timestamp: new Date().toISOString(),
          }
        ]
      }
    }));

    return newChatId;
  }
}));
