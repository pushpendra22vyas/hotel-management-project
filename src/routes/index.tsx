import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Rooms } from '@/pages/Rooms';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';

import { AdminDashboard } from '@/pages/admin/Dashboard';
import { RoomManagement } from '@/pages/admin/RoomManagement';
import { BookingManagement } from '@/pages/admin/BookingManagement';
import { UserManagement } from '@/pages/admin/UserManagement';
import { Reports } from '@/pages/admin/Reports';

import { ReceptionistDashboard } from '@/pages/receptionist/Dashboard';
import { CheckIn } from '@/pages/receptionist/CheckIn';
import { CheckOut } from '@/pages/receptionist/CheckOut';
import { Payments } from '@/pages/receptionist/Payments';

import { CustomerDashboard } from '@/pages/customer/Dashboard';
import { BookRoom } from '@/pages/customer/BookRoom';
import { MyBookings } from '@/pages/customer/MyBookings';
import { Profile } from '@/pages/customer/Profile';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        <Route element={
          <ProtectedRoute allowedRoles={['receptionist']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/check-in" element={<CheckIn />} />
          <Route path="/receptionist/check-out" element={<CheckOut />} />
          <Route path="/receptionist/payments" element={<Payments />} />
        </Route>

        <Route element={
          <ProtectedRoute allowedRoles={['customer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<BookRoom />} />
          <Route path="/customer/bookings" element={<MyBookings />} />
          <Route path="/customer/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
