'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useProducts } from '@/store/useProducts';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ArrowLeft, Star, StarHalf, Truck, ShieldCheck, ShoppingCart, Lock } from 'lucide-react';
import { toast } from 'sonner';


export default function PartDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const { products } = useProducts();
    const part = products.find(p => p.id === id);
    const addToCart = useCart((state) => state.addToCart);

    if (!part) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart(part);
        toast.success(`${part.name} added to cart!`, {
            description: "Your item is ready for checkout.",
            action: {
                label: "Checkout",
                onClick: () => window.location.href = "/cart",
            },
        });
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) stars.push(<Star key={`f-${i}`} className="w-5 h-5 fill-yellow-500 text-yellow-500" />);
        if (hasHalf) stars.push(<StarHalf key="h" className="w-5 h-5 fill-yellow-500 text-yellow-500" />);
        return <div className="flex items-center gap-1">{stars}</div>;
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in zoom-in-95 duration-500">
            <Link href="/parts" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Parts Store
            </Link>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                {/* Product Images (Amazon Style Left Side) */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="sticky top-24">
                        <div className="aspect-square bg-white border border-border/50 rounded-3xl p-8 flex items-center justify-center relative shadow-lg">
                            <Image
                                src={part.image}
                                alt={part.name}
                                fill
                                className="object-contain p-12 hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                        {/* Thumbnails (Dummy) */}
                        <div className="flex gap-4 mt-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`w-20 h-20 bg-white border ${i === 1 ? 'border-primary ring-2 ring-primary/20' : 'border-border/50 hover:border-primary/50'} rounded-xl cursor-pointer p-2 relative overflow-hidden transition-all duration-300`}>
                                    <Image src={part.image} alt={part.name} fill className="object-cover opacity-70 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Details (Amazon Style Right Side) */}
                <div className="w-full md:w-1/2 flex flex-col pt-2">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{part.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary uppercase tracking-widest">{part.category}</Badge>
                        <div className="flex items-center gap-2">
                            {renderStars(part.rating)}
                            <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-300 line-underline">{part.rating} ({part.reviews} ratings)</span>
                        </div>
                    </div>

                    <Separator className="my-6 bg-border/50" />

                    {(part.condition || part.orderFromChina) && (
                        <div className="flex flex-col gap-3 mb-6">
                            {part.condition && (
                                <Badge variant="outline" className="w-fit bg-secondary/20 uppercase tracking-wider text-xs px-3 py-1 border-primary/20">
                                    Condition: {part.condition}
                                </Badge>
                            )}
                            {part.orderFromChina && (
                                <div className="text-sm font-medium text-amber-600 dark:text-amber-500 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 flex items-center gap-3 shadow-sm">
                                    <span className="text-2xl">🌍</span>
                                    <p><strong>Available by order from China</strong><br/><span className="opacity-80">This is a lower price option. Please allow extra time for international shipping.</span></p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-8">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-sm text-red-500 font-bold mb-1">-16%</span>
                            <span className="text-5xl font-black tabular-nums">OMR {part.price.toFixed(2)}</span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            List Price: <span className="line-through decoration-red-500/50">OMR {(part.price * 1.2).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="glass-card bg-muted/20 border border-border/50 rounded-2xl p-6 mb-8 space-y-4">
                        <h3 className="font-bold text-lg mb-2">Item Features:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <ChevronRight className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground"><strong className="text-foreground">Compatible with Nissan Altima {part.compatibleYears[0]}–{part.compatibleYears[1]}</strong>. Direct fit replacement.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ChevronRight className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground"><strong className="text-foreground">About this item:</strong> {part.description}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Amazon Buy Box Simulation */}
                    <div className="border border-primary/20 bg-card rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col mt-auto">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>

                        <div className="mb-6 flex gap-2 w-full justify-between items-center text-sm">
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-green-500 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> In Stock.</span>
                                <span className="text-muted-foreground flex items-center gap-1"><Truck className="w-4 h-4" /> FREE Delivery <strong>Tomorrow</strong>.</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="flex items-center text-muted-foreground gap-1"><Lock className="w-4 h-4" /> Secure txn</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full text-lg h-14 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                            onClick={handleAddToCart}
                            disabled={!part.inStock}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <p className="text-xs text-center mt-4 text-muted-foreground">Sold by NisElite Auto Parts and Fulfilled by Amazon Shipping Network.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
