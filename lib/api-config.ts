// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/users/register',
    LOGIN: '/users/login',
  },
  // QR Code endpoints
  QR_CODES: {
    LIST: '/qrcodes',
    CREATE: '/qrcodes',
    GET: (id: string | number) => `/qrcodes/${id}`,
    UPDATE: (id: string | number) => `/qrcodes/${id}`,
    DELETE: (id: string | number) => `/qrcodes/${id}`,
    ANALYTICS: (id: string | number) => `/qrcodes/${id}/analytics`,
  },
  // Users endpoints
  USERS: {
    LIST: '/users',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE: '/users',
  },
}

export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`
}

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token)
  }
}

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
  }
}
