'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { useProducts } from '@/store/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Package, Users, ShoppingBag, TrendingUp, AlertTriangle,
  CheckCircle, Clock, Truck, Settings, LogOut, Eye, Plus
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { currentUser, logout, getAllOrders, getAllUsers } = useAuth();
  const { products } = useProducts();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast.error('Admin access required. Please log in with admin credentials.');
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const orders = getAllOrders();
  const users = getAllUsers().filter(u => u.role === 'customer');
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const handleLogout = () => {
    logout();
    toast.success('Admin logged out successfully.');
    router.push('/');
  };

  const STATUS_COLOR: Record<string, string> = {
    Pending:    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Shipped:    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    Delivered:  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Cancelled:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-primary/10 text-primary border-primary/20">Admin Panel</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome, {currentUser.name} — Manage your NisElite platform</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" /> Manage Products
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Registered Customers', value: users.length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Total Revenue', value: `OMR ${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 shadow-sm">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stock & Order Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-green-200 dark:border-green-900 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-600">{inStockCount}</p>
              <p className="text-sm text-muted-foreground">Products In Stock</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 dark:border-yellow-900 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { href: '/admin/products', label: 'Manage Products', icon: Package, desc: 'Add, edit, delete parts' },
          { href: '/admin/orders', label: 'Manage Orders', icon: Truck, desc: 'Update order statuses' },
          { href: '/admin/customers', label: 'View Customers', icon: Users, desc: 'Browse registered users' },
          { href: '/admin/products/new', label: 'Add New Product', icon: Plus, desc: 'List a new spare part' },
        ].map((nav) => (
          <Link key={nav.href} href={nav.href}>
            <Card className="hover:border-primary/50 transition-all cursor-pointer shadow-sm h-full hover:shadow-md">
              <CardContent className="p-5">
                <nav.icon className="h-6 w-6 text-primary mb-3" />
                <p className="font-bold text-sm">{nav.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{nav.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <Eye className="h-4 w-4" /> View All
              </Button>
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 font-semibold">Order ID</th>
                    <th className="text-left py-2 font-semibold">Items</th>
                    <th className="text-left py-2 font-semibold">Total</th>
                    <th className="text-left py-2 font-semibold">Status</th>
                    <th className="text-left py-2 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 font-mono text-xs">{order.id}</td>
                      <td className="py-3">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                      <td className="py-3 font-bold">OMR {order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('en-OM')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
