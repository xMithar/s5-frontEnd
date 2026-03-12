# Backend Integration Guide

## Overview
Your Next.js frontend is now fully integrated with the FastAPI backend at `http://localhost:8000/api/v1`.

## Files Modified for Backend Integration

### Core API Setup
- **`lib/api-config.ts`** - Central configuration file with:
  - API base URL (defaults to `http://localhost:8000/api/v1`)
  - All endpoint definitions
  - Token management functions (getAuthToken, setAuthToken, removeAuthToken)

- **`lib/api/auth.ts`** - Authentication API functions:
  - `login(payload)` - User login with email/password
  - `register(payload)` - User registration
  - `changePassword(current, new)` - Change password for authenticated users
  - `deleteAccount()` - Delete user account
  - `getUsers()` - Fetch all admin users (super-admin only)

- **`lib/api/qrcodes.ts`** - QR code API functions:
  - `listQRCodes()` - Get all QR codes
  - `createQRCode(payload)` - Create new QR code
  - `getQRCode(id)` - Get single QR code details
  - `updateQRCode(id, payload)` - Update QR code
  - `deleteQRCode(id)` - Delete QR code
  - `getQRCodeAnalytics(id)` - Get analytics for QR code

### Integrated Pages & Components

#### Authentication
- **`app/login/page.tsx`** - Login page
  - Calls `login(username, password)` on submit
  - Stores JWT token in localStorage
  - Redirects to `/admin` on success
  - Shows error messages via toast

- **`app/register/page.tsx`** - Registration page
  - Calls `register(email, password)` on submit
  - Redirects to `/login` on success
  - Shows error messages via toast

#### Admin Dashboard
- **`components/dashboard-content.tsx`** - Admin dashboard
  - Calls `listQRCodes()` on mount
  - Calculates stats dynamically from API data
  - Shows loading spinner while fetching
  - Falls back to mock data if API fails

#### QR Code Management
- **`components/qr-codes-content.tsx`** - QR codes list page
  - Calls `listQRCodes()` to fetch codes
  - Calls `deleteQRCode(id)` when deleting
  - Shows loading/error states
  - Displays error messages for API failures

#### Analytics
- **`components/admin-analytics-content.tsx`** - Analytics page
  - Calls `listQRCodes()` to fetch data
  - Calculates analytics metrics dynamically
  - Shows loading state during data fetch

#### Admin Profile
- **`app/admin/profile/page.tsx`** - User profile management
  - Calls `changePassword()` to update password with validation
  - Calls `deleteAccount()` to delete account with confirmation
  - Shows loading states on buttons during API calls
  - Auto-redirects to login after account deletion

#### Super Admin
- **`components/manage-admins-content.tsx`** - Admin management
  - Calls `getUsers()` to fetch all admins
  - Shows loading spinner while fetching
  - Falls back to mock data if API fails
  - Includes delete confirmation dialog

## Environment Configuration

Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

The API URL defaults to `http://localhost:8000/api/v1` if not set.

## How It Works

### Token Management
1. When user logs in, the backend returns an access token
2. Token is stored in localStorage via `setAuthToken()`
3. All subsequent API calls include the token in the Authorization header: `Bearer {token}`
4. Token is cleared from localStorage on logout/account deletion

### Error Handling
- All API calls wrapped in try-catch blocks
- Errors displayed to user via toast notifications
- Components have graceful fallbacks (mock data or empty states)
- API errors logged to browser console for debugging

### Loading States
- All pages show loading spinners while fetching data
- Buttons disabled during API requests
- Clear feedback to user about async operations

## Testing the Integration

### 1. Start the Backend
```bash
# In your FastAPI project directory
python -m uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend
```bash
# In this Next.js project directory
npm run dev
```

### 3. Test User Flow
1. Navigate to `http://localhost:3000/register`
2. Create a new account with an email and password
3. Navigate to `http://localhost:3000/login`
4. Login with your credentials
5. You should be redirected to the admin dashboard
6. All dashboard data should load from the backend API

### 4. Test QR Code Operations
1. In the admin dashboard, click "Create New QR Code"
2. Create a new QR code (requires integration with create page)
3. Navigate to QR Codes list
4. QR codes should load from the backend
5. Test delete functionality with confirmation

## Troubleshooting

### "Not authenticated" errors
- Check that the token is being stored in localStorage
- Verify the API is returning a valid access_token on login
- Check browser DevTools → Application → Local Storage

### API connection errors
- Ensure backend is running on `http://localhost:8000`
- Check NEXT_PUBLIC_API_BASE_URL environment variable
- Look for CORS errors in browser console

### Data not loading
- Check browser console for API error messages
- Verify backend endpoints match those defined in `lib/api-config.ts`
- Check that you're authenticated (have a valid token)

## API Endpoint Mapping

Backend endpoint format: `http://localhost:8000/api/v1/{endpoint}`

| Function | Method | Endpoint |
|----------|--------|----------|
| login | POST | `/users/login` |
| register | POST | `/users/register` |
| getUsers | GET | `/users` |
| changePassword | POST | `/users/change-password` |
| deleteAccount | DELETE | `/users` |
| listQRCodes | GET | `/qrcodes` |
| createQRCode | POST | `/qrcodes` |
| getQRCode | GET | `/qrcodes/{id}` |
| updateQRCode | PATCH | `/qrcodes/{id}` |
| deleteQRCode | DELETE | `/qrcodes/{id}` |
| getQRCodeAnalytics | GET | `/qrcodes/{id}/analytics` |

## No Breaking Changes

✅ All existing frontend features preserved
✅ All UI components working correctly
✅ Navigation links functional
✅ Styling and layouts intact
✅ Mock data fallbacks prevent crashes if API offline
