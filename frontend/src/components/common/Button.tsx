import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        loading = false,
        icon,
        fullWidth = false,
        children,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const baseStyles = 'font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed';
        
        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200',
            secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200',
            ghost: 'text-slate-600 hover:bg-slate-50',
            outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg'
        };

        const widthClass = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
                {...props}
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : icon}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
