import { useState } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { users } from '@/data/users';
import { UserRole } from '@/types';
import { formatDate } from '@/utils/date';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleColors = {
    admin: 'destructive',
    receptionist: 'default',
    customer: 'success'
  };

  const stats = {
    total: users.length,
    customers: users.filter(u => u.role === 'customer').length,
    receptionists: users.filter(u => u.role === 'receptionist').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Users</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Customers</div>
            <div className="text-2xl font-bold">{stats.customers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Receptionists</div>
            <div className="text-2xl font-bold">{stats.receptionists}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Admins</div>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label>Role Filter</Label>
              <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="receptionist">Receptionist</option>
                <option value="customer">Customer</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleColors[user.role] as any} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
