import Link from 'next/link';
import { Car, Github, Twitter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                <Car className="h-6 w-6" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight">NisElite</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm">
                            Oman&apos;s trusted source for genuine Nissan Altima spare parts — fast delivery, fair prices, expert quality.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted hover:bg-muted/80">
                                <Github className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted hover:bg-muted/80">
                                <Twitter className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground cursor-pointer">
                            <li className="hover:text-foreground transition-colors"><Link href="/models">Browse Models</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/parts">Parts Store</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/compare">Compare Tool</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/quiz">Recommendation Quiz</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/about">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Account</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground cursor-pointer">
                            <li className="hover:text-foreground transition-colors"><Link href="/login">Sign In</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/register">Register</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/account">My Account</Link></li>
                            <li className="hover:text-foreground transition-colors"><Link href="/cart">Shopping Cart</Link></li>
                            <li className="hover:text-foreground transition-colors flex items-center gap-2"><Info className="h-3 w-3" /><Link href="/about">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} NisElite. Dedicated platform, not affiliated with Nissan Motor Co.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">
                        Built with <span className="text-primary mx-1">♥</span> for enthusiasts
                    </p>
                </div>
            </div>
        </footer>
    );
}
