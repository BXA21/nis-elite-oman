'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Car, ChevronRight, ChevronLeft, Award, RefreshCw, Zap, ShieldAlert, Sparkles } from 'lucide-react';

type QuizState = {
    step: number;
    priority: string;
    safetyFocus: boolean;
    techFocus: boolean;
    performanceFocus: boolean;
};

export default function RecommendationQuizPage() {
    const [state, setState] = useState<QuizState>({
        step: 1,
        priority: '',
        safetyFocus: false,
        techFocus: false,
        performanceFocus: false,
    });

    const handleNext = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
    const handlePrev = () => setState(prev => ({ ...prev, step: prev.step - 1 }));
    const resetQuiz = () => setState({ step: 1, priority: '', safetyFocus: false, techFocus: false, performanceFocus: false });

    const getRecommendation = () => {
        // Very simple logic for MVP recommendation based on mock data
        if (state.performanceFocus) {
            return { year: 2023, trim: 'SR VC-Turbo', reason: 'You care about performance, and the 2.0L VC-Turbo delivers 248 hp with sport styling.' };
        }
        if (state.safetyFocus || state.techFocus) {
            return { year: 2023, trim: 'SL', reason: 'Top-tier tech (12.3-inch display) and standard ProPILOT Assist make the 2023 SL perfect for a modern, safe commute.' };
        }
        return { year: 2019, trim: 'SV', reason: 'A brilliant value pick. The 2019 SV introduced ProPILOT Assist and gets 39 MPG Highway without breaking the bank.' };
    };

    const renderStep = () => {
        switch (state.step) {
            case 1:
                return (
                    <div className="animate-in slide-in-from-right duration-500 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-center">What&apos;s your biggest priority?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'economy', label: 'Fuel Economy', icon: Zap, desc: 'Maximum MPG for commuting' },
                                { id: 'safety', label: 'Safety', icon: ShieldAlert, desc: 'Best ratings and assist features' },
                                { id: 'performance', label: 'Performance', icon: Sparkles, desc: 'Horsepower and handling' }
                            ].map(opt => (
                                <Card
                                    key={opt.id}
                                    className={`cursor-pointer transition-all border-2 ${state.priority === opt.id ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' : 'border-border/50 hover:border-primary/50'}`}
                                    onClick={() => setState(prev => ({ ...prev, priority: opt.id }))}
                                >
                                    <CardContent className="p-6 text-center flex flex-col items-center">
                                        <opt.icon className={`h-10 w-10 mb-4 ${state.priority === opt.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <h3 className="font-bold text-lg">{opt.label}</h3>
                                        <p className="text-sm text-muted-foreground mt-2">{opt.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex justify-end mt-12">
                            <Button onClick={handleNext} disabled={!state.priority} size="lg" className="rounded-full shadow-lg">
                                Next <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in slide-in-from-right duration-500 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Must-have features</h2>
                        <p className="text-center text-muted-foreground">Select all that apply.</p>
                        <div className="space-y-4 bg-muted/20 p-8 rounded-2xl border border-border/50">
                            <div className="flex items-center space-x-4 p-4 hover:bg-muted/40 rounded-xl transition-colors border border-transparent hover:border-border cursor-pointer" onClick={() => setState(prev => ({ ...prev, safetyFocus: !prev.safetyFocus }))}>
                                <Checkbox id="safetyFocus" checked={state.safetyFocus} />
                                <label htmlFor="safetyFocus" className="text-lg font-medium leading-none cursor-pointer flex-grow">
                                    ProPILOT Assist & Advanced Safety Shield
                                </label>
                            </div>
                            <div className="flex items-center space-x-4 p-4 hover:bg-muted/40 rounded-xl transition-colors border border-transparent hover:border-border cursor-pointer" onClick={() => setState(prev => ({ ...prev, techFocus: !prev.techFocus }))}>
                                <Checkbox id="techFocus" checked={state.techFocus} />
                                <label htmlFor="techFocus" className="text-lg font-medium leading-none cursor-pointer flex-grow">
                                    Large Touchscreen (12.3&quot;) & Wireless CarPlay
                                </label>
                            </div>
                            <div className="flex items-center space-x-4 p-4 hover:bg-muted/40 rounded-xl transition-colors border border-transparent hover:border-border cursor-pointer" onClick={() => setState(prev => ({ ...prev, performanceFocus: !prev.performanceFocus }))}>
                                <Checkbox id="perfFocus" checked={state.performanceFocus} />
                                <label htmlFor="perfFocus" className="text-lg font-medium leading-none cursor-pointer flex-grow">
                                    Turbocharged Engine (&gt;200 hp)
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-between mt-12">
                            <Button variant="outline" onClick={handlePrev} size="lg" className="rounded-full">
                                <ChevronLeft className="mr-2 w-5 h-5" /> Back
                            </Button>
                            <Button onClick={handleNext} size="lg" className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                                Get Recommendation <Sparkles className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                );
            case 3:
                const rec = getRecommendation();
                return (
                    <div className="animate-in zoom-in-95 duration-700 max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/20 text-primary rounded-full mb-4 shadow-xl shadow-primary/10">
                            <Award className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight">Your Perfect Match</h2>

                        <Card className="glass-card shadow-2xl border-primary/30 mt-8 overflow-hidden">
                            <div className="bg-gradient-to-r from-primary/20 to-transparent p-12 text-left relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center opacity-30 select-none pointer-events-none" style={{ backgroundImage: 'url(/images/cars/altima_2023.png)' }} />
                                <Badge variant="default" className="mb-4">Top Match</Badge>
                                <h3 className="text-4xl font-black mb-2">Nissan Altima {rec.year}</h3>
                                <p className="text-2xl font-semibold text-primary mb-6">Trim: {rec.trim}</p>
                                <p className="text-lg text-foreground/90 max-w-md leading-relaxed">
                                    {rec.reason}
                                </p>
                                <div className="mt-8 flex gap-4 relative z-10">
                                    <Link href={`/models/altima-${rec.year}`}>
                                        <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 px-8 text-lg font-bold">
                                            View full details <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        <div className="pt-8">
                            <Button variant="ghost" onClick={resetQuiz} className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-6">
                                <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-[1400px]">
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Find Your Perfect Altima</h1>
                <p className="text-xl text-muted-foreground">Answer a few quick questions and our engine will find the exact year and trim designed for your lifestyle.</p>
            </div>

            {/* Progress Bar (if not output step) */}
            {state.step < 3 && (
                <div className="max-w-md mx-auto mb-16 relative">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${(state.step / 2) * 100}%` }}
                        />
                    </div>
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground font-semibold">
                        <span>Step 1: Priority</span>
                        <span>Step 2: Features</span>
                    </div>
                </div>
            )}

            {renderStep()}
        </div>
    );
}
