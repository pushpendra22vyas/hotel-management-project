import { LogIn, LogOut, Calendar, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { users } from '@/data/users';
import { getTodayString } from '@/utils/date';

export function ReceptionistDashboard() {
  const today = getTodayString();
  const todayCheckIns = bookings.filter(b => b.checkInDate === today);
  const todayCheckOuts = bookings.filter(b => b.checkOutDate === today);
  const pendingReservations = bookings.filter(b => b.status === 'pending');
  const availableRooms = rooms.filter(r => r.status === 'available');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Reception Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <LogIn className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCheckIns.length}</div>
            <p className="text-xs text-gray-500 mt-1">Arrivals expected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-outs</CardTitle>
            <LogOut className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCheckOuts.length}</div>
            <p className="text-xs text-gray-500 mt-1">Departures expected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations.length}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <Bed className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableRooms.length}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for booking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayCheckIns.slice(0, 5).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId);
                const customer = users.find(u => u.id === booking.customerId);

                return (
                  <div key={booking.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{customer?.name}</p>
                      <p className="text-sm text-gray-500">Room {room?.roomNumber}</p>
                    </div>
                    <Badge variant="success">Ready</Badge>
                  </div>
                );
              })}
              {todayCheckIns.length === 0 && (
                <p className="text-gray-500 text-center py-4">No check-ins today</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReservations.slice(0, 5).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId);
                const customer = users.find(u => u.id === booking.customerId);

                return (
                  <div key={booking.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{customer?.name}</p>
                      <p className="text-sm text-gray-500">Room {room?.roomNumber}</p>
                    </div>
                    <Badge variant="warning">Pending</Badge>
                  </div>
                );
              })}
              {pendingReservations.length === 0 && (
                <p className="text-gray-500 text-center py-4">No pending reservations</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
