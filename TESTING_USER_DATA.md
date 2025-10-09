# Testing Guide - User Data Management

## Quick Test Checklist

### 1. Test Registration Flow
Open browser console (F12) and follow these steps:

```bash
# Step 1: Go to registration page
Navigate to: http://localhost:5173/register

# Step 2: Fill the form with test data
Name: Test User
Email: testuser@example.com
Password: Test123!
Confirm Password: Test123!
Address: Test Address

# Step 3: Submit and watch console
You should see:
✓ "Sending user data: {name, email, password...}"
✓ "Backend response: {success: true, user: {...}}"
✓ Login attempt after registration
✓ "User data refreshed: {id: X, name: ...}"

# Step 4: Check localStorage
localStorage.getItem('pawhaven_user')
// Should show: {"id":X,"name":"Test User","email":"testuser@example.com"...}

# Step 5: Check AuthContext
// In console:
JSON.parse(localStorage.getItem('pawhaven_user'))
// Should show complete user with NUMERIC id
```

### 2. Test Login Flow

```bash
# Step 1: Go to login page
Navigate to: http://localhost:5173/login

# Step 2: Login with existing user
Email: ahmed@example.com
Password: password123

# Step 3: Watch browser console
You should see:
✓ Login attempt for backend
✓ Response with user data
✓ "Welcome back, Ahmed Khan! 🐾"

# Step 4: Verify user data in console
const user = JSON.parse(localStorage.getItem('pawhaven_user'));
console.log(user);

Expected output:
{
  "id": 2,                    ← NUMERIC ID (important!)
  "name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "role": "USER",
  "address": "45 Green Road, Chittagong",
  "profileImage": "profile2.png",
  "isActive": true,
  "createdAt": "2025-10-08T07:10:45",
  "updatedAt": "2025-10-08T07:10:45"
}
```

### 3. Test Donation with User Data

```bash
# Step 1: Make sure you're logged in
Check console: JSON.parse(localStorage.getItem('pawhaven_user'))
Should have: id, name, email

# Step 2: Go to donate page
Navigate to: http://localhost:5173/donate

# Step 3: Fill donation form
Amount: 100
Select Payment Method: Credit Card

# Step 4: Click "Donate Now"
Watch Network tab (F12 → Network):
- Should see POST to /api/payments
- Payload should include: user: { id: 2, email: "...", name: "..." }
- Response should be 200 OK

# Step 5: Check console
Should see:
✓ "Donation successful!"
✓ No errors about user.id being undefined
✓ No errors about string vs number ID
```

### 4. Test Adoption Application

```bash
# Step 1: Make sure logged in with backend user
Check: localStorage.getItem('pawhaven_user')
Should have numeric id (not string uid)

# Step 2: Go to a pet detail page
Navigate to: http://localhost:5173/pet/[some-pet-id]

# Step 3: Click "Apply for Adoption"

# Step 4: Fill adoption form
Application Reason: "I love this pet"
Living Situation: "House with garden"
Experience: "5 years"
Has Other Pets: Yes

# Step 5: Submit and watch Network tab
POST to /api/adoption-applications
Payload should include:
- user: { id: 2, email: "...", name: "..." }
- pet: { id: X }
- applicationReason, livingSituation, etc.

Response: 200 OK with success message
```

## Debug Commands

### Check if Backend is Running
```bash
curl http://localhost:8080/api/users
# Should return array of users
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ahmed@example.com","password":"password123"}'

# Expected response:
# {
#   "message": "Login successful",
#   "success": true,
#   "user": { "id": 2, "name": "Ahmed Khan", ... }
# }
```

### Check User Data in Browser Console
```javascript
// Get stored user
const user = JSON.parse(localStorage.getItem('pawhaven_user'));

// Verify user has numeric ID
console.log('User ID type:', typeof user.id);  // Should be "number"
console.log('User ID value:', user.id);        // Should be like: 2, 5, 7 (not string)

// Verify all required fields
console.log('Has email:', !!user.email);       // Should be true
console.log('Has name:', !!user.name);         // Should be true
console.log('Has role:', !!user.role);         // Should be true
console.log('Is active:', user.isActive);      // Should be true
```

## Common Issues & Solutions

### Issue 1: User ID is Undefined
**Symptom:** Donation/Adoption form shows error "Please log in"
**Solution:** 
1. Clear localStorage: `localStorage.clear()`
2. Logout and login again
3. Check if backend is running
4. Verify login endpoint returns user data

### Issue 2: User ID is String (Firebase UID)
**Symptom:** Backend returns 400/500 error when submitting forms
**Solution:**
1. Logout from Firebase
2. Login with backend credentials (not Google)
3. Check localStorage - should have numeric id
4. If still string, clear storage and re-login

### Issue 3: Registration Doesn't Store User
**Symptom:** After registration, user data missing from localStorage
**Solution:**
1. Check backend is running on port 8080
2. Check Network tab - should see POST to /api/users/login after registration
3. Verify registration endpoint returns success
4. Check console for any errors

### Issue 4: User Data Not Persisting
**Symptom:** After page refresh, user is logged out
**Solution:**
1. Check AuthProvider useEffect - should load from localStorage
2. Verify localStorage has 'pawhaven_user' and 'pawhaven_token'
3. Check browser storage settings (not in incognito mode)

## Success Indicators

✅ **Registration Works** when:
- Console shows: "User data refreshed: {id: number, name: ...}"
- localStorage has 'pawhaven_user' with numeric id
- Redirected to dashboard automatically
- Can make donations immediately

✅ **Login Works** when:
- Console shows user data with numeric id
- localStorage updated with complete user info
- AuthContext user state has all fields
- Navigation works to requested page

✅ **Activities Work** when:
- Donation submits without errors
- Adoption application submits successfully
- Network requests show proper user ID in payload
- Backend responds with 200 OK

## Test Users Available

| Email | Password | Role | Use Case |
|-------|----------|------|----------|
| ahmed@example.com | password123 | USER | General testing |
| mim@example.com | mim2025 | USER | Donations, adoptions |
| tom2022@gmail.com | Aa1!aa | USER | Multiple activities |
| taw2022@gmail.com | Aa1!aa | ADMIN | Admin features |

## Final Verification

After completing all tests, verify:
1. ✅ Registration automatically logs user in with DB data
2. ✅ Login stores complete user data with numeric ID
3. ✅ Donations use proper user ID and email
4. ✅ Adoptions use proper user ID
5. ✅ User data persists after page refresh
6. ✅ Logout clears all user data properly
7. ✅ Re-login restores full functionality

If all checkboxes are ✅, the authentication and user data management is working correctly! 🎉
