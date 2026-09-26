const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const TOKEN_KEY = 'globpulse_seller_token';

export async function createSellerWebSession(): Promise<boolean> {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    console.error('Seller API token not found.');
    return false;
  }

  if (!API_URL) {
    console.error('VITE_API_URL is not configured.');
    return false;
  }

  try {
    const response = await fetch(
      `${API_URL}/seller/session-bridge`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log('Web session bridge:', data);

    if (!response.ok || !data.status) {
      console.error(
        'Session bridge failed:',
        data.message
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      'Session bridge request failed:',
      error
    );

    return false;
  }
}