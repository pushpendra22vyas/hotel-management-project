import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] flex items-center justify-center text-white mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1920&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <h1 className="relative z-10 text-5xl font-bold">Contact Us</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Have questions or special requests? We're here to help make your stay perfect.
            </p>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Marine Drive, Mumbai<br />
                        Maharashtra 400001, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        +91 98765 43210<br />
                        +91 98765 43211
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        info@luxurystay.com<br />
                        reservations@luxurystay.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Reception: 24/7<br />
                        Check-in: 2:00 PM<br />
                        Check-out: 12:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={5}
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-950 dark:placeholder:text-gray-400"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Location Map</h3>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Google Maps Placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
