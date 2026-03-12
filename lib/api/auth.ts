import { API_ENDPOINTS, getApiUrl, setAuthToken, removeAuthToken, getAuthToken } from '../api-config'

export interface RegisterPayload {
  email: string
  password: string
  phone_number?: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface UserRead {
  id: number
  email: string
  phone_number?: string
  is_active: boolean
  role: string
}

export async function register(payload: RegisterPayload): Promise<UserRead> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.REGISTER), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Registration failed')
  }

  return response.json()
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const formData = new URLSearchParams()
  formData.append('username', payload.username)
  formData.append('password', payload.password)

  const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Login failed')
  }

  const data = await response.json()
  setAuthToken(data.access_token)
  return data
}

export async function logout(): Promise<void> {
  removeAuthToken()
}

export async function getUsers(): Promise<UserRead[]> {
  const token = getAuthToken()
  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.LIST), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getAuthToken()
  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.CHANGE_PASSWORD), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to change password')
  }
}

export async function deleteAccount(): Promise<void> {
  const token = getAuthToken()
  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.DELETE), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to delete account')
  }

  // Clear auth token after successful deletion
  removeAuthToken()
}
