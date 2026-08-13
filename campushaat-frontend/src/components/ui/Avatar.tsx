import React from 'react';
import { cn } from '../../lib/utils';
import { CampusSeal } from './CampusSeal';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  isVerified?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'User avatar', 
  size = 'md', 
  isVerified = false,
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const badgeSize = {
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const,
  };

  return (
    <div className={cn('relative inline-flex', className)} {...props}>
      <div 
        className={cn(
          'rounded-full overflow-hidden bg-background border border-border flex items-center justify-center text-text-secondary font-medium shrink-0',
          sizeClasses[size]
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          alt.charAt(0).toUpperCase()
        )}
      </div>
      
      {isVerified && (
        <div className="absolute -bottom-1 -right-1 bg-surface rounded-full p-0.5">
          <CampusSeal size={badgeSize[size]} />
        </div>
      )}
    </div>
  );
};
