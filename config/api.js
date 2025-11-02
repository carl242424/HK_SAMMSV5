// API Configuration
// Update this IP address when your network changes
export const API_BASE_URL = 'http://192.168.1.9:8000';

// Helper function to get the API URL
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

