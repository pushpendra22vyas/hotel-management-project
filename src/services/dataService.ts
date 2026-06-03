import { storage } from '@/utils/storage';
import { rooms as defaultRooms } from '@/data/rooms';
import { users as defaultUsers } from '@/data/users';
import { bookings as defaultBookings } from '@/data/bookings';
import { revenueData as defaultRevenue } from '@/data/revenue';
import { payments as defaultPayments } from '@/data/payments';

export const initializeData = () => {
  // Initialize rooms if not exists
  if (!localStorage.getItem('rooms')) {
    storage.set('rooms', defaultRooms);
  }

  // Initialize users if not exists
  if (!localStorage.getItem('users')) {
    storage.set('users', defaultUsers);
  }

  // Initialize bookings if not exists
  if (!localStorage.getItem('bookings')) {
    storage.set('bookings', defaultBookings);
  }

  // Initialize revenue if not exists
  if (!localStorage.getItem('revenue')) {
    storage.set('revenue', defaultRevenue);
  }

  // Initialize payments if not exists
  if (!localStorage.getItem('payments')) {
    storage.set('payments', defaultPayments);
  }
};

export const resetData = () => {
  storage.set('rooms', defaultRooms);
  storage.set('users', defaultUsers);
  storage.set('bookings', defaultBookings);
  storage.set('revenue', defaultRevenue);
  storage.set('payments', defaultPayments);
  
  // Remove current user session
  storage.remove('currentUser');
  
  alert('All data has been reset to defaults. Please login again.');
  window.location.href = '/';
};
