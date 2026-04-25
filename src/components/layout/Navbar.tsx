'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Scale, Car, Sparkles, Menu, ShoppingCart, User, LogIn, LogOut, Shield } from 'lucide-react';
import { useFavorites } from '@/store/useFavorites';
import { useCompare } from '@/store/useCompare';
import { useCart } from '@/store/useCart';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { toast } from 'sonner';

const navItems = [
    { name: 'Browse Models', href: '/models', icon: Car },
    { name: 'Parts Store', href: '/parts', icon: ShoppingCart },
    { name: 'Compare Specs', href: '/compare', icon: Scale },
    { name: 'Find My Match', href: '/quiz', icon: Sparkles },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const favoritesCount = useFavorites((state) => state.favorites.length);
    const compareCount = useCompare((state) => state.selections.length);
    const cartCount = useCart((state) => state.getCartCount());
    const { currentUser, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('You have been logged out.');
        router.push('/');
    };

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background border-transparent"
        )}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <img
                        src="/nissan-logo-square.jpg"
                        alt="Nissan Genuine Parts"
                        className="rounded-md group-hover:scale-105 transition-all duration-300 mix-blend-multiply dark:mix-blend-screen dark:invert"
                        style={{height: '68px', width: 'auto', objectFit: 'contain'}}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions (Desktop & Mobile) */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                            <ShoppingCart className={cn("h-5 w-5", pathname === '/cart' && "fill-primary text-primary")} />
                            {cartCount > 0 && (
                                <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full border-2 border-background animate-in zoom-in">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>
                    </Link>

                    <ThemeToggle />

                    {/* Auth */}
                    {currentUser ? (
                        <>
                            <Link href={currentUser.role === 'admin' ? '/admin' : '/account'} className="hidden sm:block">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    {currentUser.role === 'admin' ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                    <span className="max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleLogout}
                                className="hidden sm:flex text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                aria-label="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/20">
                                <LogIn className="h-4 w-4" /> Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-6 py-6">
                                <Link href="/" className="flex items-center">
                                    <img
                                        src="/nissan-logo-square.jpg"
                                        alt="Nissan Genuine Parts"
                                        className="rounded-lg mix-blend-multiply dark:mix-blend-screen dark:invert"
                                        style={{height: '68px', width: '68px', objectFit: 'contain', objectPosition: 'center center'}}
                                    />
                                </Link>

                                {/* User info in mobile */}
                                {currentUser && (
                                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                                        {currentUser.role === 'admin' ? (
                                            <Shield className="h-5 w-5 text-primary shrink-0" />
                                        ) : (
                                            <User className="h-5 w-5 text-primary shrink-0" />
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm truncate">{currentUser.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                                        </div>
                                    </div>
                                )}

                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname.startsWith(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "text-base font-medium transition-colors hover:text-primary flex items-center gap-3 p-2 rounded-md",
                                                    isActive ? "bg-primary/10 text-primary" : "text-foreground"
                                                )}
                                            >
                                                <Icon className="h-5 w-5" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                    <Link
                                        href="/cart"
                                        className="text-base font-medium transition-colors hover:text-primary flex items-center justify-between p-2 rounded-md text-foreground border-t mt-2 pt-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ShoppingCart className="h-5 w-5" /> Shopping Cart
                                        </div>
                                        {cartCount > 0 && <Badge variant="default">{cartCount}</Badge>}
                                    </Link>

                                    {currentUser ? (
                                        <>
                                            <Link
                                                href={currentUser.role === 'admin' ? '/admin' : '/account'}
                                                className="text-base font-medium flex items-center gap-3 p-2 rounded-md text-foreground hover:text-primary"
                                            >
                                                {currentUser.role === 'admin' ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                                {currentUser.role === 'admin' ? 'Admin Panel' : 'My Account'}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="text-base font-medium flex items-center gap-3 p-2 rounded-md text-destructive hover:bg-destructive/10 text-left w-full"
                                            >
                                                <LogOut className="h-5 w-5" /> Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex gap-2 mt-2 border-t pt-4">
                                            <Link href="/login" className="flex-1">
                                                <Button className="w-full rounded-full" size="sm">
                                                    <LogIn className="h-4 w-4 mr-2" /> Sign In
                                                </Button>
                                            </Link>
                                            <Link href="/register" className="flex-1">
                                                <Button variant="outline" className="w-full rounded-full" size="sm">Register</Button>
                                            </Link>
                                        </div>
                                    )}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
