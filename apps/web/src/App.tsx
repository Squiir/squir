import React, { useState } from 'react';
import { AccessibleButton, AccessibleCard, AccessibleTextField, VisuallyHidden } from './components';

const App = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #eef2ff 100%)',
        padding: '2rem',
        color: '#0f172a',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <main style={{ maxWidth: 720, width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <header>
          <p style={{ color: '#2563eb', fontWeight: 600, margin: 0 }}>Web Accessibilité</p>
          <h1 style={{ margin: '0.25rem 0 0.5rem', fontSize: '2.25rem' }}>Interface accessible prête à l’emploi</h1>
          <p style={{ margin: 0, color: '#334155', fontSize: '1.05rem' }}>
            Les composants de base sont pensés pour fonctionner avec les lecteurs d’écran, la navigation
            clavier et les bonnes pratiques ARIA.
          </p>
        </header>

        <AccessibleCard
          title="Inscription à la newsletter"
          description="Démontre un formulaire lisible par les lecteurs d’écran avec des champs clairement associés."
        >
          <form
            aria-label="Formulaire d'inscription"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <AccessibleTextField
              label="Nom complet"
              name="name"
              required
              placeholder="Alex Dupont"
              value={name}
              onChange={(event) => setName(event.target.value)}
              helperText="Utilisé pour personnaliser vos messages."
            />
            <AccessibleTextField
              label="Email"
              name="email"
              type="email"
              required
              placeholder="alex@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              helperText="Nous n’enverrons jamais de spam."
            />
            <AccessibleButton type="submit" ariaLabel="Envoyer le formulaire d'inscription">
              S’inscrire
            </AccessibleButton>
            {submitted ? (
              <p role="status" aria-live="polite" style={{ margin: 0, color: '#16a34a' }}>
                Merci ! Vous êtes inscrit(e).
              </p>
            ) : (
              <VisuallyHidden>
                <p role="status" aria-live="polite">Soumission en attente</p>
              </VisuallyHidden>
            )}
          </form>
        </AccessibleCard>
      </main>
    </div>
  );
};

export default App;
