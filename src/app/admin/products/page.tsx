'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { useProducts } from '@/store/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus, Search, Edit, Trash2, Package, ArrowLeft,
  CheckCircle, AlertTriangle, ToggleLeft, ToggleRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { products, deleteProduct, updateStock } = useProducts();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast.error('Admin access required.');
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirmDelete === id) {
      deleteProduct(id);
      toast.success(`"${name}" has been deleted.`);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      toast.warning(`Click delete again to confirm removing "${name}".`);
    }
  };

  const handleStockToggle = (id: string, current: boolean, name: string) => {
    updateStock(id, !current);
    toast.success(`"${name}" marked as ${!current ? 'In Stock' : 'Out of Stock'}.`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">{products.length} products total — manage your inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 rounded-full shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products by name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Products Table */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Price (OMR)</th>
                  <th className="text-left py-3 px-4 font-semibold">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold">Compatibility</th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border rounded-lg relative flex-shrink-0 overflow-hidden">
                          <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="font-semibold line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4 font-bold">
                      {product.price.toFixed(3)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleStockToggle(product.id, product.inStock, product.name)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold transition-all ${product.inStock
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                      >
                        {product.inStock ? (
                          <><CheckCircle className="h-3 w-3" /> In Stock</>
                        ) : (
                          <><AlertTriangle className="h-3 w-3" /> Out of Stock</>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {product.compatibleYears[0]}–{product.compatibleYears[1]}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 hover:bg-destructive/10 ${confirmDelete === product.id ? 'text-destructive bg-destructive/10' : 'hover:text-destructive'}`}
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No products match your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
