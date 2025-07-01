import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LDProvider, useLDClient } from 'launchdarkly-react-client-sdk';
import { LaunchDarklyProvider } from './contexts/LaunchDarklyContext';
import App from './App';

// Initial user context
const initialContext = {
  kind: 'user' as const,
  key: 'anonymous',
  anonymous: true,
};

// The clientSideID is your SDK key.
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LDProvider 
      clientSideID="68622e4fd2d588093c750dcf"
      context={initialContext}
      options={{
        bootstrap: 'localStorage',
        sendEvents: process.env.NODE_ENV === 'production',
        logger: {
          debug: (message: string) => console.debug('[LaunchDarkly]', message),
          info: (message: string) => console.info('[LaunchDarkly]', message),
          warn: (message: string) => console.warn('[LaunchDarkly]', message),
          error: (message: string) => console.error('[LaunchDarkly]', message),
        },
      }}
    >
      <LaunchDarklyProvider>
        <App />
      </LaunchDarklyProvider>
    </LDProvider>
  </StrictMode>
);
