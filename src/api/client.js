// Dynamic API Endpoint Resolver & Resilient Fetch Client

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Running locally (localhost / 127.0.0.1)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5100/api';
    }

    // Running deployed on Netlify / Custom Domain
    if (hostname.includes('netlify.app') || window.location.protocol === 'https:') {
      // Use relative /api endpoint so Netlify proxy redirects seamlessly to AWS EC2 without mixed-content errors
      return `${window.location.origin}/api`;
    }
  }

  // Deployed Production Direct Server (e.g. AWS EC2 IP 52.228.19.191)
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

    // Fallback attempt to direct AWS EC2 URL if proxy or custom endpoint failed
    if (primaryBase !== 'http://52.228.19.191:5100/api') {
      const fallbackUrl = `http://52.228.19.191:5100/api${cleanEndpoint}`;
      console.log(`[API CLIENT FAILOVER] Retrying direct AWS EC2 API endpoint: ${fallbackUrl}`);
      try {
        const fallbackResponse = await fetch(fallbackUrl, options);
        return fallbackResponse;
      } catch (fallbackErr) {
        console.error(`[API CLIENT FAILOVER FAILED] Direct AWS EC2 fallback failed:`, fallbackErr.message);
        throw fallbackErr;
      }
    }

    throw primaryErr;
  }
}
