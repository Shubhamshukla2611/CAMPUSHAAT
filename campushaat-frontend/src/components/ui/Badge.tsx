import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';
import type { LucideIcon } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'slate' | 'indigo' | 'emerald' | 'amber-outline';
  icon?: LucideIcon;
}

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'slate',
  icon,
  children,
  ...props 
}) => {
  return (
    <span 
      className={cn(
        'inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors',
        // Variants
        variant === 'slate' && 'bg-[#E4ECFC] text-[#3B6FE3] border border-[#3B6FE3]/10 font-semibold shadow-2xs',
        variant === 'indigo' && 'bg-[#3B6FE3]/10 text-[#3B6FE3] border border-[#3B6FE3]/20 font-semibold',
        variant === 'emerald' && 'bg-emerald-50 text-[#10B981] border border-emerald-200/80 font-semibold',
        variant === 'amber-outline' && 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] font-semibold',
        className
      )} 
      {...props}
    >
      {icon && <Icon icon={icon} size={14} className="mr-1.5" strokeWidth={2} />}
      {children}
    </span>
  );
};
