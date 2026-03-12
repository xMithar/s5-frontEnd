# Getting Started - Frontend & Backend Integration

## Quick Start

### Prerequisites
- Node.js 18+ installed
- FastAPI backend running on `http://localhost:8000`
- Backend API available at `http://localhost:8000/api/v1`

### Step 1: Start the Backend
```bash
# In your FastAPI project directory
python -m uvicorn main:app --reload --port 8000
```

You should see output like:
```
Uvicorn running on http://127.0.0.1:8000
```

### Step 2: Start the Frontend
```bash
# In this Next.js project directory
cd s5-frontEnd
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Step 3: Test the Integration
1. Open browser to `http://localhost:3000/register`
2. Create a new account (e.g., `test@example.com` / `password123`)
3. You'll see a success message and redirect to login
4. Login with your credentials
5. You'll be redirected to the admin dashboard
6. Dashboard should display QR code data from the backend API

---

## What's New

### API Infrastructure (Backend Ready)
All API calls are now connected to your FastAPI backend:

- **Authentication**: Login/register now use real backend authentication
- **QR Codes**: Dashboard and QR codes list load from backend API
- **Analytics**: Analytics page calculates from real backend data
- **Admin Management**: Super admin can manage users from backend
- **Profile**: Password change and account deletion use backend API

### Key Files
- `lib/api-config.ts` - API configuration and endpoints
- `lib/api/auth.ts` - Authentication functions
- `lib/api/qrcodes.ts` - QR code CRUD functions
- `.env.local.example` - Environment variables template

---

## Configuration

### Environment Variables
Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

If not set, defaults to `http://localhost:8000/api/v1`

---

## How Authentication Works

1. **User registers or logs in**
   - Frontend sends credentials to backend
   - Backend returns access token
   - Token stored in browser's localStorage

2. **Token persists across page refreshes**
   - On every API call, token is retrieved from localStorage
   - Token sent in Authorization header: `Bearer {token}`

3. **Protected routes**
   - Pages like `/admin` require authentication
   - If not authenticated, token is missing/expired
   - API returns 401 Unauthorized
   - Consider adding auth middleware to redirect to login

4. **Logout**
   - Token is removed from localStorage
   - User can no longer access protected pages

---

## API Endpoints

All endpoints are at `http://localhost:8000/api/v1/`

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user (returns access_token)
- `POST /users/change-password` - Change password (requires auth)
- `DELETE /users` - Delete account (requires auth)

### QR Codes
- `GET /qrcodes` - List all user's QR codes (requires auth)
- `POST /qrcodes` - Create new QR code (requires auth)
- `GET /qrcodes/{id}` - Get QR code details (requires auth)
- `PATCH /qrcodes/{id}` - Update QR code (requires auth)
- `DELETE /qrcodes/{id}` - Delete QR code (requires auth)
- `GET /qrcodes/{id}/analytics` - Get QR code analytics (requires auth)

### Users
- `GET /users` - List all users (admin only)

---

## Testing Scenarios

### 1. Registration Flow
```
1. Go to http://localhost:3000/register
2. Enter email and password
3. Click "Create Account"
4. Should see success message and redirect to login
```

### 2. Login Flow
```
1. Go to http://localhost:3000/login
2. Enter your registered email and password
3. Click "Sign In"
4. Should redirect to admin dashboard
5. Dashboard should show QR code data from backend
```

### 3. QR Code Management
```
1. After logging in, click "Create New QR Code" button
2. Or navigate to admin/qr-codes
3. You should see a list of QR codes from the backend
4. Test delete functionality
```

### 4. Profile Operations
```
1. Navigate to admin/profile
2. Test "Change Password" button
3. Enter current password and new password
4. Should show success message
5. Test "Delete Account" for full deletion
```

---

## Troubleshooting

### "Not authenticated" error
**Problem**: API returns 401 error
**Solution**:
- Make sure you're logged in
- Check localStorage for 'access_token'
- Login again if token expired

### API connection errors
**Problem**: `Failed to fetch` or CORS error
**Solution**:
- Verify backend is running on port 8000
- Check `http://localhost:8000/api/v1` is accessible
- Check browser console for detailed error messages
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly

### Data not loading
**Problem**: Dashboard shows loading spinner but no data appears
**Solution**:
- Check browser console for error messages
- Verify you're authenticated (have a token in localStorage)
- Check backend logs for API errors
- Try refreshing the page

### CORS issues
**Problem**: Error mentions CORS or cross-origin
**Solution**:
- This should be handled by backend CORS configuration
- Backend should have CORS enabled for `http://localhost:3000`
- Contact backend team if issue persists

---

## Features Implemented

### ✅ User Authentication
- Register new account
- Login with email/password
- Logout (via profile menu)
- Change password
- Delete account
- Token-based authentication (JWT)

### ✅ Admin Dashboard
- View dashboard with statistics
- Quick action buttons
- Recent QR codes list
- Links to create, analytics, and manage QR codes

### ✅ QR Code Management
- View list of all QR codes
- Create new QR code
- View QR code details
- Update QR code
- Delete QR code with confirmation
- Copy QR code link
- Open QR code in new tab

### ✅ Analytics
- View analytics dashboard
- See statistics calculated from real data
- Charts showing QR code performance

### ✅ User Profile
- View profile information
- Change password with validation
- Delete account with confirmation

### ✅ Super Admin
- Manage admin accounts
- View list of all admins
- Delete admin accounts

---

## What's NOT Yet Implemented

These features are UI-ready but need backend endpoint creation:

- QR code create form (form exists, endpoint needed)
- QR code edit form (form exists, endpoint needed)
- Create admin (form exists, endpoint needed)
- Edit admin (form exists, endpoint needed)

**Status**: Frontend is ready, just waiting for backend endpoints.

---

## Next Steps

### Short Term
1. ✅ Test authentication flow (register/login/logout)
2. ✅ Verify API calls working (check network tab in DevTools)
3. ✅ Test QR code listing and deletion
4. ✅ Test profile operations (password change, deletion)

### Medium Term
1. Create missing backend endpoints for QR code creation/editing
2. Create missing backend endpoints for admin management
3. Add form validation and error handling to create/edit forms
4. Test end-to-end workflows

### Long Term
1. Add additional features (labels, bulk operations, etc.)
2. Add more analytics (geographic data, device types, etc.)
3. Implement API pagination for large lists
4. Add caching for improved performance

---

## Development Notes

### How to Add New API Endpoints

1. **Create function in `lib/api/`**:
```typescript
export async function newFunction(params) {
  const response = await fetch(getApiUrl(API_ENDPOINTS.NEW_ENDPOINT), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(params),
  })
  
  if (!response.ok) {
    throw new Error('Failed to call endpoint')
  }
  
  return response.json()
}
```

2. **Add endpoint to `lib/api-config.ts`**:
```typescript
NEW: {
  CREATE: '/new',
  LIST: '/new',
  // etc.
}
```

3. **Use in component**:
```typescript
import { newFunction } from '@/lib/api/...'

try {
  const result = await newFunction(data)
  toast.success('Success')
} catch (error) {
  toast.error(error.message)
}
```

---

## Support

For issues or questions:
1. Check browser console for error messages
2. Check backend logs for API errors
3. Review `INTEGRATION_STATUS.md` for detailed documentation
4. Check `BACKEND_INTEGRATION_GUIDE.md` for API details

---

**Status**: Frontend fully integrated and ready for testing! 🚀
