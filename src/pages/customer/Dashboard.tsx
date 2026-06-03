import { Calendar, CreditCard, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { formatDate } from '@/utils/date';

export function CustomerDashboard() {
  const { user } = useAuth();
  const myBookings = bookings.filter(b => b.customerId === user?.id);
  const activeBookings = myBookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in');
  const upcomingBookings = myBookings.filter(b => b.status === 'confirmed' && new Date(b.checkInDate) > new Date());
  const totalSpent = myBookings.reduce((acc, b) => acc + b.totalAmount, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your bookings and profile</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myBookings.length}</div>
            <p className="text-xs text-gray-500 mt-1">{activeBookings.length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Stays</CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            <p className="text-xs text-gray-500 mt-1">Confirmed reservations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myBookings.slice(0, 5).map(booking => {
              const room = rooms.find(r => r.id === booking.roomId);
              const statusColors: any = {
                pending: 'secondary',
                confirmed: 'default',
                'checked-in': 'success',
                'checked-out': 'outline',
                cancelled: 'destructive'
              };

              return (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={room?.image} alt={room?.type} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h4 className="font-semibold">{room?.type}</h4>
                      <p className="text-sm text-gray-500">Room {room?.roomNumber}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusColors[booking.status]} className="capitalize mb-2">
                      {booking.status}
                    </Badge>
                    <p className="text-sm font-semibold">₹{booking.totalAmount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
