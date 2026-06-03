import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { rooms as initialRooms } from '@/data/rooms';
import { Room, RoomStatus, RoomType } from '@/types';
import { storage } from '@/utils/storage';

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>(() => storage.get('rooms', initialRooms));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'all'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const [formData, setFormData] = useState<Partial<Room>>({
    roomNumber: '',
    type: 'Standard Room',
    price: 0,
    capacity: 2,
    status: 'available',
    floor: 1,
    description: '',
    amenities: [],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
  });

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (editingRoom) {
      const updated = rooms.map(r => r.id === editingRoom.id ? { ...r, ...formData } : r);
      setRooms(updated);
      storage.set('rooms', updated);
    } else {
      const newRoom: Room = {
        id: `R${String(rooms.length + 1).padStart(3, '0')}`,
        ...formData as Room
      };
      const updated = [...rooms, newRoom];
      setRooms(updated);
      storage.set('rooms', updated);
    }
    setIsDialogOpen(false);
    setEditingRoom(null);
    resetForm();
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData(room);
    setIsDialogOpen(true);
  };

  const handleDelete = (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      const updated = rooms.filter(r => r.id !== roomId);
      setRooms(updated);
      storage.set('rooms', updated);
    }
  };

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      type: 'Standard Room',
      price: 0,
      capacity: 2,
      status: 'available',
      floor: 1,
      description: '',
      amenities: [],
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
    });
  };

  const openAddDialog = () => {
    setEditingRoom(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const statusColors: Record<RoomStatus, any> = {
    available: 'success',
    occupied: 'destructive',
    reserved: 'warning',
    maintenance: 'secondary'
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by room number or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label>Status Filter</Label>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as RoomStatus | 'all')}>
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Rooms ({filteredRooms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>₹{room.price}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[room.status]} className="capitalize">
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(room)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(room.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClose={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Room Number</Label>
                <Input
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as RoomType })}>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Executive Room">Executive Room</option>
                  <option value="Suite Room">Suite Room</option>
                  <option value="Family Room">Family Room</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Floor</Label>
                <Input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as RoomStatus })}>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                  <option value="maintenance">Maintenance</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
