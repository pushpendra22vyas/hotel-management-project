import { useState } from 'react';
import { Search, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { users } from '@/data/users';
import { payments } from '@/data/payments';
import { formatDate } from '@/utils/date';

export function Payments() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const booking = bookings.find(b => b.id === payment.bookingId);
    const customer = users.find(u => u.id === booking?.customerId);
    
    return payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const unpaidBookings = bookings.filter(b => b.paymentStatus === 'unpaid').length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Paid</div>
            <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Transactions</div>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Pending Payments</div>
            <div className="text-2xl font-bold text-yellow-600">{unpaidBookings}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Label>Search Payments</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by payment ID, transaction ID, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => {
                const booking = bookings.find(b => b.id === payment.bookingId);
                const customer = users.find(u => u.id === booking?.customerId);

                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{customer?.name}</TableCell>
                    <TableCell>{payment.bookingId}</TableCell>
                    <TableCell className="text-green-600 font-semibold">₹{payment.amount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell className="text-xs">{payment.transactionId}</TableCell>
                    <TableCell>{formatDate(payment.paymentDate)}</TableCell>
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
