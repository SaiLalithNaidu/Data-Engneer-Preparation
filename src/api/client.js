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

  // Deployed Production Direct Server (e.g. AWS EC2 IP 16.170.217.208)
  return (envUrl || 'http://16.170.217.208:5100/api').replace(/\/$/, '');
};

// Resilient API fetch wrapper with automatic failover and safe JSON response handling
export async function apiFetch(endpoint, options = {}) {
  const primaryBase = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const primaryUrl = `${primaryBase}${cleanEndpoint}`;

  let response;

  try {
    response = await fetch(primaryUrl, options);
  } catch (primaryErr) {
    console.warn(`[API CLIENT WARNING] Connection to ${primaryUrl} failed:`, primaryErr.message);

    // Fallback attempt to direct AWS EC2 URL if proxy or custom endpoint failed
    if (primaryBase !== 'http://16.170.217.208:5100/api') {
      const fallbackUrl = `http://16.170.217.208:5100/api${cleanEndpoint}`;
      console.log(`[API CLIENT FAILOVER] Retrying direct AWS EC2 API endpoint: ${fallbackUrl}`);
      try {
        response = await fetch(fallbackUrl, options);
      } catch (fallbackErr) {
        console.error(`[API CLIENT FAILOVER FAILED] Direct AWS EC2 fallback failed:`, fallbackErr.message);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Unable to connect to backend server. AWS EC2 instance (16.170.217.208:5100) is offline or port 5100 is blocked.'
          }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Unable to connect to backend server. Please verify AWS EC2 instance status and network connection.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Handle Netlify Proxy Gateway Timeouts (504), Server Errors (500), or non-JSON HTML error pages
  if (response && !response.ok) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response; // Express backend returned structured JSON error payload
    }

    // Response body is HTML or text (e.g. Netlify 504 Gateway Timeout or 500 HTML page)
    let customMsg = `Server returned status ${response.status} (${response.statusText || 'Error'})`;
    if (response.status === 504) {
      customMsg = 'Backend connection timeout (504 Gateway Timeout). The AWS EC2 server (16.170.217.208:5100) is offline or port 5100 inbound rule is blocked in AWS Security Group.';
    } else if (response.status === 500) {
      customMsg = 'Backend server error (500 Internal Server Error). Please check backend server logs.';
    } else if (response.status === 404) {
      customMsg = `API route not found (404): ${cleanEndpoint}`;
    }

    // Return a synthetic Response object guaranteed to parse safely with .json()
    return new Response(
      JSON.stringify({
        success: false,
        status: response.status,
        message: customMsg
      }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return response;
}

