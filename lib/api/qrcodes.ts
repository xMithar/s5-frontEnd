import { API_ENDPOINTS, getApiUrl, getAuthToken } from '../api-config'

export interface QRCodeCreate {
  destination_url: string
  color?: string
  shape?: string
  is_dynamic?: boolean
}

export interface QRCodeUpdate {
  destination_url?: string
  color?: string
  shape?: string
  is_dynamic?: boolean
}

export interface QRCodeRead {
  id: number
  destination_url: string
  color?: string
  shape?: string
  is_dynamic: boolean
  short_code: string
  user_id: number
  created_at?: string
  updated_at?: string
}

export interface EventAnalyticsRead {
  id: number
  type: string
  qrcode_id: number
  event_date: string
  user_agent?: string
  ip_address?: string
}

export interface QRCodeAnalyticsRead {
  qrcode_id: number
  short_code: string
  destination_url: string
  total_events: number
  total_scans: number
  total_updates: number
  recent_events: EventAnalyticsRead[]
}

function getAuthHeaders() {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  }
}

export async function createQRCode(payload: QRCodeCreate): Promise<QRCodeRead> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.CREATE), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to create QR code')
  }

  return response.json()
}

export async function listQRCodes(): Promise<QRCodeRead[]> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.LIST), {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch QR codes')
  }

  return response.json()
}

export async function getQRCode(qrcodeId: string | number): Promise<QRCodeRead> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.GET(qrcodeId)), {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('QR code not found')
  }

  return response.json()
}

export async function updateQRCode(
  qrcodeId: string | number,
  payload: QRCodeUpdate
): Promise<QRCodeRead> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.UPDATE(qrcodeId)), {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to update QR code')
  }

  return response.json()
}

export async function deleteQRCode(qrcodeId: string | number): Promise<void> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.DELETE(qrcodeId)), {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete QR code')
  }
}

export async function getQRCodeAnalytics(qrcodeId: string | number): Promise<QRCodeAnalyticsRead> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.QR_CODES.ANALYTICS(qrcodeId)), {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch QR code analytics')
  }

  return response.json()
}
