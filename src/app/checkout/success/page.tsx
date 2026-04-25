'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight, Truck, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const id = searchParams.get('orderId');
    if (id) {
      setOrderId(id);
    } else {
      const randChars = Math.random().toString(36).substring(2, 9).toUpperCase();
      const randNums = Math.floor(1000000 + Math.random() * 9000000);
      setOrderId(`ORDER-${randChars}-${randNums}`);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-[80vh]">
      {/* Success Icon */}
      <div className="bg-green-500/10 p-8 rounded-full mb-8 relative shadow-inner ring-1 ring-green-500/20">
        <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <CheckCircle2 className="h-20 w-20 text-green-500 relative z-10" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
        Order Confirmed! 🎉
      </h1>
      <p className="text-xl text-muted-foreground mb-4 max-w-lg">
        Thank you for your order. We&apos;re processing it and will dispatch your Nissan parts soon.
      </p>

      {/* Order ID Box */}
      <div className="glass-card bg-muted/30 border border-border/50 rounded-2xl p-6 mb-6 w-full max-w-md">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Order Number</p>
        <p className="text-base font-mono tracking-widest text-primary mb-3">{orderId || 'PROCESSING...'}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
          <Truck className="w-4 h-4" /> Free Delivery across Oman
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-md mb-10">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 h-0.5 bg-border top-5 z-0" />
          {[
            { label: 'Order Placed', icon: CheckCircle2, done: true },
            { label: 'Processing', icon: Package, done: false },
            { label: 'Dispatched', icon: Truck, done: false },
            { label: 'Delivered', icon: Clock, done: false },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center z-10 gap-2">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step.done ? 'bg-green-500 border-green-500 text-white' : 'bg-background border-border text-muted-foreground'}`}>
                <step.icon className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground font-medium text-center">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/account">
          <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25">
            <Package className="mr-2 h-5 w-5" /> View My Orders
          </Button>
        </Link>
        <Link href="/parts">
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/5">
            Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
