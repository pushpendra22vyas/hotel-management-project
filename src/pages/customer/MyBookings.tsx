import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { formatDate } from '@/utils/date';

export function MyBookings() {
  const { user } = useAuth();
  const myBookings = bookings.filter(b => b.customerId === user?.id);

  const statusColors: any = {
    pending: 'secondary',
    confirmed: 'default',
    'checked-in': 'success',
    'checked-out': 'outline',
    cancelled: 'destructive'
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {myBookings.map(booking => {
          const room = rooms.find(r => r.id === booking.roomId);

          return (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Booking #{booking.id}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Booked on {formatDate(booking.createdAt)}
                    </p>
                  </div>
                  <Badge variant={statusColors[booking.status]} className="capitalize">
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={room?.image} 
                    alt={room?.type}
                    className="w-full md:w-48 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{room?.type}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Room Number:</span>
                        <p className="font-medium">{room?.roomNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Guests:</span>
                        <p className="font-medium">{booking.guests}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Check-in:</span>
                        <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Check-out:</span>
                        <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <p className="font-medium capitalize">{booking.paymentStatus}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Amount:</span>
                        <p className="font-medium text-blue-600">₹{booking.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {myBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No bookings found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
