import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/utils/date';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <User className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{user?.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{user?.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-medium text-xs">{user?.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
