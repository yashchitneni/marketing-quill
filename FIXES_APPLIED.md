# LinkedIn OAuth Fixes Applied

## Issues Fixed:

### 1. LinkedIn OAuth Scope Error
- **Problem**: LinkedIn was returning "invalid_scope_error" 
- **Cause**: Using deprecated LinkedIn OAuth scopes (r_liteprofile, r_emailaddress)
- **Fix**: Updated to new LinkedIn OAuth 2.0 scopes:
  - `profile` (replaces r_liteprofile)
  - `email` (replaces r_emailaddress)
  - `w_member_social` (for posting)

### 2. LinkedIn API Endpoint Update
- **Problem**: Old profile endpoint would fail with new OAuth
- **Fix**: Updated from `/v2/people/~` to `/v2/userinfo` endpoint
- **Updated field mappings**:
  - `id` → `sub`
  - `firstName.localized.en_US` → `given_name`
  - `lastName.localized.en_US` → `family_name`

### 3. Database Issues
- **Problem**: Missing tables and columns
- **Fix**: Created comprehensive migration in `RUN_THIS_MIGRATION.sql`

## Files Changed:
1. `/app/api/auth/linkedin/route.ts` - Updated OAuth scopes
2. `/app/api/auth/linkedin/callback/route.ts` - Updated API endpoint and field mappings
3. `/RUN_THIS_MIGRATION.sql` - Complete database migration

## Next Steps:
1. Run the migration in Supabase SQL Editor
2. Ensure your LinkedIn app has the new scopes selected
3. Restart dev server and test LinkedIn connection

## Important Note:
Make sure your LinkedIn app is configured with the Product "Sign In with LinkedIn using OpenID Connect" to use the new scopes.