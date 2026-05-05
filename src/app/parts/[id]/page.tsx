'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useProducts } from '@/store/useProducts';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    ChevronRight, ArrowLeft, Star, StarHalf, Truck, ShieldCheck,
    ShoppingCart, Lock, Package, Zap, RotateCcw, CheckCircle2,
    Tag, Calendar, Info, Eye
} from 'lucide-react';
import { toast } from 'sonner';

/* ─── Star rendering helper ─── */
function RatingStars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
    const stars = [];
    const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push(<Star key={`f-${i}`} className={`${cls} fill-yellow-500 text-yellow-500`} />);
    if (hasHalf) stars.push(<StarHalf key="h" className={`${cls} fill-yellow-500 text-yellow-500`} />);
    return <div className="flex items-center gap-0.5">{stars}</div>;
}

/* ─── Condition badge color map ─── */
function conditionColor(condition?: string) {
    if (!condition) return 'bg-muted text-muted-foreground';
    if (condition.toLowerCase().includes('new oem')) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (condition.toLowerCase().includes('new aftermarket')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (condition.toLowerCase().includes('used')) return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    return 'bg-muted text-muted-foreground';
}

export default function PartDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products } = useProducts();
    const part = products.find(p => p.id === id);
    const addToCart = useCart((state) => state.addToCart);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [qty, setQty] = useState(1);

    /* ─── Related products: same category first, then fill with others ─── */
    const relatedProducts = useMemo(() => {
        if (!part) return [];
        const sameCategory = products.filter(p => p.id !== part.id && p.category === part.category);
        const otherCategory = products.filter(p => p.id !== part.id && p.category !== part.category);
        return [...sameCategory, ...otherCategory].slice(0, 8);
    }, [part, products]);

    /* ─── Recently viewed (other random products as simulation) ─── */
    const recentlyViewed = useMemo(() => {
        if (!part) return [];
        return products.filter(p => p.id !== part.id).sort(() => 0.5 - Math.random()).slice(0, 6);
    }, [part, products]);

    if (!part) {
        notFound();
    }

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addToCart(part);
        toast.success(`${qty}× ${part.name} added to cart!`, {
            description: "Your item is ready for checkout.",
            action: {
                label: "View Cart",
                onClick: () => window.location.href = "/cart",
            },
        });
    };

    const handleRelatedAddToCart = (relatedPart: typeof part, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(relatedPart);
        toast.success(`${relatedPart.name} added to cart!`, {
            description: 'You can view your cart or continue shopping.',
            action: {
                label: 'View Cart',
                onClick: () => window.location.href = '/cart',
            },
        });
    };

    const listPrice = (part.price * 1.2).toFixed(2);
    const savings = (part.price * 0.2).toFixed(2);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in zoom-in-95 duration-500">

                {/* ─── Breadcrumb ─── */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/parts" className="hover:text-primary transition-colors">Parts Store</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{part.name}</span>
                </nav>

                {/* ═══════════════════════════════════════════════════════════
                    MAIN PRODUCT SECTION  (Amazon-style 2-column layout)
                ═══════════════════════════════════════════════════════════ */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* ─── LEFT: Image Gallery ─── */}
                    <div className="w-full lg:w-[55%] flex-shrink-0">
                        <div className="sticky top-24 space-y-5">
                            {/* Main Image */}
                            <div className="aspect-square bg-white border border-border/50 rounded-3xl p-8 flex items-center justify-center relative shadow-lg overflow-hidden group">
                                <Image
                                    src={part.image}
                                    alt={part.name}
                                    fill
                                    className="object-contain p-10 group-hover:scale-110 transition-transform duration-700 ease-out"
                                    priority
                                />
                                {/* Hover zoom hint */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Eye className="w-3 h-3" /> Hover to zoom
                                </div>
                                {/* Condition ribbon */}
                                {part.condition && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="outline" className={`${conditionColor(part.condition)} text-xs font-semibold px-3 py-1 uppercase tracking-wider`}>
                                            {part.condition}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-3">
                                {[0, 1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedThumb(i)}
                                        className={`w-20 h-20 bg-white border ${selectedThumb === i
                                            ? 'border-primary ring-2 ring-primary/30 shadow-md'
                                            : 'border-border/50 hover:border-primary/40'
                                            } rounded-xl cursor-pointer p-2 relative overflow-hidden transition-all duration-300`}
                                    >
                                        <Image src={part.image} alt={part.name} fill className={`object-contain p-1 ${selectedThumb === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─── RIGHT: Product Info ─── */}
                    <div className="w-full lg:w-[45%] flex flex-col">

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">{part.name}</h1>

                        {/* Rating Row */}
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <RatingStars rating={part.rating} />
                            <span className="text-sm font-medium text-primary cursor-pointer hover:underline transition-colors">{part.rating} out of 5</span>
                            <Separator orientation="vertical" className="h-4 hidden sm:block" />
                            <span className="text-sm text-muted-foreground">{part.reviews.toLocaleString()} ratings</span>
                        </div>

                        {/* Category */}
                        <Badge variant="secondary" className="w-fit px-3 py-1 text-xs bg-primary/10 text-primary uppercase tracking-widest mb-5">
                            {part.category}
                        </Badge>

                        <Separator className="mb-6 bg-border/50" />

                        {/* ─── Price Block ─── */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded">-16%</span>
                                <span className="text-muted-foreground text-sm line-through decoration-red-400/50">OMR {listPrice}</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-sm text-muted-foreground mt-1">OMR</span>
                                <span className="text-5xl font-black tabular-nums leading-none">{part.price.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-500 font-medium mt-2">
                                You save: OMR {savings} (16%)
                            </p>
                        </div>

                        {/* ─── Order from China notice ─── */}
                        {part.orderFromChina && (
                            <div className="text-sm font-medium text-amber-600 dark:text-amber-500 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex items-center gap-3 shadow-sm mb-6">
                                <span className="text-2xl">🌍</span>
                                <p><strong>Available by order from China</strong><br /><span className="opacity-80">Lower price option. Please allow extra time for international shipping.</span></p>
                            </div>
                        )}

                        {/* ─── About This Item ─── */}
                        <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" /> About this item
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        <strong className="text-foreground">Compatible with Nissan Altima {part.compatibleYears[0]}–{part.compatibleYears[1]}</strong>. Direct fit, no modifications required.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{part.description}</span>
                                </li>
                                {part.condition && (
                                    <li className="flex items-start gap-3">
                                        <Tag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">
                                            <strong className="text-foreground">Condition:</strong> {part.condition}
                                        </span>
                                    </li>
                                )}
                                <li className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        <strong className="text-foreground">Year Range:</strong> {part.compatibleYears[0]} – {part.compatibleYears[1]}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* ─── Buy Box (Amazon-style) ─── */}
                        <div className="border border-primary/20 bg-card rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

                            <div className="space-y-4 mb-6">
                                {/* Price inside buy box */}
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-black">OMR {part.price.toFixed(2)}</span>
                                </div>

                                {/* Delivery info */}
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold">
                                        <Truck className="w-4 h-4" /> FREE Delivery <strong>Tomorrow</strong>
                                    </p>
                                    <p className="text-muted-foreground">Or fastest delivery <strong className="text-foreground">Today</strong> within Muscat</p>
                                </div>

                                {/* Stock status */}
                                <p className={`text-lg font-bold ${part.inStock ? 'text-green-600 dark:text-green-500' : 'text-red-500'}`}>
                                    {part.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                                </p>

                                {/* Quantity selector */}
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-muted-foreground">Qty:</label>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="h-9 w-20 rounded-lg border border-input bg-background text-sm px-3 focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <Button
                                    size="lg"
                                    className="w-full text-lg h-14 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                                    onClick={handleAddToCart}
                                    disabled={!part.inStock}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {part.inStock ? 'Add to Cart' : 'Currently Unavailable'}
                                </Button>
                                <Link href="/checkout">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full text-base h-12 rounded-full font-semibold border-primary/30 hover:bg-primary/5 transition-all duration-300 mt-2"
                                        disabled={!part.inStock}
                                    >
                                        <Zap className="mr-2 h-4 w-4" /> Buy Now
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust signals */}
                            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-border/50">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-[11px] text-muted-foreground leading-tight">Secure<br />Transaction</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-[11px] text-muted-foreground leading-tight">Easy<br />Returns</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-[11px] text-muted-foreground leading-tight">NisElite<br />Guaranteed</span>
                                </div>
                            </div>

                            <p className="text-xs text-center mt-4 text-muted-foreground">Sold by <strong>NisElite Auto Parts</strong> · Ships from Oman</p>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    PRODUCT SPECIFICATIONS TABLE
                ═══════════════════════════════════════════════════════════ */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <Package className="h-6 w-6 text-primary" /> Product Specifications
                    </h2>
                    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    ['Part Name', part.name],
                                    ['Category', part.category],
                                    ['Condition', part.condition || 'N/A'],
                                    ['Compatible Years', `${part.compatibleYears[0]} – ${part.compatibleYears[1]}`],
                                    ['Rating', `${part.rating} / 5 (${part.reviews} reviews)`],
                                    ['Price', `OMR ${part.price.toFixed(2)}`],
                                    ['Availability', part.inStock ? 'In Stock' : 'Out of Stock'],
                                    ['International Order', part.orderFromChina ? 'Available from China (lower price)' : 'Ships locally from Oman'],
                                    ['Vehicle Model', 'Nissan Altima'],
                                    ['Seller', 'NisElite Auto Parts'],
                                ].map(([label, value], i) => (
                                    <tr key={label} className={i % 2 === 0 ? 'bg-muted/30' : ''}>
                                        <td className="px-6 py-3.5 font-semibold text-foreground w-[200px] border-r border-border/30">{label}</td>
                                        <td className="px-6 py-3.5 text-muted-foreground">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    RELATED PRODUCTS — "Customers who viewed this also viewed"
                ═══════════════════════════════════════════════════════════ */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Products related to this item</h2>
                        <Link href="/parts" className="text-sm font-medium text-primary hover:underline hidden sm:block">
                            View all parts →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedProducts.map(rp => (
                            <Link key={rp.id} href={`/parts/${rp.id}`} className="group block">
                                <Card className="h-full flex flex-col hover:border-primary/50 transition-all shadow-sm hover:shadow-lg bg-card overflow-hidden">
                                    <div className="aspect-square bg-white relative p-4 flex items-center justify-center border-b border-border/20">
                                        <Image
                                            src={rp.image}
                                            alt={rp.name}
                                            fill
                                            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="p-4 flex-grow flex flex-col">
                                        <h3 className="text-sm font-semibold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                            {rp.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <RatingStars rating={rp.rating} size="sm" />
                                            <span className="text-xs text-muted-foreground">({rp.reviews})</span>
                                        </div>
                                        {rp.condition && (
                                            <Badge variant="outline" className={`w-fit text-[10px] uppercase mb-2 ${conditionColor(rp.condition)}`}>
                                                {rp.condition}
                                            </Badge>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-auto">
                                            Fits {rp.compatibleYears[0]}–{rp.compatibleYears[1]}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-muted-foreground line-through mr-1">OMR {(rp.price * 1.2).toFixed(2)}</span>
                                            <span className="text-base font-black">OMR {rp.price.toFixed(2)}</span>
                                        </div>
                                        <Button
                                            size="icon"
                                            onClick={(e) => handleRelatedAddToCart(rp, e)}
                                            disabled={!rp.inStock}
                                            className="rounded-full shadow-md bg-primary hover:bg-primary/90 h-8 w-8 flex-shrink-0 z-20 group-hover:scale-110 transition-transform"
                                            title={rp.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        >
                                            <ShoppingCart className="h-3.5 w-3.5" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    RECENTLY VIEWED / "Inspired by your browsing"
                ═══════════════════════════════════════════════════════════ */}
                <div className="mt-16 mb-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Inspired by your browsing history</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {recentlyViewed.map(rv => (
                            <Link key={rv.id} href={`/parts/${rv.id}`} className="group block">
                                <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
                                    <div className="aspect-square bg-white relative p-3">
                                        <Image
                                            src={rv.image}
                                            alt={rv.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-400"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h4 className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                            {rv.name}
                                        </h4>
                                        <div className="flex items-center gap-1 mb-1">
                                            <RatingStars rating={rv.rating} size="sm" />
                                        </div>
                                        <p className="text-sm font-black">OMR {rv.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ─── Back to Store CTA ─── */}
                <div className="text-center mt-12 mb-4">
                    <Link href="/parts">
                        <Button variant="outline" size="lg" className="rounded-full px-10 gap-2 border-primary/20 hover:bg-primary/5">
                            <ArrowLeft className="h-4 w-4" /> Back to Parts Store
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
