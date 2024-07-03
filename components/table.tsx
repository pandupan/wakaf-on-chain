import { cn } from '@/lib/utils';
import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
        {children}
      </table>
    </div>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
      <tr>
        {children}
      </tr>
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody className={cn(className)}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  isEven?: boolean;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({ children, isEven = false, className }) => {
  return (
    <tr className={cn(
      'transition duration-500',
      isEven ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100",
      className
    )}>
      {children}
    </tr>
  );
};

interface TableHeadColProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const TableHeadCol: React.FC<TableHeadColProps> = ({ children, align = 'left', className }) => {
  const alignment = `text-${align}`;
  return (
    <th className={cn(
      'py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm',
      alignment,
      className
    )}>
      {children}
    </th>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({ children, align = 'left', className }) => {
  const alignment = `text-${align}`;
  return (
    <td className={cn(
      'py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm',
      alignment,
      className
    )}>
      {children}
    </td>
  );
};
