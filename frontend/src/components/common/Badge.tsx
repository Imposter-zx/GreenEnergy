import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({
        variant = 'primary',
        size = 'md',
        icon,
        children,
        className = '',
        ...props
    }, ref) => {
        const variants = {
            primary: 'bg-primary-100 text-primary-700 border border-primary-200',
            success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            warning: 'bg-amber-100 text-amber-700 border border-amber-200',
            danger: 'bg-red-100 text-red-700 border border-red-200',
            info: 'bg-blue-100 text-blue-700 border border-blue-200',
            neutral: 'bg-slate-100 text-slate-700 border border-slate-200'
        };

        const sizes = {
            sm: 'px-2.5 py-1 text-xs',
            md: 'px-3 py-1.5 text-sm',
            lg: 'px-4 py-2 text-base'
        };

        return (
            <span
                ref={ref}
                className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {icon}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export default Badge;
