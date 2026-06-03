# 🚀 Quick Start Guide

Get up and running with Luxury Stay Hotel Management System in under 5 minutes!

## ⚡ Installation (2 minutes)

```bash
# Navigate to project folder
cd luxury-stay-hotel

# Install dependencies
npm install
```

## 🎮 Running the Application (1 minute)

```bash
# Start development server
npm run dev
```

Open your browser and navigate to: **http://localhost:5173**

## 🔑 Login Credentials

### Admin Dashboard
```
Email: admin@hotel.com
Password: admin123
```
**Access**: Complete system control, analytics, reports

### Receptionist Dashboard
```
Email: reception@hotel.com
Password: reception123
```
**Access**: Check-in/out, payments, daily operations

### Customer Portal
```
Email: customer@hotel.com
Password: customer123
```
**Access**: Browse rooms, make bookings, view history

## 📱 Quick Navigation

### Public Pages
- **Home**: http://localhost:5173/
- **About**: http://localhost:5173/about
- **Rooms**: http://localhost:5173/rooms
- **Contact**: http://localhost:5173/contact
- **Login**: http://localhost:5173/login

### Admin Routes (after login as admin)
- **Dashboard**: http://localhost:5173/admin
- **Rooms**: http://localhost:5173/admin/rooms
- **Bookings**: http://localhost:5173/admin/bookings
- **Users**: http://localhost:5173/admin/users
- **Reports**: http://localhost:5173/admin/reports

### Receptionist Routes (after login as receptionist)
- **Dashboard**: http://localhost:5173/receptionist
- **Check-in**: http://localhost:5173/receptionist/check-in
- **Check-out**: http://localhost:5173/receptionist/check-out
- **Payments**: http://localhost:5173/receptionist/payments

### Customer Routes (after login as customer)
- **Dashboard**: http://localhost:5173/customer
- **Book Room**: http://localhost:5173/customer/book
- **My Bookings**: http://localhost:5173/customer/bookings
- **Profile**: http://localhost:5173/customer/profile

## 🎯 Quick Test Scenarios

### Test Admin Features (5 min)
1. Login as admin
2. View dashboard analytics
3. Add a new room
4. Update a booking status
5. View reports

### Test Receptionist Features (3 min)
1. Login as receptionist
2. View today's check-ins
3. Process a check-in
4. View payment records

### Test Customer Features (3 min)
1. Login as customer
2. Browse available rooms
3. Make a test booking
4. View booking history

## 🎨 Toggle Dark Mode

Click the moon/sun icon in the top-right corner of the navbar to switch between dark and light themes.

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data Issues
Open browser console (F12) and run:
```javascript
// Reset all data to defaults
localStorage.clear()
// Refresh page
location.reload()
```

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deploy to Vercel (2 minutes)

### Option 1: Vercel Dashboard
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📚 Documentation

- **README.md** - Complete documentation
- **FEATURES.md** - Detailed feature list
- **DEPLOYMENT.md** - Deployment guide
- **PROJECT_SUMMARY.md** - Project overview

## 🆘 Need Help?

1. Check browser console for errors (F12)
2. Verify Node.js version (16+ required): `node -v`
3. Ensure all dependencies installed: `npm install`
4. Clear localStorage if data seems corrupted
5. Review error messages carefully

## ✅ Verification Checklist

- [ ] npm install completed successfully
- [ ] Dev server starts without errors
- [ ] Can access home page
- [ ] Can login with test credentials
- [ ] Dark mode toggle works
- [ ] Can navigate between pages
- [ ] Data persists after refresh

## 🎉 Success Indicators

You're all set if you can:
1. ✅ View the home page
2. ✅ Login with any demo account
3. ✅ See the dashboard
4. ✅ Create/view/edit data
5. ✅ Toggle dark mode
6. ✅ Navigate smoothly

---

## 💡 Pro Tips

1. **Use Chrome DevTools** - Inspect localStorage data in Application tab
2. **Test Responsiveness** - Use device toolbar (Ctrl+Shift+M)
3. **Check All Roles** - Test each user type's experience
4. **Clear Cache** - If issues persist, clear browser cache
5. **Mobile First** - Test on actual mobile devices

---

**Ready to explore? Start with the home page and login as any role!** 🎊

---

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Install | `npm install` |
| Dev Server | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Lint | `npm run lint` |
| Deploy | `vercel` |

| Page | URL |
|------|-----|
| Home | `/` |
| Login | `/login` |
| Admin | `/admin` |
| Reception | `/receptionist` |
| Customer | `/customer` |

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hotel.com | admin123 |
| Reception | reception@hotel.com | reception123 |
| Customer | customer@hotel.com | customer123 |

---

**Now you're ready to go! Happy coding! 🚀**
