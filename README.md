# Luxury Stay - Hotel Management System

A modern, production-quality Hotel Management System built with React.js, TypeScript, Tailwind CSS, and Shadcn/UI. This is a frontend-only application with local state management and localStorage persistence, ready for deployment on Vercel.

## 🌟 Features

### Multi-Role System
- **Admin**: Complete control over rooms, bookings, users, and reports
- **Receptionist**: Handle check-ins, check-outs, and payment management
- **Customer**: Browse rooms, make bookings, and manage profiles

### Public Pages
- Home page with hero banner and hotel overview
- About page with facilities and gallery
- Rooms catalog with filters
- Contact page with form

### Admin Module
- Dashboard with analytics and charts
- Room management (Add/Edit/Delete/Status)
- Booking management with status updates
- User management
- Revenue and occupancy reports

### Receptionist Module
- Quick dashboard for daily operations
- Check-in processing
- Check-out processing with invoice
- Payment tracking

### Customer Module
- Personal dashboard
- Room booking with real-time availability
- Booking history
- Profile management

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI (custom implementation)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: localStorage

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Setup Steps

1. **Extract or navigate to the project folder**
   ```bash
   cd luxury-stay-hotel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:5173`

## 🔑 Demo Login Credentials

### Admin Access
- **Email**: admin@hotel.com
- **Password**: admin123

### Receptionist Access
- **Email**: reception@hotel.com
- **Password**: reception123

### Customer Access
- **Email**: customer@hotel.com
- **Password**: customer123

## 🏗️ Project Structure

```
luxury-stay-hotel/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI components (Button, Card, Dialog, etc.)
│   │   └── shared/       # Shared components (Navbar, Footer, Sidebar)
│   ├── contexts/         # React contexts (Auth, Theme)
│   ├── data/             # Mock data (rooms, users, bookings)
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   │   ├── admin/       # Admin pages
│   │   ├── receptionist/ # Receptionist pages
│   │   └── customer/    # Customer pages
│   ├── routes/          # Routing configuration
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## 🎨 Features in Detail

### Dark/Light Mode
- Toggle between themes
- Persisted in localStorage
- Fully responsive design

### Data Management
- 30 hotel rooms with realistic data
- 50+ bookings with various statuses
- 20+ customers and 5 staff members
- 12 months of revenue data

### Room Types & Pricing
- Standard Room: ₹2,500/night
- Deluxe Room: ₹4,500/night
- Executive Room: ₹7,000/night
- Suite Room: ₹12,000/night
- Family Room: ₹8,500/night

### Booking Statuses
- Pending
- Confirmed
- Checked-in
- Checked-out
- Cancelled

### Room Statuses
- Available
- Occupied
- Reserved
- Maintenance

## 📊 Dashboard Analytics

### Admin Dashboard
- Total rooms and availability
- Booking statistics
- Revenue trends (12 months)
- Occupancy charts
- Monthly booking trends

### Receptionist Dashboard
- Today's check-ins/check-outs
- Pending reservations
- Available rooms
- Quick action cards

### Customer Dashboard
- Booking history
- Active bookings
- Total spending
- Profile overview

## 🌐 Deployment to Vercel

### Quick Deploy

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   
   **Option A: Using Vercel CLI**
   ```bash
   vercel
   ```

   **Option B: Using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite
   - Click "Deploy"

### Manual Deployment Steps

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click "Deploy"

### Environment Variables
No environment variables required - all data is local.

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Adaptive layouts

## 🎯 Key Functionalities

### Admin
- ✅ Manage rooms (CRUD operations)
- ✅ View and update bookings
- ✅ Manage users
- ✅ Generate reports
- ✅ View analytics and charts

### Receptionist
- ✅ Process check-ins
- ✅ Process check-outs
- ✅ Track payments
- ✅ View daily operations

### Customer
- ✅ Browse available rooms
- ✅ Make new bookings
- ✅ View booking history
- ✅ Manage profile

## 🛡️ Security Notes

- Passwords are stored in plain text (for demo purposes only)
- In production, implement proper authentication
- Use environment variables for sensitive data
- Implement proper API security

## 🐛 Known Limitations

- Frontend only (no backend API)
- No real payment processing
- Data persists only in localStorage
- No email notifications
- No real-time updates

## 📝 Future Enhancements

- Add backend API integration
- Implement real payment gateway
- Add email notifications
- Add real-time booking updates
- Implement advanced search and filters
- Add customer reviews and ratings
- Multi-language support
- Export reports to PDF/Excel

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 💡 Tips

1. Clear localStorage if you encounter data issues:
   ```javascript
   localStorage.clear()
   ```

2. Use Chrome DevTools to inspect localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Click on Local Storage

3. Modify mock data in `src/data/` folder to customize

## 📞 Support

For issues and questions:
- Check the code comments
- Review the TypeScript types
- Inspect component props

## 🎉 Credits

- Images from Unsplash
- Icons from Lucide React
- UI inspiration from Shadcn/UI

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
