import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { Avatar } from '../components/ui/Avatar';
import { Icon } from '../components/ui/Icon';
import { cn } from '../lib/utils';

export const MessagesPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const { conversations, messagesByChat, sendMessage, markAsRead } = useChatStore();
  const currentUser = useAuthStore(state => state.user);
  const effectiveUserId = currentUser?.id || 'user-1';
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If chat is open, mark as read
  useEffect(() => {
    if (chatId) {
      markAsRead(chatId);
    }
  }, [chatId, markAsRead]);

  // Scroll to bottom when messages change in active chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesByChat, chatId]);

  const activeConversation = conversations.find(c => c.id === chatId);
  const activeMessages = chatId ? (messagesByChat[chatId] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !chatId) return;
    
    sendMessage(chatId, inputText.trim(), effectiveUserId);
    setInputText('');
  };

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full -mt-6 md:-mt-8 -mx-4 md:-mx-0 md:border md:border-border md:rounded-2xl overflow-hidden bg-background md:my-8 md:h-[calc(100vh-128px)]">
      
      {/* Left Panel: Conversation List */}
      <div className={cn(
        'w-full md:w-[320px] lg:w-[380px] flex-shrink-0 border-r border-border flex flex-col bg-surface',
        chatId ? 'hidden md:flex' : 'flex' // Hide on mobile if a chat is active
      )}>
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-semibold text-xl text-text-primary">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => {
            const isActive = conv.id === chatId;
            return (
              <Link 
                key={conv.id}
                to={`/messages/${conv.id}`}
                className={cn(
                  'flex items-center gap-3 py-4 px-4 pr-4 border-b border-border transition-colors hover:bg-background border-l-[4px]',
                  isActive ? 'bg-background border-l-indigo-500' : 'border-l-transparent'
                )}
              >
                <div className="relative shrink-0">
                  <Avatar 
                    src={conv.otherUser.avatarUrl} 
                    alt={conv.otherUser.name} 
                    isVerified={conv.otherUser.isVerified} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-semibold text-text-primary truncate">{conv.otherUser.name}</span>
                    <span className="text-xs font-mono text-text-secondary shrink-0 ml-2">
                      {formatTime(conv.updatedAt)}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-text-secondary truncate mb-1">
                    {conv.listing.title}
                  </div>
                  <div className="text-sm text-text-secondary truncate pr-4">
                    {conv.lastMessage}
                  </div>
                </div>
                {conv.unreadCount > 0 && !isActive && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Active Chat */}
      <div className={cn(
        'flex-1 flex flex-col bg-background min-w-0',
        !chatId ? 'hidden md:flex' : 'flex'
      )}>
        {!chatId ? (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
              <Icon icon={MessageCircle} size={28} className="text-text-secondary" />
            </div>
            <h3 className="font-display font-semibold text-xl text-text-primary mb-2">Your Messages</h3>
            <p className="text-text-secondary">Select a conversation to start chatting.</p>
          </div>
        ) : !activeConversation ? (
          // Error State
          <div className="flex-1 flex items-center justify-center">
            <p className="text-text-secondary">Conversation not found.</p>
          </div>
        ) : (
          // Active Chat Thread
          <>
            {/* Chat Header */}
            <div className="h-16 flex items-center px-4 border-b border-border bg-surface shrink-0 gap-3">
              <button 
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
                      navigate(-1);
                    } else {
                      navigate('/messages');
                    }
                  } catch (err) {
                    navigate('/messages');
                  }
                }}
                className="md:hidden w-11 h-11 flex items-center justify-center -ml-2 text-text-secondary hover:text-text-primary focus:outline-none"
              >
                <Icon icon={ArrowLeft} />
              </button>
              <Avatar 
                src={activeConversation.otherUser.avatarUrl} 
                alt={activeConversation.otherUser.name} 
                isVerified={activeConversation.otherUser.isVerified} 
                size="sm"
              />
              <span className="font-bold text-xl md:text-2xl tracking-tight text-text-primary truncate">
                {activeConversation.otherUser.name}
              </span>
            </div>
            
            {/* Listing Snapshot Bar */}
            <Link to={`/listing/${activeConversation.listing.id}`} className="flex items-center gap-3 p-3 bg-surface border-b border-border shrink-0 hover:bg-background transition-colors group">
              <img 
                src={activeConversation.listing.thumbnailUrl} 
                alt="Listing" 
                className="w-12 h-12 rounded-lg object-cover bg-border"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-text-primary truncate group-hover:text-primary transition-colors">
                  {activeConversation.listing.title}
                </div>
                <div className="font-display text-sm text-price font-bold">
                  ₹{activeConversation.listing.price.toFixed(2)}
                </div>
              </div>
            </Link>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map(msg => {
                const isMe = msg.senderId === effectiveUserId;
                return (
                  <div key={msg.id} className={cn('flex flex-col max-w-[80%]', isMe ? 'ml-auto items-end' : 'mr-auto items-start')}>
                    <div className={cn(
                      'px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm',
                      isMe 
                        ? 'bg-primary text-surface rounded-br-sm' 
                        : 'bg-surface border border-border text-text-primary rounded-bl-sm'
                    )}>
                      {msg.content}
                    </div>
                    <span className="text-[11px] text-text-secondary mt-1 px-1 font-mono">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-border bg-surface shrink-0">
              <form onSubmit={handleSend} className="flex items-center gap-2 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-border bg-background text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-secondary/70"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-11 h-11 shrink-0 bg-primary text-surface rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Icon icon={Send} size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default MessagesPage;
