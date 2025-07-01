import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LDContext } from 'launchdarkly-js-client-sdk';
import { useLDClient } from 'launchdarkly-react-client-sdk';

// Define the context type
export interface LaunchDarklyContextType {
  user: LDContext;
  setUser: (user: LDContext) => void;
}

// Create the context with a default value
const LaunchDarklyContext = createContext<LaunchDarklyContextType | undefined>(
  undefined
);

// Custom hook to use the LaunchDarkly context
export const useLaunchDarklyContext = () => {
  const context = useContext(LaunchDarklyContext);
  if (context === undefined) {
    throw new Error('useLaunchDarklyContext must be used within a LaunchDarklyProvider');
  }
  return context;
};

// Provider component - Now just manages user context, not the LDProvider
interface LaunchDarklyProviderProps {
  children: ReactNode;
  initialUser?: LDContext;
}

export const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({ 
  children, 
  initialUser = { key: 'anonymous', anonymous: true } 
}) => {
  const [user, setUser] = useState<LDContext>(initialUser);
  const ldClient = useLDClient();

  // Update the LaunchDarkly context when user changes
  useEffect(() => {
    if (ldClient && user) {
      console.log('Updating LaunchDarkly context with user:', user);
      ldClient.identify(user).then(() => {
        console.log('LaunchDarkly context updated successfully');
      }).catch(error => {
        console.error('Error updating LaunchDarkly context:', error);
      });
    }
  }, [user, ldClient]);

  return (
    <LaunchDarklyContext.Provider value={{ user, setUser }}>
      {children}
    </LaunchDarklyContext.Provider>
  );
};

export default LaunchDarklyContext;
