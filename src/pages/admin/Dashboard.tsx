import { Bed, Calendar, DollarSign, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { rooms } from '@/data/rooms';
import { bookings } from '@/data/bookings';
import { users } from '@/data/users';
import { revenueData } from '@/data/revenue';

export function AdminDashboard() {
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const reservedRooms = rooms.filter(r => r.status === 'reserved').length;
  
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const customers = users.filter(u => u.role === 'customer').length;

  const roomOccupancyData = [
    { name: 'Available', value: availableRooms, color: '#10b981' },
    { name: 'Occupied', value: occupiedRooms, color: '#ef4444' },
    { name: 'Reserved', value: reservedRooms, color: '#f59e0b' },
    { name: 'Maintenance', value: rooms.filter(r => r.status === 'maintenance').length, color: '#6b7280' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-gray-500 mt-1">
              {availableRooms} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedRooms}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((occupiedRooms / totalRooms) * 100).toFixed(1)}% occupancy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {activeBookings} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-gray-500 mt-1">
              Last 12 months
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomOccupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomOccupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
