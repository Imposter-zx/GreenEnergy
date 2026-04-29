import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    trend?: 'up' | 'down' | null;
    trendValue?: number;
    trendLabel?: string;
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    onClick?: () => void;
}

const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    danger: 'bg-red-50 text-red-600 border-red-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100'
};

const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    unit = '',
    trend,
    trendValue,
    trendLabel,
    color = 'primary',
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all ${
                onClick ? 'hover:shadow-md hover:border-slate-300 cursor-pointer' : ''
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
                    {icon}
                </div>
                {trend && trendValue !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                        trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {trendValue}%
                    </div>
                )}
            </div>

            {/* Content */}
            <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold text-slate-800">{value}</p>
                    {unit && <p className="text-sm text-slate-500">{unit}</p>}
                </div>
            </div>

            {/* Trend Label */}
            {trendLabel && (
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                    {trendLabel}
                </p>
            )}
        </div>
    );
};

export default StatCard;
