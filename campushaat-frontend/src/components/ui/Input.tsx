import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: LucideIcon;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-text-secondary pointer-events-none">
              <Icon icon={leftIcon} size={20} />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full min-h-[44px] px-4 py-2 border rounded-xl bg-surface text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:ring-2 focus:ring-offset-0 dark:bg-surface dark:text-slate-100 dark:placeholder:text-slate-400 dark:border-slate-700',
              leftIcon ? 'pl-10' : '',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-border focus:border-primary focus:ring-primary/20',
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <span className="mt-1.5 text-sm text-red-500 font-medium ml-1">
            {error}
          </span>
        )}
        
        {!error && helperText && (
          <span className="mt-1.5 text-sm text-text-secondary ml-1">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
