import * as React from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children, onClose }: { className?: string; children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6', className)}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  );
}

export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 mb-4', className)}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>
      {children}
    </p>
  );
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex justify-end space-x-2 mt-4', className)}>
      {children}
    </div>
  );
}
