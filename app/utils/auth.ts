export const hasRequiredCookies = (): boolean => {
  // Check for both session and CSRF cookies
  const cookies = new Set(document.cookie.split(';').map(c => c.trim().split('=')[0]));
  return cookies.has('XSRF-TOKEN') && cookies.has('token');
};
