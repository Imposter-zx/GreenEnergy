import React from 'react';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

interface AlertProps {
    variant?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    onClose?: () => void;
    dismissible?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertTriangle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
};

const styles = {
    success: 'bg-emerald-50 border border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
    warning: 'bg-amber-50 border border-amber-200 text-amber-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800'
};

const Alert: React.FC<AlertProps> = ({
    variant = 'info',
    title,
    message,
    onClose,
    dismissible = true,
    action
}) => {
    return (
        <div className={`rounded-xl p-4 flex gap-4 items-start ${styles[variant]}`}>
            <div className="flex-shrink-0 mt-0.5">
                {icons[variant]}
            </div>
            <div className="flex-1">
                {title && <h4 className="font-semibold mb-1">{title}</h4>}
                <p className="text-sm">{message}</p>
                {action && (
                    <button
                        onClick={action.onClick}
                        className="text-sm font-semibold mt-2 hover:underline"
                    >
                        {action.label}
                    </button>
                )}
            </div>
            {dismissible && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 hover:opacity-70 transition-opacity"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Alert;
