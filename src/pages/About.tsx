import { Award, Users, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function About() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] flex items-center justify-center text-white mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <h1 className="relative z-10 text-5xl font-bold">About Luxury Stay</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Established in 2010, Luxury Stay has been at the forefront of hospitality excellence in India. 
              Our commitment to providing world-class service and unmatched comfort has made us the preferred 
              choice for travelers from around the globe.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              With 30 elegantly designed rooms, state-of-the-art facilities, and a dedicated team of 
              professionals, we ensure every guest experiences the perfect blend of luxury and comfort.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
              alt="Hotel Lobby"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Award, value: '15+', label: 'Awards Won' },
            { icon: Users, value: '50K+', label: 'Happy Guests' },
            { icon: MapPin, value: 'Prime', label: 'Location' },
            { icon: Clock, value: '24/7', label: 'Service' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fine Dining',
                description: 'Experience culinary excellence at our multi-cuisine restaurant with expert chefs.',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'
              },
              {
                title: 'Spa & Wellness',
                description: 'Rejuvenate your mind and body at our world-class spa and wellness center.',
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
              },
              {
                title: 'Conference Halls',
                description: 'Modern conference facilities perfect for business meetings and events.',
                image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80'
              }
            ].map((facility) => (
              <Card key={facility.title} className="overflow-hidden">
                <img src={facility.image} alt={facility.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=80',
              'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80',
              'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80',
              'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
              'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80',
              'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&q=80',
              'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80',
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80'
            ].map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
