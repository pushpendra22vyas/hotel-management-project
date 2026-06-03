import { useState } from 'react';
import { Users, Bed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { rooms } from '@/data/rooms';
import { RoomType, RoomStatus } from '@/types';

export function Rooms() {
  const [filterType, setFilterType] = useState<RoomType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<RoomStatus | 'all'>('all');

  const filteredRooms = rooms.filter(room => {
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const statusColors: Record<RoomStatus, string> = {
    available: 'success',
    occupied: 'destructive',
    reserved: 'warning',
    maintenance: 'secondary'
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] flex items-center justify-center text-white mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <h1 className="relative z-10 text-5xl font-bold">Our Rooms</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Room Type</label>
            <Select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as RoomType | 'all')}
            >
              <option value="all">All Types</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive Room">Executive Room</option>
              <option value="Suite Room">Suite Room</option>
              <option value="Family Room">Family Room</option>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Availability</label>
            <Select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value as RoomStatus | 'all')}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
                <Badge 
                  variant={statusColors[room.status] as any}
                  className="absolute top-2 right-2 capitalize"
                >
                  {room.status}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{room.type}</h3>
                  <span className="text-sm text-gray-500">Room {room.roomNumber}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{room.description}</p>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>Floor {room.floor}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No rooms found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
