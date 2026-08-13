import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className 
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={cn(
          'relative z-10 w-full max-w-md liquid-glass rounded-[28px] mx-4 flex flex-col max-h-[90vh]',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title ? (
            <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-text-primary px-2">{title}</h2>
          ) : (
            <div /> // Placeholder for spacing if no title
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-background transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <Icon icon={X} size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
