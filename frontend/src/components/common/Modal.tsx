import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeButton?: boolean;
    showBackdrop?: boolean;
}

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeButton = true,
    showBackdrop = true
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {showBackdrop && (
                <div
                    className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <div
                className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} animate-in fade-in zoom-in-95 duration-300`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || closeButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        {title && <h2 className="text-xl font-bold text-slate-800">{title}</h2>}
                        {closeButton && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors ml-auto"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
