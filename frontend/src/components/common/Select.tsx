import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
    variant?: 'default' | 'filled';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({
        label,
        error,
        helperText,
        options,
        placeholder,
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
                <div className="relative">
                    <select
                        ref={ref}
                        className={`w-full rounded-2xl py-3.5 px-4 outline-none transition-all font-medium appearance-none pr-10 ${variants[variant]} ${
                            error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                        } ${className}`}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled selected>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                </div>
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

Select.displayName = 'Select';

export default Select;
