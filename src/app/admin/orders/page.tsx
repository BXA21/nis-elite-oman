'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, type Order } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Truck, Package, Clock, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const STATUSES: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_COLOR: Record<string, string> = {
  Pending:    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
  Shipped:    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400',
  Delivered:  'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400',
  Cancelled:  'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const { currentUser, getAllOrders, updateOrderStatus } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast.error('Admin access required.');
      router.push('/login');
      return;
    }
    setOrders(getAllOrders());
  }, [currentUser, router, getAllOrders]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getAllOrders());
    toast.success(`Order status updated to "${newStatus}".`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">{orders.length} total orders — update statuses and track deliveries</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {STATUSES.map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className={`px-4 py-3 rounded-xl border text-center ${STATUS_COLOR[status]}`}>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs font-semibold">{status}</p>
            </div>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <Card className="border-border/50 shadow-sm">
          <CardContent className="py-16 text-center text-muted-foreground">
            <Package className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>No orders have been placed yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="border-border/50 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-sm font-bold text-primary">{order.id}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-OM', { dateStyle: 'long' })}
                    </p>
                    <p className="text-xs text-muted-foreground">📍 {order.shippingAddress}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-extrabold">OMR {order.total.toFixed(2)}</span>
                    {/* Status Selector */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none ${STATUS_COLOR[order.status]}`}
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span className="font-semibold">OMR {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
