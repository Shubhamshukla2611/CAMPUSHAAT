import React from 'react';
import { cn } from '../../lib/utils';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background select-none',
          active 
            ? 'bg-[#1A2340] text-white border border-transparent shadow-sm font-bold scale-[1.02]' 
            : 'bg-white text-[#6B7690] border border-[#EEF2FA] hover:border-[#3B6FE3]/40 hover:text-[#1A2340] shadow-xs font-semibold',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
