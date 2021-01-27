export const API_TOKEN = 'apiToken';

export const getToken = () => {
  const token = localStorage.getItem(API_TOKEN) || null;
  if (token === 'undefined') {
    return null;
  }
  return token;
}
