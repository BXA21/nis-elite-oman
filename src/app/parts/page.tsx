'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/store/useProducts';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Star, StarHalf, Filter } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
    'All',
    'Engine & Drivetrain',
    'Brakes',
    'Suspension & Steering',
    'Exterior',
    'Interior',
    'Lighting',
    'Electronics',
    'Filters',
];

const NISSAN_MODELS = [
    'All Models',
    'Nissan Altima (2015-2018)',
    'Nissan Altima (2019-2022)',
    'Nissan Altima (2023-2025)',
];

export default function PartsStorePage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [modelFilter, setModelFilter] = useState('All Models');
    const { products } = useProducts();
    const addToCart = useCart((state) => state.addToCart);

    const filteredParts = products.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        
        // Filter by Nissan model year range
        let matchesModel = true;
        if (modelFilter === 'Nissan Altima (2015-2018)') {
            matchesModel = p.compatibleYears[0] <= 2018 && p.compatibleYears[1] >= 2015;
        } else if (modelFilter === 'Nissan Altima (2019-2022)') {
            matchesModel = p.compatibleYears[0] <= 2022 && p.compatibleYears[1] >= 2019;
        } else if (modelFilter === 'Nissan Altima (2023-2025)') {
            matchesModel = p.compatibleYears[0] <= 2025 && p.compatibleYears[1] >= 2023;
        }

        return matchesSearch && matchesCategory && matchesModel;
    });

    const handleAddToCart = (part: any, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!part.inStock) {
            toast.error('This item is out of stock.');
            return;
        }
        addToCart(part);
        toast.success(`${part.name} added to cart!`, {
            description: 'You can view your cart or continue shopping.',
            action: {
                label: 'View Cart',
                onClick: () => window.location.href = '/cart',
            },
        });
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) stars.push(<Star key={`f-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />);
        if (hasHalf) stars.push(<StarHalf key="h" className="w-4 h-4 fill-yellow-500 text-yellow-500" />);
        return <div className="flex items-center gap-1">{stars}</div>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search Header */}
            <div className="mb-8 p-6 bg-card border border-border/50 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Nissan Genuine Parts Store</h1>
                <p className="text-muted-foreground mb-4 text-sm">Browse our extensive catalogue of genuine Nissan Altima spare parts — delivered across Oman.</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            id="parts-search"
                            placeholder="Search by part name or description (e.g. 'Brake Pads', 'Headlight')"
                            className="pl-10 h-12 text-base rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Model Filter */}
                    <div className="relative w-full md:w-56">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <select
                            id="model-filter"
                            value={modelFilter}
                            onChange={e => setModelFilter(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                        >
                            {NISSAN_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Categories Sidebar */}
                <div className="w-full lg:w-56 flex-shrink-0">
                    <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                        <h2 className="font-bold text-base mb-3">Categories</h2>
                        <ul className="space-y-1">
                            {CATEGORIES.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${category === cat
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="mb-4 flex justify-between items-center text-sm font-medium text-muted-foreground">
                        <span>Showing {filteredParts.length} of {products.length} products</span>
                        {(search || category !== 'All' || modelFilter !== 'All Models') && (
                            <button
                                className="text-primary hover:underline text-xs"
                                onClick={() => { setSearch(''); setCategory('All'); setModelFilter('All Models'); }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredParts.map(part => (
                            <Link key={part.id} href={`/parts/${part.id}`} className="group relative block h-full">
                                <Card className="h-full flex flex-col hover:border-primary/50 transition-all shadow-sm hover:shadow-xl bg-card overflow-hidden">
                                    <div className="aspect-square bg-white relative p-6 flex items-center justify-center border-b border-border/20">
                                        <Image
                                            src={part.image}
                                            alt={part.name}
                                            fill
                                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                        {!part.inStock && (
                                            <Badge variant="destructive" className="absolute top-3 left-3 z-10">Out of Stock</Badge>
                                        )}
                                    </div>

                                    <CardContent className="p-5 flex-grow flex flex-col pt-4">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{part.category}</p>
                                        <h2 className="text-base font-bold leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                            {part.name}
                                        </h2>

                                        <div className="flex items-center gap-2 mb-3">
                                            {renderStars(part.rating)}
                                            <span className="text-xs text-muted-foreground">({part.reviews})</span>
                                        </div>

                                        <p className="text-xs text-muted-foreground mt-auto line-clamp-2 mt-4">
                                            Fits Altima • {part.compatibleYears[0]}-{part.compatibleYears[1]}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-5 pt-0 flex items-center justify-between">
                                        <div>
                                            <span className="text-sm font-medium text-muted-foreground line-through mr-2">
                                                OMR {(part.price * 1.2).toFixed(2)}
                                            </span>
                                            <span className="text-xl font-black">OMR {part.price.toFixed(3)}</span>
                                        </div>

                                        <Button
                                            size="icon"
                                            onClick={(e) => handleAddToCart(part, e)}
                                            disabled={!part.inStock}
                                            className="rounded-full shadow-md bg-primary hover:bg-primary/90 h-10 w-10 flex-shrink-0 z-20 group-hover:scale-110 transition-transform"
                                            title={part.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {filteredParts.length === 0 && (
                        <div className="text-center py-24 bg-card border border-border/50 rounded-2xl">
                            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2">No parts found</h3>
                            <p className="text-muted-foreground">Try adjusting your search, category, or model filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
