import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none',
          // Variants
          variant === 'primary' && 'bg-[#3B6FE3] text-white hover:bg-[#2B58C9] shadow-sm active:scale-[0.98] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8]',
          variant === 'outline' && 'border border-[#3B6FE3] text-[#3B6FE3] bg-transparent hover:bg-[#3B6FE3] hover:text-white shadow-2xs dark:text-[#93c5fd] dark:border-[#60a5fa] dark:hover:bg-[#2563eb] dark:hover:text-white',
          variant === 'ghost' && 'text-[#6B7690] bg-transparent hover:bg-[#F1F4F9] hover:text-[#1A2340] dark:text-[#cbd5e1] dark:hover:bg-slate-800 dark:hover:text-[#F8FAFC]',
          // Sizes
          size === 'default' && 'min-h-[44px] px-6 py-2.5 text-sm md:text-base',
          size === 'sm' && 'min-h-[36px] px-4 py-1.5 text-xs md:text-sm',
          className
        )}
        {...props}
      >
        {leftIcon && <Icon icon={leftIcon} size={size === 'sm' ? 16 : 20} className="mr-2" />}
        {children}
        {rightIcon && <Icon icon={rightIcon} size={size === 'sm' ? 16 : 20} className="ml-2" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
