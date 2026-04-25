'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart, ChevronRight, Lock } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const total = getCartTotal();
    const tax = total * 0.08;
    const grandTotal = total + tax;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground mr-1" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Looks like you haven't added any parts to your cart yet. Browse our huge selection of Nissan Altima parts.
                </p>
                <Link href="/parts">
                    <Button size="lg" className="rounded-full px-8 text-lg shadow-xl shadow-primary/20">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow space-y-6">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30 group">
                            <CardContent className="p-0 flex flex-col sm:flex-row">
                                <div className="w-full sm:w-48 aspect-square relative bg-white border-b sm:border-b-0 sm:border-r border-border/20 flex flex-shrink-0 items-center justify-center p-6">
                                    <Image src={item.image} alt={item.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-xl line-clamp-2 hover:text-primary transition-colors">
                                                <Link href={`/parts/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">{item.category}</p>
                                        </div>
                                        <p className="font-extrabold text-2xl tabular-nums">OMR {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-4 bg-muted/50 rounded-full p-1 border border-border/50">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full hover:bg-background/80 hover:text-primary"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >-</Button>
                                            <span className="w-6 text-center font-bold tabular-nums">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full hover:bg-background/80 hover:text-primary"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Amazon Style Checkout Box */}
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <div className="sticky top-24 bg-card border border-border/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />

                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)}):</span>
                                <span>OMR {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span>Shipping & handling:</span>
                                <span className="text-green-500 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span>Estimated tax:</span>
                                <span>OMR {tax.toFixed(2)}</span>
                            </div>
                            <Separator className="bg-border/60 my-2" />
                            <div className="flex justify-between items-center text-xl font-extrabold text-primary">
                                <span>Order total:</span>
                                <span>OMR {grandTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <Button
                                size="lg"
                                className="w-full h-14 text-lg rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group"
                            >
                                Proceed to Checkout <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Lock className="w-4 h-4" /> Secure Transactions
                        </div>
                        <p className="mt-4 text-[10px] text-center text-muted-foreground/60 leading-tight">
                            By placing your order, you agree to NisElite's privacy notice and conditions of use. You also agree to our return policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
