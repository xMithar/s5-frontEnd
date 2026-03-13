# API Integration Fixes

## Issues Fixed

### 1. Create QR Code Not Working
**Problem**: The "Save QR Code" button had no onClick handler and wasn't calling the API.

**Solution**:
- Added `createQRCode()` API import from `/lib/api/qrcodes`
- Created `handleCreateQRCode()` function that:
  - Validates URL input before submission
  - Calls `createQRCode()` API with form data (destination_url, color, shape, is_dynamic)
  - Shows loading state while creating
  - Redirects to QR codes list on success
  - Shows error toast on failure
- Connected the "Save QR Code" button to the handler
- Added loading state UI with spinner and disabled button

**Modified Files**: `/vercel/share/v0-project/components/create-qr-content.tsx`

### 2. Admin Profile Page Not Loading User Data
**Problem**: Profile page showed hardcoded mock data instead of fetching actual user information from the backend.

**Solution**:
- Added `useEffect` hook to fetch user data on component mount
- Calls `getUsers()` API to fetch the current user's data
- Maps API response to profile form:
  - `email` from user.email
  - `name` from email username (before @)
  - `phone` from user.phone_number
  - `location` left empty (not in API response)
- Shows loading spinner while fetching data
- Falls back gracefully if API call fails
- Updates both profileData and editData state

**Modified Files**: `/vercel/share/v0-project/app/admin/profile/page.tsx`

## API Endpoints Used

### Create QR Code
```
POST /api/v1/qrcodes/
Body: {
  destination_url: string,
  color: string (hex),
  shape: "square" | "rounded",
  is_dynamic: boolean
}
```

### Get User Profile
```
GET /api/v1/users/
Response: Array of user objects with email, phone_number, etc.
```

## Testing

1. **Create QR Code**:
   - Go to /admin/create
   - Fill in URL, customize colors if desired
   - Click "Save QR Code"
   - Should see loading spinner, then redirect to QR codes list

2. **Admin Profile**:
   - Go to /admin/profile
   - Should see loading spinner briefly
   - Profile should populate with actual user data from backend
   - Email and phone fields should match your registered account

## Status
✅ Both issues fixed and integrated with real API calls
