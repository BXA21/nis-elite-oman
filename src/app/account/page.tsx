'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User, Package, LogOut, ShoppingBag, Clock, CheckCircle,
  Truck, AlertCircle, XCircle, ArrowRight, Car
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const STATUS_CONFIG = {
  Pending:    { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200', icon: Clock },
  Processing: { color: 'bg-blue-500/10 text-blue-600 border-blue-200', icon: Package },
  Shipped:    { color: 'bg-purple-500/10 text-purple-600 border-purple-200', icon: Truck },
  Delivered:  { color: 'bg-green-500/10 text-green-600 border-green-200', icon: CheckCircle },
  Cancelled:  { color: 'bg-red-500/10 text-red-600 border-red-200', icon: XCircle },
};

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, logout, getMyOrders } = useAuth();
  const orders = getMyOrders();

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please log in to view your account.');
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out successfully.');
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="mb-8 border-border/50 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground font-medium">Full Name</p>
              <p className="font-semibold mt-1">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Email Address</p>
              <p className="font-semibold mt-1">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Account Type</p>
              <Badge className="mt-1 capitalize">{currentUser.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Link href="/parts">
          <Card className="hover:border-primary/50 transition-all cursor-pointer shadow-sm h-full">
            <CardContent className="p-5 flex flex-col items-center text-center gap-2">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="font-semibold text-sm">Shop Parts</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/cart">
          <Card className="hover:border-primary/50 transition-all cursor-pointer shadow-sm h-full">
            <CardContent className="p-5 flex flex-col items-center text-center gap-2">
              <Car className="h-7 w-7 text-primary" />
              <span className="font-semibold text-sm">My Cart</span>
            </CardContent>
          </Card>
        </Link>
        {currentUser.role === 'admin' && (
          <Link href="/admin">
            <Card className="hover:border-primary/50 transition-all cursor-pointer shadow-sm h-full border-primary/20 bg-primary/5">
              <CardContent className="p-5 flex flex-col items-center text-center gap-2">
                <Package className="h-7 w-7 text-primary" />
                <span className="font-semibold text-sm">Admin Panel</span>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      {/* Order History */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" /> Order History
        </h2>

        {orders.length === 0 ? (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet.</p>
              <Link href="/parts">
                <Button className="rounded-full px-8">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.status];
              const StatusIcon = status.icon;
              return (
                <Card key={order.id} className="border-border/50 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{order.id}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-OM', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                          <StatusIcon className="h-3 w-3" /> {order.status}
                        </span>
                        <span className="text-lg font-extrabold">OMR {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                          <span className="font-semibold">OMR {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      <span>📍 {order.shippingAddress}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
