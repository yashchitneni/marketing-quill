# LinkedIn App Setup Checklist

## Required LinkedIn Products

Your LinkedIn app must have these products added:

1. **Sign In with LinkedIn using OpenID Connect** (Required for new OAuth flow)
   - This enables the `profile` and `email` scopes
   - Go to Products tab → Request Access → Sign In with LinkedIn using OpenID Connect

2. **Share on LinkedIn** (Required for posting)
   - This enables the `w_member_social` scope
   - Go to Products tab → Request Access → Share on LinkedIn

## OAuth 2.0 Settings

1. **Authorized redirect URLs**:
   - Add: `http://localhost:3000/api/auth/linkedin/callback`
   - For production, add your production URL

2. **OAuth 2.0 scopes**:
   After adding the products above, these scopes should be available:
   - `profile` (from OpenID Connect product)
   - `email` (from OpenID Connect product)
   - `w_member_social` (from Share on LinkedIn product)

## Common Issues

### "Invalid scope" error
- You need to add the products mentioned above
- The old scopes (r_liteprofile, r_emailaddress) no longer work

### "Token exchange failed"
- Check that your Client ID and Client Secret are correct
- Ensure the redirect URI matches exactly (including http/https)
- Make sure the products are approved (can take a few minutes)

## Verification Steps

1. Go to https://www.linkedin.com/developers/apps
2. Select your app
3. Go to "Products" tab
4. Verify you have both products listed above
5. Go to "Auth" tab
6. Verify your OAuth 2.0 scopes include the three mentioned above
7. Verify your redirect URLs are correct

## Testing

After setup:
1. Clear your browser cookies for LinkedIn
2. Try the OAuth flow again
3. Check the server logs for detailed error messages