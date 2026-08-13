import React from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Standard Icon wrapper for CampusHaat.
 * 
 * Convention:
 * - All icons come from lucide-react
 * - Default stroke width is 1.5
 * - Default size is 20px (unless overridden)
 */

interface IconProps extends LucideProps {
  icon: React.ElementType;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 20, strokeWidth = 1.5, className, ...props }) => {
  return (
    <IconComponent 
      size={size} 
      strokeWidth={strokeWidth} 
      className={cn('shrink-0', className)} 
      {...props} 
    />
  );
};
