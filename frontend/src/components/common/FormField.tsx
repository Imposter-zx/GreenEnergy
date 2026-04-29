import React from 'react';

interface FormFieldProps {
    label?: string;
    error?: string;
    required?: boolean;
    helperText?: string;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    required = false,
    helperText,
    children
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-semibold text-slate-700 block">
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="text-xs text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-xs text-slate-500">{helperText}</p>
            )}
        </div>
    );
};

export default FormField;
