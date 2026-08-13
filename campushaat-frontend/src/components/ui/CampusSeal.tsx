import React from 'react';
import { cn } from '../../lib/utils';

export interface CampusSealProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'indigo';
}

export const CampusSeal: React.FC<CampusSealProps> = ({ 
  size = 'md', 
  color = 'emerald', 
  className, 
  ...props 
}) => {
  const dimensions = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const iconSize = dimensions[size];
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center shrink-0 rounded-full border transition-colors',
        size === 'sm' && 'p-1',
        size === 'md' && 'p-1.5',
        size === 'lg' && 'p-2',
        color === 'emerald' && 'bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981] shadow-xs',
        color === 'indigo' && 'bg-[#3B6FE3]/10 border-[#3B6FE3]/20 text-[#3B6FE3] shadow-xs',
        className
      )}
      {...props}
    >
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" 
          fill="currentColor" 
        />
        <path 
          d="M8 12L11 15L16 9" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </span>
  );
};
