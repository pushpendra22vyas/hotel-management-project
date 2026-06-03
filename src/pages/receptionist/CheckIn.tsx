import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { bookings as initialBookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { users } from '@/data/users';
import { storage } from '@/utils/storage';
import { formatDate } from '@/utils/date';
import { Booking } from '@/types';

export function CheckIn() {
  const [bookings, setBookings] = useState<Booking[]>(() => storage.get('bookings', initialBookings));
  const [searchTerm, setSearchTerm] = useState('');

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const filteredBookings = confirmedBookings.filter(booking => {
    const customer = users.find(u => u.id === booking.customerId);
    const room = rooms.find(r => r.id === booking.roomId);
    
    return booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room?.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCheckIn = (bookingId: string, roomId: string) => {
    const updated = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'checked-in' as const } : b
    );
    setBookings(updated);
    storage.set('bookings', updated);

    const storedRooms = storage.get('rooms', rooms);
    const updatedRooms = storedRooms.map(r =>
      r.id === roomId ? { ...r, status: 'occupied' as const } : r
    );
    storage.set('rooms', updatedRooms);

    alert('Check-in completed successfully!');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Check-in</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Label>Search Bookings</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by booking ID, customer name, or room number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.map(booking => {
          const room = rooms.find(r => r.id === booking.roomId);
          const customer = users.find(u => u.id === booking.customerId);

          return (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Booking #{booking.id}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Check-in: {formatDate(booking.checkInDate)}
                    </p>
                  </div>
                  <Badge variant="default">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Guest Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Name:</span> {customer?.name}</p>
                      <p><span className="text-gray-500">Email:</span> {customer?.email}</p>
                      <p><span className="text-gray-500">Phone:</span> {customer?.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Room Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Room:</span> {room?.roomNumber}</p>
                      <p><span className="text-gray-500">Type:</span> {room?.type}</p>
                      <p><span className="text-gray-500">Guests:</span> {booking.guests}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Booking Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Check-out:</span> {formatDate(booking.checkOutDate)}</p>
                      <p><span className="text-gray-500">Amount:</span> ₹{booking.totalAmount}</p>
                      <p><span className="text-gray-500">Payment:</span> <span className="capitalize">{booking.paymentStatus}</span></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={() => handleCheckIn(booking.id, booking.roomId)}>
                    Complete Check-in
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No confirmed bookings for check-in</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
