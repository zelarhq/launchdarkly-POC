import React, { useState, useEffect } from 'react';
import { useLaunchDarkly } from './hooks/useLaunchDarkly';
import { useLaunchDarklyContext } from './contexts/LaunchDarklyContext';
import './App.css';

// Cloud Service Components
const GCPService = () => (
  <div className="service gcp">
    <h2>Google Cloud Platform</h2>
    <p>GCP services are currently active.</p>
    <ul>
      <li>Compute Engine</li>
      <li>Cloud Storage</li>
      <li>Cloud SQL</li>
    </ul>
  </div>
);

const AWSService = () => (
  <div className="service aws">
    <h2>Amazon Web Services</h2>
    <p>AWS services are currently active.</p>
    <ul>
      <li>EC2</li>
      <li>S3</li>
      <li>RDS</li>
    </ul>
  </div>
);

const AzureService = () => (
  <div className="service azure">
    <h2>Microsoft Azure</h2>
    <p>Azure services are currently active.</p>
    <ul>
      <li>Virtual Machines</li>
      <li>Blob Storage</li>
      <li>SQL Database</li>
    </ul>
  </div>
);

const CloudServiceSelector = () => {
  const { setUser } = useLaunchDarklyContext();
  const [userEmail, setUserEmail] = useState('');
  
  // Use our custom hook to get flags with loading state
  const { flags, isReady } = useLaunchDarkly();
  console.log('Flags in component:', flags);
  console.log('Is ready:', isReady);

  useEffect(() => {
    if (userEmail) {
      console.log('Updating user context with email:', userEmail);
      const isInternal = userEmail.endsWith('@zelarsoft.com');
      const userContext = {
        key: userEmail,
        email: userEmail,
        custom: {
          groups: isInternal ? ['internal'] : ['external'],
          isInternal
        },
        anonymous: false
      };
      console.log('Setting user context:', userContext);
      setUser(userContext);
    } else {
      console.log('No email provided, using anonymous user');
      setUser({
        key: 'anonymous',
        anonymous: true
      });
    }
  }, [userEmail, setUser]);
  
  // Show loading state
  if (!isReady) {
    return (
      <div className="loading-container">
        <p>Loading feature flags from LaunchDarkly...</p>
        <p>Please wait or check the console for errors.</p>
      </div>
    );
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cloud Service Dashboard</h1>
        <div className="user-email">
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={handleEmailChange}
            disabled={false}
          />
          <p className="hint">
            {userEmail.endsWith('@zelarsoft.com') 
              ? 'Internal user detected - All features enabled' 
              : 'External user - Features based on permissions'}
          </p>
        </div>
      </header>
      
      <main className="services-container">
        {flags.gcpEnabled && <GCPService />}
        {flags.awsEnabled && <AWSService />}
        {flags.azureEnabled && <AzureService />}
        
        {!flags.gcpEnabled && !flags.awsEnabled && !flags.azureEnabled && (
          <div className="no-services">
            <p>No cloud services are enabled for your account.</p>
            <p>Please contact support if you believe this is an error.</p>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Feature flags powered by LaunchDarkly</p>
        <p className="debug-info">
          User: {userEmail || 'anonymous'} | 
          Flags: GCP: {flags.gcpEnabled ? '✅' : '❌'} | 
          AWS: {flags.awsEnabled ? '✅' : '❌'} | 
          Azure: {flags.azureEnabled ? '✅' : '❌'}
        </p>
      </footer>
    </div>
  );
};

// Debug environment variables
console.log('Environment Variables:', {
 // clientId: process.env.REACT_APP_LAUNCHDARKLY_CLIENT_ID,
 clientId: "68622e4fd2d588093c750dcf",
 nodeEnv: process.env.NODE_ENV,
});

// Main App component
const App = () => {
  // Get the LaunchDarkly client ID from environment variables
  //const clientId = process.env.REACT_APP_LAUNCHDARKLY_CLIENT_ID || 'YOUR_LAUNCHDARKLY_CLIENT_ID';
  return (
    <CloudServiceSelector />
  );
};

export default App;
