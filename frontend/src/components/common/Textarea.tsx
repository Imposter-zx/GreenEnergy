import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    rows?: number;
    variant?: 'default' | 'filled';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        label,
        error,
        helperText,
        rows = 4,
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
                    <label className="text-sm font-semibold text-slate-700 block">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={rows}
                    className={`w-full rounded-2xl px-4 py-3 outline-none transition-all font-medium resize-none ${variants[variant]} ${
                        error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                    } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-slate-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
