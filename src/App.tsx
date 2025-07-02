import React, { useState, useEffect } from 'react';
import { useLaunchDarkly } from './hooks/useLaunchDarkly';
import { useLaunchDarklyContext } from './contexts/LaunchDarklyContext';
import GCPDetails from './components/GCPDetails';
import AWSDetails from './components/AWSDetails';
import AzureDetails from './components/AzureDetails';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// Cloud Service Components
const GCPService = () => {
  const { flags } = useLaunchDarkly();
  
  return (
    <div className="service gcp">
      <h2>Google Cloud Platform</h2>
      <p>GCP services are currently active.</p>
      <ul>
        <li>Compute Engine</li>
        <li>Cloud Storage</li>
        <li>Cloud SQL</li>
      </ul>
      {flags['gcpDetailsEnabled'] ? (
        <Link to="/gcp-details" className="details-button">View GCP Details</Link>
      ) : (
        <span className="details-button disabled">View GCP Details</span>
      )}
    </div>
  );
};

const AWSService = () => {
  const { flags } = useLaunchDarkly();
  
  return (
    <div className="service aws">
      <h2>Amazon Web Services</h2>
      <p>AWS services are currently active.</p>
      <ul>
        <li>EC2</li>
        <li>S3</li>
        <li>RDS</li>
      </ul>
      {flags['awsDetailsEnabled'] ? (
        <Link to="/aws-details" className="details-button">View AWS Details</Link>
      ) : (
        <span className="details-button disabled">View AWS Details</span>
      )}
    </div>
  );
};

const AzureService = () => {
  const { flags } = useLaunchDarkly();
  
  return (
    <div className="service azure">
      <h2>Microsoft Azure</h2>
      <p>Azure services are currently active.</p>
      <ul>
        <li>Virtual Machines</li>
        <li>Blob Storage</li>
        <li>SQL Database</li>
      </ul>
      {flags['azureDetailsEnabled'] ? (
        <Link to="/azure-details" className="details-button">View Azure Details</Link>
      ) : (
        <span className="details-button disabled">View Azure Details</span>
      )}
    </div>
  );
};

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
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CloudServiceSelector />} />
          <Route path="/gcp-details" element={<GCPDetails />} />
          <Route path="/aws-details" element={<AWSDetails />} />
          <Route path="/azure-details" element={<AzureDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
