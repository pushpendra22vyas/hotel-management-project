export type UserRole = 'admin' | 'receptionist' | 'customer';

export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export type RoomType = 'Standard Room' | 'Deluxe Room' | 'Executive Room' | 'Suite Room' | 'Family Room';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: RoomType;
  price: number;
  capacity: number;
  status: RoomStatus;
  image: string;
  amenities: string[];
  description: string;
  floor: number;
}

export interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  createdAt: string;
  specialRequests?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
}

export interface Revenue {
  month: string;
  revenue: number;
  bookings: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
