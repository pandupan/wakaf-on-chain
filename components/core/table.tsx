import { cn } from '@/lib/utils';
import * as React from 'react';

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
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

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
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

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
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

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & TableRowProps
>((
  { children, isEven = false, className, ...props }, ref
) => {
  return (
    <tr
      ref={ref}
      className={cn(
        'transition duration-500',
        isEven ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
});

TableRow.displayName = "TableRow";

interface TableHeadColProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const TableHeadCol: React.FC<TableHeadColProps> = ({ children, align = 'left', className }) => {
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

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & TableCellProps
>(({ children, align = 'left', className, ...props }, ref) => {
  const alignment = `text-${align}`;
  return (
    <td
      ref={ref}
      className={cn(
        'py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm',
        alignment,
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";

export {
  Table,
  TableBody,
  TableHead,
  TableHeadCol,
  TableRow,
  TableCell,
}
