import { describe, expect, it } from '@jest/globals';
import { validateEnv } from './env';

describe('validateEnv', () => {
  it('parses valid environment variables', () => {
    const env = validateEnv({
      DATABASE_URL: 'https://db.example.com',
      PORT: '4000',
      NODE_ENV: 'production',
    });

    expect(env.PORT).toBe(4000);
    expect(env.DATABASE_URL).toBe('https://db.example.com');
    expect(env.NODE_ENV).toBe('production');
  });

  it('applies defaults and throws for invalid values', () => {
    expect(() =>
      validateEnv({
        DATABASE_URL: 'not-a-url',
      }),
    ).toThrow();

    const withDefault = validateEnv({ DATABASE_URL: 'https://db.example.com' });
    expect(withDefault.PORT).toBe(3000);
    expect(withDefault.NODE_ENV).toBe('development');
  });
});
