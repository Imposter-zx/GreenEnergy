import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        error,
        helperText,
        icon,
        variant = 'default',
        className = '',
        ...props
    }, ref) => {
        const variants = {
            default: 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            filled: 'bg-slate-100 border-0 focus:ring-2 focus:ring-primary-500/20'
        };

        return (
            <div className="space-y-2">
                {label && (
                    <label className="text-sm font-semibold text-slate-700 ml-1 block">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full rounded-2xl py-3.5 ${icon ? 'pl-12 pr-4' : 'px-4'} outline-none transition-all font-medium ${variants[variant]} ${
                            error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                        } ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-600 ml-1">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-slate-500 ml-1">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
