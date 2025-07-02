import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';

interface FeatureFlags {
  gcpEnabled: boolean;
  awsEnabled: boolean;
  azureEnabled: boolean;
  [key: string]: boolean | string | number;
}

export const useLaunchDarkly = () => {
  const ldClient = useLDClient();
  const flags = useFlags();
  
  // Debug log all received flags
  console.log('Raw LaunchDarkly flags:', flags);
  
  // Check if flags are being received
  const hasFlags = Object.keys(flags).length > 0;
  console.log('Has flags:', hasFlags);
  
  // Map the flags to our expected format
  const mappedFlags: FeatureFlags = {
    gcpEnabled: flags['gcpEnabled'] as boolean || false,
    awsEnabled: flags['awsEnabled'] as boolean || false,
    azureEnabled: flags['azureEnabled'] as boolean || false,
    gcpDetailsEnabled: flags['gcpDetailsEnabled'] as boolean || false,
    awsDetailsEnabled: flags['awsDetailsEnabled'] as boolean || false,
    azureDetailsEnabled: flags['azureDetailsEnabled'] as boolean || false,
  };

  console.log('Mapped flags:', mappedFlags);
  console.log('Flags:', flags);
  return { 
    flags: mappedFlags, 
    isReady: hasFlags, // Only mark as ready if we have flags
    error: null,
    client: ldClient
  };
};

export default useLaunchDarkly;
