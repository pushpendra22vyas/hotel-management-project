import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Dumbbell, UtensilsCrossed, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Home() {
  const testimonials = [
    {
      name: 'Rahul Verma',
      rating: 5,
      comment: 'Exceptional service and beautiful rooms. The staff went above and beyond to make our stay memorable.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Luxurious amenities and prime location. Will definitely book again for my next trip to Mumbai.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Outstanding experience from check-in to check-out. The attention to detail is remarkable.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
    }
  ];

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Coffee, label: 'Restaurant' },
    { icon: Dumbbell, label: 'Fitness Center' },
    { icon: UtensilsCrossed, label: 'Room Service' },
    { icon: Car, label: 'Parking' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Luxury Stay</h1>
          <p className="text-xl md:text-2xl mb-8">Experience Unmatched Luxury and Comfort</p>
          <Link to="/rooms">
            <Button size="lg" className="text-lg px-8 py-6">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hotel Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Luxury Stay</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Situated in the heart of Mumbai, Luxury Stay offers world-class hospitality with premium amenities. 
              Our hotel combines modern luxury with traditional Indian warmth to create an unforgettable experience.
            </p>
          </div>
        </section>

        {/* Featured Rooms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Deluxe Room', price: 4500, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
              { name: 'Suite Room', price: 12000, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80' },
              { name: 'Family Room', price: 8500, image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80' }
            ].map((room) => (
              <Card key={room.name} className="overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">₹{room.price}/night</p>
                  <Link to="/rooms">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div key={amenity.label} className="flex flex-col items-center text-center">
                  <Icon className="h-12 w-12 text-blue-600 mb-2" />
                  <span className="font-medium">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8">Book your stay now and enjoy exclusive offers</p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
