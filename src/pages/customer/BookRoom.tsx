import { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { rooms } from '@/data/rooms';
import { bookings as initialBookings } from '@/data/bookings';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/utils/storage';
import { getDaysDifference, getTodayString } from '@/utils/date';
import { Booking, RoomType } from '@/types';

export function BookRoom() {
  const { user } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<RoomType | 'all'>('all');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableRooms = rooms.filter(r => {
    const matchesType = roomType === 'all' || r.type === roomType;
    const matchesCapacity = r.capacity >= guests;
    const matchesStatus = r.status === 'available';
    return matchesType && matchesCapacity && matchesStatus;
  });

  const handleBookNow = (room: any) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  const confirmBooking = () => {
    if (!checkIn || !checkOut || !selectedRoom) {
      alert('Please fill all booking details');
      return;
    }

    const days = getDaysDifference(checkIn, checkOut);
    const totalAmount = selectedRoom.price * days;

    const newBooking: Booking = {
      id: `B${String(initialBookings.length + 1).padStart(3, '0')}`,
      customerId: user!.id,
      roomId: selectedRoom.id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      status: 'pending',
      totalAmount,
      paymentStatus: 'unpaid',
      createdAt: getTodayString()
    };

    const bookings = storage.get<Booking[]>('bookings', initialBookings);
    storage.set('bookings', [...bookings, newBooking]);
    
    alert('Booking successful! Your booking is pending confirmation.');
    setIsDialogOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Book a Room</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Check-in Date</Label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={getTodayString()}
              />
            </div>
            <div>
              <Label>Check-out Date</Label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || getTodayString()}
              />
            </div>
            <div>
              <Label>Guests</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Room Type</Label>
              <Select value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType | 'all')}>
                <option value="all">All Types</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Executive Room">Executive Room</option>
                <option value="Suite Room">Suite Room</option>
                <option value="Family Room">Family Room</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRooms.map(room => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{room.type}</h3>
                <Badge variant="success">Available</Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{room.description}</p>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span>{room.capacity} Guests</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {room.amenities.slice(0, 3).map(amenity => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-blue-600">₹{room.price}</span>
                  <span className="text-gray-500 text-sm">/night</span>
                </div>
                <Button onClick={() => handleBookNow(room)}>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {availableRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No rooms available matching your criteria</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClose={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={selectedRoom.image} alt={selectedRoom.type} className="w-24 h-24 rounded object-cover" />
                <div>
                  <h3 className="font-semibold">{selectedRoom.type}</h3>
                  <p className="text-sm text-gray-500">Room {selectedRoom.roomNumber}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span className="font-medium">{checkIn && checkOut ? getDaysDifference(checkIn, checkOut) : 0}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ₹{checkIn && checkOut ? (selectedRoom.price * getDaysDifference(checkIn, checkOut)).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
