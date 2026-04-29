import React from 'react';
import { ChevronRight } from 'lucide-react';

interface DataTableColumn<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    width?: string;
}

interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;
    onRowClick?: (row: T) => void;
    rowActions?: {
        label: string;
        onClick: (row: T) => void;
        icon?: React.ReactNode;
    }[];
    emptyMessage?: string;
    striped?: boolean;
    hoverable?: boolean;
}

const DataTable = React.forwardRef<
    HTMLTableElement,
    DataTableProps<any>
>(
    ({
        columns,
        data,
        loading = false,
        onRowClick,
        rowActions,
        emptyMessage = 'No data available',
        striped = true,
        hoverable = true
    }, ref) => {
        if (loading) {
            return (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            );
        }

        if (data.length === 0) {
            return (
                <div className="text-center py-12">
                    <p className="text-slate-500">{emptyMessage}</p>
                </div>
            );
        }

        return (
            <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
                <table ref={ref} className="w-full">
                    {/* Header */}
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={`px-6 py-4 text-left text-sm font-semibold text-slate-700 ${column.width || ''}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <svg className="w-4 h-4 opacity-40" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 10a1 1 0 011.414 0L10 13.586l3.586-3.586A1 1 0 1115.414 12l-5 5a1 1 0 01-1.414 0l-5-5A1 1 0 015 10z" />
                                            </svg>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {rowActions && <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b border-slate-100 transition-colors ${
                                    striped && rowIndex % 2 === 0 ? 'bg-slate-50/50' : ''
                                } ${hoverable && (onRowClick || rowActions) ? 'hover:bg-primary-50 cursor-pointer' : ''}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={String(column.key)}
                                        className={`px-6 py-4 text-sm text-slate-700 ${column.width || ''}`}
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : String(row[column.key] || '-')}
                                    </td>
                                ))}
                                {rowActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {rowActions.map((action, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        action.onClick(row);
                                                    }}
                                                    className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title={action.label}
                                                >
                                                    {action.icon || <ChevronRight size={16} />}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
);

DataTable.displayName = 'DataTable';

export default DataTable;
