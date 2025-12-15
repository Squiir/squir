import React, { forwardRef, useId } from 'react';

export type AccessibleTextFieldProps = {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const AccessibleTextField = forwardRef<HTMLInputElement, AccessibleTextFieldProps>(
  ({ label, name, type = 'text', placeholder, helperText, required = false, value, onChange }, ref) => {
    const id = useId();
    const helperId = helperText ? `${id}-helper` : undefined;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <label htmlFor={id} style={{ fontWeight: 600 }}>
          {label} {required && <span aria-hidden="true">*</span>}
        </label>
        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          required={required}
          aria-describedby={helperId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            borderRadius: 8,
            border: '1px solid #d1d5db',
            padding: '0.75rem 0.85rem',
            fontSize: '1rem',
          }}
        />
        {helperText ? (
          <p id={helperId} style={{ color: '#4b5563', margin: 0, fontSize: '0.95rem' }}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

AccessibleTextField.displayName = 'AccessibleTextField';
