import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, className, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          checked ? 'bg-primary' : 'bg-background border-border',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-surface shadow-sm ring-0 transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
