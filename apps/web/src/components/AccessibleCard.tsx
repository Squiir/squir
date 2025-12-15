import React from 'react';
import { VisuallyHidden } from './VisuallyHidden';

export type AccessibleCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const AccessibleCard = ({ title, description, children }: AccessibleCardProps) => (
  <section
    aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
    aria-describedby={description ? `${title.replace(/\s+/g, '-').toLowerCase()}-desc` : undefined}
    style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: '1.25rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
    }}
  >
    <header style={{ marginBottom: '0.75rem' }}>
      <h2 id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} style={{ margin: 0 }}>
        {title}
      </h2>
      {description ? (
        <p id={`${title.replace(/\s+/g, '-').toLowerCase()}-desc`} style={{ margin: '0.25rem 0 0' }}>
          {description}
        </p>
      ) : (
        <VisuallyHidden>
          <span>Card content for {title}</span>
        </VisuallyHidden>
      )}
    </header>
    <div>{children}</div>
  </section>
);
