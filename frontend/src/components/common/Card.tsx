import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined' | 'flat';
    padding?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({
        variant = 'default',
        padding = 'md',
        hoverable = false,
        children,
        className = '',
        ...props
    }, ref) => {
        const variants = {
            default: 'bg-white border border-slate-200 shadow-sm',
            elevated: 'bg-white border border-slate-100 shadow-lg shadow-slate-200/50',
            outlined: 'bg-transparent border-2 border-slate-200',
            flat: 'bg-slate-50 border-0'
        };

        const paddings = {
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8'
        };

        const hoverClass = hoverable ? 'hover:shadow-lg hover:border-primary-200 transition-all duration-200 cursor-pointer' : '';

        return (
            <div
                ref={ref}
                className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverClass} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
