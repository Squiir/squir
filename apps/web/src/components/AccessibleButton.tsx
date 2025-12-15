import React, { forwardRef } from 'react';

export type AccessibleButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
};

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, variant = 'primary', type = 'button', disabled = false, ariaLabel, onClick }, ref) => {
    const background = variant === 'primary' ? '#2563eb' : '#e5e7eb';
    const color = variant === 'primary' ? '#fff' : '#111827';

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        style={{
          background,
          color,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          padding: '0.75rem 1rem',
          fontWeight: 600,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        }}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            onClick?.(event as React.MouseEvent<HTMLButtonElement>);
          }
        }}
      >
        {children}
      </button>
    );
  },
);

AccessibleButton.displayName = 'AccessibleButton';
