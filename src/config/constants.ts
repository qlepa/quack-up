export const APP_CONFIG = {
  name: 'Quack Up',
  description: 'AI Companion for meaningful conversations',
  version: '1.0.0',
} as const;

export const API_CONFIG = {
  endpoints: {
    think: '/api/think',
  },
  models: {
    default: 'gpt-4o-mini' as const,
  },
  defaults: {
    temperature: 0.7,
    maxTokens: 1500,
  },
} as const;

export const UI_CONFIG = {
  maxMessageLength: 1000,
  typingIndicatorDelay: 1000,
  scrollBehavior: 'smooth' as const,
} as const;
