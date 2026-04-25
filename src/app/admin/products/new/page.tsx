'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { useProducts } from '@/store/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  'Engine & Drivetrain', 'Brakes', 'Suspension & Steering',
  'Exterior', 'Interior', 'Lighting', 'Electronics', 'Filters'
];

export default function AddProductPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { addProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    description: '',
    image: '/images/parts/air_intake.png',
    inStock: true,
    yearFrom: '2015',
    yearTo: '2025',
    rating: '4.5',
    reviews: '0',
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Product name is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Enter a valid price in OMR.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (Number(form.yearFrom) > Number(form.yearTo)) e.yearFrom = 'Start year must be before end year.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      addProduct({
        name: form.name.trim(),
        category: form.category,
        price: parseFloat(parseFloat(form.price).toFixed(3)),
        description: form.description.trim(),
        image: form.image,
        inStock: form.inStock,
        compatibleYears: [parseInt(form.yearFrom), parseInt(form.yearTo)],
        rating: parseFloat(form.rating) || 4.5,
        reviews: parseInt(form.reviews) || 0,
      });
      toast.success(`"${form.name}" has been added to the product catalogue!`);
      router.push('/admin/products');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in duration-500">
      <Link href="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-3">
        <Package className="h-7 w-7 text-primary" /> Add New Product
      </h1>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">Product Name *</label>
              <Input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ceramic Brake Pad Kit"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-1 block">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium mb-1 block">Price (OMR) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">OMR</span>
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="0.000"
                  className={`pl-14 ${errors.price ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-1 block">Description *</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the product, its features, and compatibility..."
                rows={4}
                className={`w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none ${errors.description ? 'border-destructive' : ''}`}
              />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            {/* Compatible Years */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Compatible From (Year)</label>
                <Input
                  type="number"
                  min="2015"
                  max="2025"
                  value={form.yearFrom}
                  onChange={e => setForm({ ...form, yearFrom: e.target.value })}
                  className={errors.yearFrom ? 'border-destructive' : ''}
                />
                {errors.yearFrom && <p className="text-xs text-destructive mt-1">{errors.yearFrom}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Compatible To (Year)</label>
                <Input
                  type="number"
                  min="2015"
                  max="2025"
                  value={form.yearTo}
                  onChange={e => setForm({ ...form, yearTo: e.target.value })}
                />
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-3">
              <input
                id="instock"
                type="checkbox"
                checked={form.inStock}
                onChange={e => setForm({ ...form, inStock: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="instock" className="text-sm font-medium">Product is currently In Stock</label>
            </div>

            {/* Image selector */}
            <div>
              <label className="text-sm font-medium mb-1 block">Product Image</label>
              <select
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="/images/parts/air_intake.png">Air Intake / Engine</option>
                <option value="/images/parts/brake_rotors.png">Brake Rotors</option>
                <option value="/images/parts/suspension_strut.png">Suspension Strut</option>
                <option value="/images/parts/headlight.png">Headlight</option>
                <option value="/images/parts/car_grille.png">Grille / Exterior</option>
                <option value="/images/parts/led_fog_lights.png">LED Lights</option>
                <option value="/images/parts/obd2_scanner.png">Electronics / Interior</option>
                <option value="/images/parts/wireless_carplay.png">Wireless / Tech</option>
                <option value="/images/parts/lowering_springs.png">Springs / Suspension</option>
              </select>
            </div>

            <div className="pt-2 flex gap-3">
              <Button type="submit" className="gap-2 rounded-full px-8" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <><Save className="h-4 w-4" /> Add Product</>
                )}
              </Button>
              <Link href="/admin/products">
                <Button variant="outline" className="rounded-full px-6">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
