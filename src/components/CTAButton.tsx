
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  to?: string;
  external?: boolean;
  onClick?: () => void;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'default', size = 'default', to, external, onClick, children, ...props }, ref) => {
    const buttonClassName = cn(
      'transition-all duration-300 hover:shadow-lg relative overflow-hidden group',
      {
        'hover:translate-y-[-2px] before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20': variant === 'default',
      },
      className
    );

    // If onClick is provided and there's no "to" prop, render a regular button
    if (onClick && !to) {
      return (
        <Button
          className={buttonClassName}
          variant={variant}
          size={size}
          onClick={onClick}
          ref={ref}
          {...props}
        >
          <span className="relative z-10">{children}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 -translate-x-full group-hover:animate-shine"></span>
        </Button>
      );
    }

    // If "to" is provided, render a link
    if (to) {
      if (external) {
        return (
          <Button
            className={buttonClassName}
            variant={variant}
            size={size}
            onClick={onClick}
            asChild
            {...props}
          >
            <a href={to} target="_blank" rel="noopener noreferrer" ref={ref as any}>
              <span className="relative z-10">{children}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 -translate-x-full group-hover:animate-shine"></span>
            </a>
          </Button>
        );
      }
      
      return (
        <Button
          className={buttonClassName}
          variant={variant}
          size={size}
          onClick={onClick}
          asChild
          {...props}
        >
          <Link to={to} ref={ref as any}>
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 -translate-x-full group-hover:animate-shine"></span>
          </Link>
        </Button>
      );
    }

    // Default: regular button
    return (
      <Button
        className={buttonClassName}
        variant={variant}
        size={size}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 -translate-x-full group-hover:animate-shine"></span>
      </Button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;
