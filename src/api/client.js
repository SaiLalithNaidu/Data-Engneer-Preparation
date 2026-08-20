// Dynamic API Endpoint Resolver & Resilient Fetch Client

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Running locally (localhost / 127.0.0.1)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // If VITE_API_BASE_URL is explicitly set to localhost or empty, use local 5100
      if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
        return 'http://localhost:5100/api';
      }
      // If VITE_API_BASE_URL is set to remote AWS IP, prefer local backend during local dev unless testing remote
      return 'http://localhost:5100/api';
    }
  }

  // Deployed Production Server (e.g. AWS EC2 IP 52.228.19.191)
  return (envUrl || 'http://52.228.19.191:5100/api').replace(/\/$/, '');
};

// Resilient API fetch wrapper with automatic failover
export async function apiFetch(endpoint, options = {}) {
  const primaryBase = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const primaryUrl = `${primaryBase}${cleanEndpoint}`;

  try {
    const response = await fetch(primaryUrl, options);
    return response;
  } catch (primaryErr) {
    console.warn(`[API CLIENT WARNING] Connection to ${primaryUrl} failed:`, primaryErr.message);

    // Fallback attempt to http://localhost:5100/api if running locally and primary URL was remote
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && !primaryBase.includes('localhost:5100')) {
      const fallbackUrl = `http://localhost:5100/api${cleanEndpoint}`;
      console.log(`[API CLIENT FAILOVER] Retrying on local Express API: ${fallbackUrl}`);
      try {
        const fallbackResponse = await fetch(fallbackUrl, options);
        return fallbackResponse;
      } catch (fallbackErr) {
        console.error(`[API CLIENT FAILOVER FAILED] Local server fallback failed:`, fallbackErr.message);
        throw fallbackErr;
      }
    }

    throw primaryErr;
  }
}
