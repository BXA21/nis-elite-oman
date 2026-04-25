'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Truck, Lock, ChevronRight, ShoppingCart, AlertCircle, CheckCircle2, User, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { currentUser, placeOrder } = useAuth();
  const { items, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  const tax = total * 0.08;
  const grandTotal = total + tax;

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: 'Muscat',
    governorate: 'Muscat Governorate',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before checking out.</p>
        <Link href="/parts">
          <Button className="rounded-full px-8">Shop Parts</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.address.trim()) e.address = 'Delivery address is required.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const address = `${form.address}, ${form.city}, ${form.governorate}, Oman`;
      const order = placeOrder(
        items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image, category: i.category })),
        total,
        tax,
        grandTotal,
        address
      );
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/checkout/success?orderId=${order.id}`);
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Form */}
        <div className="flex-grow space-y-6">
          {/* Login reminder */}
          {!currentUser && (
            <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
              <AlertCircle className="h-4 w-4 text-primary shrink-0" />
              <span>
                <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                {' '}to save your order history and earn rewards.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Contact Info */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-name">Full Name *</label>
                    <Input
                      id="co-name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Ahmed Al-Balushi"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-email">Email *</label>
                    <Input
                      id="co-email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-phone">Phone Number *</label>
                    <Input
                      id="co-phone"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+968 9X XXX XXX"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Delivery Address (Oman)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-address">Street Address *</label>
                    <Input
                      id="co-address"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      placeholder="Street, Building, Area"
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-city">City</label>
                    <Input id="co-city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" htmlFor="co-gov">Governorate</label>
                    <Input id="co-gov" value={form.governorate} onChange={e => setForm({ ...form, governorate: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold rounded-full shadow-lg shadow-primary/25"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Place Order • OMR {grandTotal.toFixed(2)}
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="sticky top-24 bg-card border border-border/50 rounded-3xl p-6 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-primary via-accent to-primary" />
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 border relative overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold whitespace-nowrap">OMR {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>OMR {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (8%)</span>
                <span>OMR {tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-extrabold text-lg text-primary">
                <span>Total</span>
                <span>OMR {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <Truck className="h-3 w-3" /> Free delivery across Oman
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
