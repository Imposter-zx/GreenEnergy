import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    fullScreen = false,
    label
}) => {
    const sizes = {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-3',
        lg: 'h-16 w-16 border-4'
    };

    const spinner = (
        <div className="flex flex-col items-center gap-3">
            <div className={`${sizes[size]} rounded-full border-slate-200 border-r-primary-600 animate-spin`} />
            {label && <p className="text-sm text-slate-600">{label}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-sm z-40">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
