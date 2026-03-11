import { useState, useEffect } from 'react';
import { getSettings } from 'api';

// Shared state across all instances of the hook
let sharedIntegrationSettings = {};
const listeners = new Set();
let isInitialFetchComplete = false;

export const useIntegrationSettings = () => {
  const [integrationSettings, setIntegrationSettings] = useState(sharedIntegrationSettings);
  const [isLoading, setIsLoading] = useState(!isInitialFetchComplete);

  // Function to update settings and notify all listeners
  const updateIntegrationSettings = (newSettings) => {
    
    sharedIntegrationSettings = { ...newSettings };
    listeners.forEach(listener => listener(sharedIntegrationSettings));
  };

  // Fetch integration settings on first mount of any component using this hook
  useEffect(() => {
    const fetchIntegrationSettings = async () => {
      if (!isInitialFetchComplete) {
        try {
          setIsLoading(true);
          const response = await getSettings('integrations');
          updateIntegrationSettings(response.data || {});
          isInitialFetchComplete = true;
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchIntegrationSettings();
  }, []);

  // Subscribe to updates
  useEffect(() => {
    const listener = (newSettings) => {
      setIntegrationSettings({ ...newSettings });
    };
    
    listeners.add(listener);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    integrationSettings,
    updateIntegrationSettings,
    isLoading
  };
};