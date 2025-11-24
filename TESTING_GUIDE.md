# Clarity Testing Guide

This guide helps you test all features of Clarity to ensure everything works correctly.

## Pre-Testing Checklist

- [ ] Development server is running (`npm run dev`)
- [ ] Database is connected and migrated
- [ ] All environment variables are set
- [ ] You have a test audio file ready (1-2 minutes recommended)

## Test Scenarios

### 1. Landing Page

**Test:** Visit http://localhost:3000

**Expected Results:**
- [ ] Page loads without errors
- [ ] "Clarity" branding is visible
- [ ] "Get Started" button is present
- [ ] Features section displays correctly
- [ ] No console errors (F12)

### 2. Authentication Flow

**Test:** Sign in with Google

**Steps:**
1. Click "Get Started" or "Sign Up Now"
2. Click "Continue with Google"
3. Select your Google account
4. Grant permissions

**Expected Results:**
- [ ] Redirected to Google OAuth page
- [ ] Successfully authenticates
- [ ] Redirected to `/dashboard`
- [ ] User avatar appears in header
- [ ] User name/email visible in dropdown

**Common Issues:**
- "Invalid client" → Check Google OAuth redirect URI
- "Unauthorized" → Check NEXTAUTH_SECRET is set

### 3. Dashboard

**Test:** View dashboard after login

**Expected Results:**
- [ ] Dashboard page loads
- [ ] Header shows user avatar
- [ ] "Upload Meeting" button is visible
- [ ] Empty state shows "No meetings yet" (if first time)
- [ ] Navigation works (Dashboard, Settings links)

### 4. File Upload

**Test:** Upload a meeting recording

**Steps:**
1. Click "Upload Meeting"
2. Select an audio file (MP3, M4A, WebM, or WAV)
3. Wait for processing

**Expected Results:**
- [ ] File picker opens
- [ ] File uploads successfully
- [ ] "Processing..." state shows with spinner
- [ ] No errors in console
- [ ] Processing completes (may take 30s-2min)
- [ ] Redirected to meeting details page

**Test Files:**
- Use a 1-2 minute audio file for first test
- Try different formats: MP3, M4A, WebM
- Test with clear speech for best results

**Common Issues:**
- "Invalid file type" → Use supported audio formats
- Timeout → File may be too large, try smaller file
- API error → Check OpenAI API key and credits

### 5. Meeting Processing

**Test:** Verify AI processing works

**Expected Results:**
- [ ] Transcription is accurate
- [ ] Decisions are extracted (if any in audio)
- [ ] Action items are extracted (if any in audio)
- [ ] JSON structure is correct
- [ ] Data is saved to database

**Sample Test Audio:**
Create a short recording saying:
> "In today's meeting, we decided to launch the new feature next week. John will prepare the documentation by Friday. Sarah will review the code by Thursday. We also decided to increase the marketing budget."

**Expected Extraction:**
- Decisions: "Launch new feature next week", "Increase marketing budget"
- Action Items: 
  - Task: "Prepare documentation", Assignee: "John"
  - Task: "Review code", Assignee: "Sarah"

### 6. Meeting Details Page

**Test:** View processed meeting

**Expected Results:**
- [ ] Meeting title displays
- [ ] Date and filename show correctly
- [ ] Full transcript is visible and readable
- [ ] Decisions section shows extracted decisions
- [ ] Action items section shows tasks and assignees
- [ ] Layout is responsive (try resizing window)
- [ ] Icons display correctly

### 7. Meeting List

**Test:** Return to dashboard

**Steps:**
1. Click "Dashboard" in header
2. View meeting list

**Expected Results:**
- [ ] Uploaded meeting appears in list
- [ ] Meeting card shows title, date, preview
- [ ] Action item count is correct
- [ ] Decision count is correct
- [ ] Clicking card navigates to details page

### 8. Settings Page

**Test:** View settings

**Steps:**
1. Click user avatar
2. Click "Settings"

**Expected Results:**
- [ ] Settings page loads
- [ ] Profile section shows user info
- [ ] Avatar displays correctly
- [ ] Integration cards show "Coming Soon"
- [ ] All sections render properly

