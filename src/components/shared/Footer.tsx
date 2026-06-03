import { Hotel, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Hotel className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Luxury Stay</span>
            </div>
            <p className="text-gray-400 text-sm">
              Experience world-class hospitality and unmatched comfort at India's premier luxury hotel.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/rooms" className="hover:text-white">Rooms</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@luxurystay.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>24/7 Reception</li>
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 12:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Luxury Stay Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
