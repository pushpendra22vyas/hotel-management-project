# Deployment Guide - Luxury Stay Hotel Management System

This guide will help you deploy the Luxury Stay Hotel Management System to Vercel.

## Prerequisites

- Git installed on your machine
- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier works perfectly)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git Repository

1. Initialize git (if not already done):
   ```bash
   cd luxury-stay-hotel
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete
7. Your app will be live at: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd luxury-stay-hotel
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **luxury-stay-hotel**
- In which directory is your code located? **./**
- Want to override settings? **N**

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Method 3: Manual Build and Deploy

### Step 1: Build the Project

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### Step 2: Deploy the dist folder

Upload the contents of the `dist` folder to any static hosting service:
- Netlify
- GitHub Pages
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables

This project doesn't require environment variables as it's frontend-only with local storage.

If you add a backend in the future:
1. Go to Vercel project settings
2. Navigate to Environment Variables
3. Add your variables (e.g., `VITE_API_URL`)

## Vercel Configuration

The project includes a `vercel.json` file that ensures proper routing for the SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures that all routes work correctly when users refresh or directly access URLs.

## Testing Your Deployment

After deployment, test these scenarios:

1. **Home Page**: Visit the root URL
2. **Direct Routes**: Try accessing `/about`, `/rooms`, `/contact` directly
3. **Login**: Test all three user roles:
   - Admin: admin@hotel.com / admin123
   - Receptionist: reception@hotel.com / reception123
   - Customer: customer@hotel.com / customer123
4. **Dark Mode**: Toggle and refresh to ensure persistence
5. **Booking Flow**: Create a test booking as a customer
6. **Mobile View**: Test on mobile devices

## Troubleshooting

### Build Fails

**Error**: Module not found
- **Solution**: Run `npm install` locally and ensure all dependencies are in `package.json`

**Error**: TypeScript errors
- **Solution**: Run `npm run build` locally to catch errors before deployment

### Routes Not Working

**Problem**: 404 errors on page refresh
- **Solution**: Ensure `vercel.json` is present in the root directory

### Dark Mode Not Persisting

**Problem**: Theme resets on refresh
- **Solution**: Check browser's localStorage is enabled

### Data Not Saving

**Problem**: Bookings or changes don't persist
- **Solution**: 
  - Check localStorage is enabled in browser
  - Clear localStorage and refresh: `localStorage.clear()`
  - Ensure data initialization runs: Check browser console

## Performance Optimization

### Already Implemented

✅ Code splitting with React Router
✅ Optimized images (using Unsplash CDN)
✅ Minimal bundle size
✅ Tree shaking enabled
✅ Production build optimization

### Additional Optimizations (Optional)

1. **Enable Vercel Analytics**:
   - Go to project dashboard
   - Enable Analytics in settings

2. **Add Caching Headers**:
   Create `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

## Monitoring

### Vercel Dashboard

Monitor your deployment:
- Real-time logs
- Build history
- Analytics (if enabled)
- Error tracking

### Browser Console

Check for errors:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

## Updating Your Deployment

### Automatic Updates (Recommended)

When using Git integration:
1. Make changes locally
2. Commit and push to your repository
3. Vercel automatically rebuilds and deploys

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Updates

Using Vercel CLI:
```bash
vercel --prod
```

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## Best Practices

1. ✅ Test locally before deploying: `npm run build && npm run preview`
2. ✅ Keep dependencies updated: `npm update`
3. ✅ Monitor build times and bundle size
4. ✅ Test on multiple browsers and devices
5. ✅ Enable HTTPS (automatic on Vercel)

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/

## Security Checklist

- ✅ No sensitive data in code
- ✅ HTTPS enabled
- ✅ CSP headers (optional)
- ⚠️ Note: Demo credentials are in code (remove for production)

## Cost

- **Vercel Free Tier**: Perfect for this project
  - 100 GB bandwidth/month
  - Unlimited websites
  - Automatic SSL
  - Global CDN

## Success!

Once deployed, share your live URL:
- `https://your-project.vercel.app`
- Or your custom domain

Test all features and enjoy your deployed Hotel Management System! 🎉