### 9. User Menu

**Test:** User dropdown menu

**Steps:**
1. Click user avatar in header

**Expected Results:**
- [ ] Dropdown opens
- [ ] Shows user name and email
- [ ] "Settings" link works
- [ ] "Sign out" button present

### 10. Sign Out

**Test:** Sign out functionality

**Steps:**
1. Click user avatar
2. Click "Sign out"

**Expected Results:**
- [ ] User is signed out
- [ ] Redirected to landing page
- [ ] Cannot access `/dashboard` without signing in
- [ ] Can sign in again successfully

### 11. Protected Routes

**Test:** Route protection

**Steps:**
1. Sign out
2. Try to visit `/dashboard` directly
3. Try to visit `/settings` directly
4. Try to visit `/meeting/[any-id]` directly

**Expected Results:**
- [ ] All protected routes redirect to `/login`
- [ ] After signing in, can access all routes
- [ ] Cannot view other users' meetings

### 12. Error Handling

**Test:** Error scenarios

**Test Cases:**
1. Upload invalid file type (e.g., .txt, .pdf)
2. Upload very large file (>25MB)
3. Try to access non-existent meeting ID

**Expected Results:**
- [ ] Appropriate error messages display
- [ ] App doesn't crash
- [ ] User can recover from errors
- [ ] Errors are logged to console

### 13. Responsive Design

**Test:** Mobile/tablet views

**Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Test on different screen sizes

**Expected Results:**
- [ ] Layout adapts to mobile screens
- [ ] All buttons are clickable
- [ ] Text is readable
- [ ] No horizontal scrolling
- [ ] Navigation works on mobile

### 14. Database Persistence

**Test:** Data persistence

**Steps:**
1. Upload a meeting
2. Sign out
3. Sign in again
4. Check dashboard

**Expected Results:**
- [ ] Meeting is still there
- [ ] All data is intact
- [ ] Can view meeting details

**Verify in Prisma Studio:**
```bash
npx prisma studio
```
- [ ] User record exists
- [ ] Meeting record exists
- [ ] Relationships are correct

### 15. Multiple Meetings

**Test:** Upload multiple meetings

**Steps:**
1. Upload 2-3 different audio files
2. View dashboard

**Expected Results:**
- [ ] All meetings appear in list
- [ ] Sorted by date (newest first)
- [ ] Each has correct data
- [ ] Can view each individually

## Performance Testing

### Load Time
- [ ] Landing page loads in <2s
- [ ] Dashboard loads in <3s
- [ ] Meeting details loads in <3s

### Processing Time
- [ ] 1-minute audio: ~30-60 seconds
- [ ] 5-minute audio: ~1-2 minutes
- [ ] 10-minute audio: ~2-4 minutes

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

## API Testing

### Check API Responses

**Test `/api/meetings/process`:**

```bash
# Should return 401 without auth
curl http://localhost:3000/api/meetings/process
```

## Database Testing

**Verify schema:**
```bash
npx prisma studio
```

Check:
- [ ] User table has records
- [ ] Meeting table has records
- [ ] Account table has Google OAuth data
- [ ] Session table has active sessions
- [ ] Relationships work correctly

## Security Testing

- [ ] Cannot access API without authentication
- [ ] Cannot view other users' meetings
- [ ] Environment variables not exposed in client
- [ ] CSRF protection works (NextAuth handles this)

## Final Checklist

Before considering testing complete:
- [ ] All 15 test scenarios pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Database has correct data
- [ ] Can complete full user flow end-to-end
- [ ] Performance is acceptable
- [ ] Works in multiple browsers

## Reporting Issues

If you find bugs:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Check server terminal for errors
4. Note your environment (OS, Node version, browser)
5. Check if issue persists after `npm install` and restart

## Success Criteria

✅ **Testing is complete when:**
- All test scenarios pass
- No critical bugs found
- User flow works smoothly
- Performance is acceptable
- Ready for deployment

## Next Steps

After successful testing:
1. Review `DEPLOYMENT_CHECKLIST.md`
2. Prepare for production deployment
3. Set up monitoring
4. Plan for user feedback collection

