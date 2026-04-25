import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Shield, Truck, Star, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-in fade-in duration-500">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          About <span className="text-primary">NisElite</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Oman&apos;s trusted platform for genuine Nissan Altima spare parts — fast delivery, fair prices, expert quality.
        </p>
      </div>

      {/* Mission */}
      <Card className="mb-12 border-border/50 shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            NisElite was founded to solve a real problem faced by Nissan Altima owners across Oman — finding
            genuine, high-quality spare parts quickly and at fair prices. We are committed to providing a
            seamless wholesale e-commerce experience for both individual car owners and auto repair shops.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Our platform specialises in sourcing genuine OEM and high-performance aftermarket parts for the
            Nissan Altima model years 2015 to 2025, with fast delivery across the Sultanate of Oman.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Star, value: '42+', label: 'Genuine Parts', color: 'text-yellow-500' },
          { icon: Users, value: '500+', label: 'Happy Customers', color: 'text-blue-500' },
          { icon: Truck, value: '2-Day', label: 'Oman Delivery', color: 'text-green-500' },
          { icon: Shield, value: '100%', label: 'Secure Orders', color: 'text-primary' },
        ].map(stat => (
          <Card key={stat.label} className="border-border/50 shadow-sm text-center">
            <CardContent className="p-6">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact */}
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-muted-foreground text-sm">Al Khuwair Commercial Complex,<br />Muscat, Sultanate of Oman</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-muted-foreground text-sm">+968 2X XXX XXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground text-sm">support@niselite.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold">Working Hours</p>
                <p className="text-muted-foreground text-sm">Saturday–Thursday: 8:00 AM – 6:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">Send a Message</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <Button className="w-full rounded-full">Send Message</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/parts">
          <Button size="lg" className="rounded-full px-10">Browse Parts Catalogue</Button>
        </Link>
      </div>
    </div>
  );
}
