import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { bookings as initialBookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { users } from '@/data/users';
import { Booking, BookingStatus } from '@/types';
import { storage } from '@/utils/storage';
import { formatDate } from '@/utils/date';

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(() => storage.get('bookings', initialBookings));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  const filteredBookings = bookings.filter(booking => {
    const room = rooms.find(r => r.id === booking.roomId);
    const customer = users.find(u => u.id === booking.customerId);
    
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room?.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<BookingStatus, any> = {
    pending: 'secondary',
    confirmed: 'default',
    'checked-in': 'success',
    'checked-out': 'outline',
    cancelled: 'destructive'
  };

  const handleStatusUpdate = (bookingId: string, newStatus: BookingStatus) => {
    const updated = bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    storage.set('bookings', updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by booking ID, customer, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label>Status Filter</Label>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const room = rooms.find(r => r.id === booking.roomId);
                const customer = users.find(u => u.id === booking.customerId);
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{customer?.name}</TableCell>
                    <TableCell>{room?.roomNumber}</TableCell>
                    <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                    <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
                    <TableCell>₹{booking.totalAmount}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[booking.status]} className="capitalize">
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={booking.status}
                        onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingStatus)}
                        className="h-8 text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked-in">Checked In</option>
                        <option value="checked-out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
