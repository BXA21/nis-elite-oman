import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Car, ShieldCheck, Sparkles } from 'lucide-react';
import { SVGProps } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center text-center px-4">
        <div className="absolute inset-0 bg-nissan-split opacity-20 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

        <Badge />

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-6 max-w-4xl text-balance">
          Compare Nissan Altima <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
            2015–2025
          </span> in Seconds
        </h1>

        <p className="mt-8 text-xl text-muted-foreground max-w-2xl text-balance">
          Stop scrolling through endless forums and scattered specs. Discover exactly what changed year over year and find the perfect trim for your lifestyle.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/parts">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-primary/25">
              Shop Altima Parts <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/models">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto glass border-primary/20 hover:bg-primary/10">
              Compare Models
            </Button>
          </Link>
          <Link href="/quiz">
            <Button size="lg" variant="ghost" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto hover:bg-primary/5">
              Find My Best Altima
            </Button>
          </Link>
        </div>

        {/* Trust Section */}
        <div className="mt-16 flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 px-4 py-2 rounded-full border border-border/50">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Parts reliably sourced & Fulfilled perfectly like Amazon</span>
        </div>
      </section>

      {/* Value Proposition (Bento Grid Style) */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need to decide</h2>
          <p className="text-muted-foreground mt-4">Make purchasing an Altima simpler and more transparent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="glass-card border-border/50 shadow-xl overflow-hidden group">
            <CardContent className="p-8">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ScaleIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compare Years</h3>
              <p className="text-muted-foreground">
                Instantly spot the differences between a 2018 and 2021 model. Know exactly what upgrades were introduced.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 shadow-xl overflow-hidden group">
            <CardContent className="p-8">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Understand Trims</h3>
              <p className="text-muted-foreground">
                S vs SV vs SR vs SL vs Platinum. Our trim feature matrix makes it incredibly clear what you gain by moving up.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 shadow-xl overflow-hidden group">
            <CardContent className="p-8">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Take our 5-step quiz. Tell us your priorities (Safety, MPG, Tech, Budget) and we'll suggest your perfect Match.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Sparkles className="h-3.5 w-3.5" />
      <span>The Ultimate Buyer&apos;s Guide</span>
    </div>
  );
}

function ScaleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
