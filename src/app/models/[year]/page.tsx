'use client';


import Image from 'next/image';
import { Heart, Scale, ShieldCheck, Zap, Gauge, Map, ArrowRight } from 'lucide-react';
import { ALTIMA_MODELS } from '@/data/models';
import { useFavorites } from '@/store/useFavorites';
import { useCompare } from '@/store/useCompare';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModelDetailPage({ params }: { params: { year: string } }) {
    const { year: modelId } = params;
    const model = ALTIMA_MODELS.find(m => m.id === modelId);

    const { favorites, toggleFavorite } = useFavorites();
    const { selections, toggleCompare } = useCompare();

    if (!model) {
        return <div className="text-center py-32 text-2xl font-bold">Model Not Found</div>;
    }

    const isFav = favorites.includes(model.id);
    const isComp = selections.includes(model.id);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
            {/* Top Banner: Image & Quick Actions */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Nissan Altima {model.year}</h1>
                    <p className="text-lg text-muted-foreground mt-2">{model.generation}</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleFavorite(model.id)}
                        className={`rounded-full shadow-sm hover:shadow-md transition-all ${isFav ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-background hover:bg-muted'}`}
                    >
                        <Heart className={`h-5 w-5 ${isFav ? 'fill-primary' : ''}`} />
                    </Button>
                    <Button
                        onClick={() => toggleCompare(model.id)}
                        variant={isComp ? "default" : "outline"}
                        className="rounded-full gap-2 shadow-sm hover:shadow-md transition-all"
                    >
                        <Scale className="h-4 w-4" />
                        <span className="hidden sm:inline">{isComp ? 'In Compare Tray' : 'Add to Compare'}</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Main Gallery Placeholder */}
                <div className="relative aspect-[16/10] bg-gradient-to-tr from-muted/50 to-muted/10 rounded-3xl flex items-center justify-center p-8 border border-white/10 shadow-lg overflow-hidden glass-card group">
                    <Image
                        src={model.image}
                        alt={`Nissan Altima ${model.year}`}
                        fill
                        className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Quick Facts Row */}
                <div className="flex flex-col justify-center space-y-6">
                    <h3 className="text-2xl font-bold mb-2">Key Highlights</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg"><Zap className="h-5 w-5" /></div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Fuel Economy</p>
                                <p className="text-lg font-bold">{model.mpg}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg"><Gauge className="h-5 w-5" /></div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Top Engine</p>
                                <p className="text-lg font-bold">{model.engineOptions[model.engineOptions.length - 1]}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Safety Score</p>
                                <p className="text-lg font-bold text-green-500">{model.safetyScore.split('/')[0]}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg"><Map className="h-5 w-5" /></div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Reliability</p>
                                <p className="text-lg font-bold">{model.reliabilityScore}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Tabs */}
            <Tabs defaultValue="trims" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50 p-1 rounded-xl glass-card">
                    <TabsTrigger value="trims" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-foreground text-sm font-medium">Trims & Differences</TabsTrigger>
                    <TabsTrigger value="performance" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-foreground text-sm font-medium">Performance</TabsTrigger>
                    <TabsTrigger value="safety" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-foreground text-sm font-medium">Safety</TabsTrigger>
                    <TabsTrigger value="tech" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-foreground text-sm font-medium">Technology</TabsTrigger>
                </TabsList>

                {/* Tab: Trims */}
                <TabsContent value="trims" className="space-y-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                        <h3 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
                            <SparkleIcon /> Trim Differences Made Simple
                        </h3>
                        <p className="text-muted-foreground text-sm">See exactly what you gain as you move up the trim ladder.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {model.trims.map((trim, idx) => (
                            <Card key={trim.id} className="glass-card shadow-lg hover:border-primary/50 transition-colors relative h-full flex flex-col">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex justify-between items-center text-xl">
                                        <span>{trim.name}</span>
                                        <Badge variant={idx === 2 ? "default" : "secondary"}>{idx === 2 ? "Recommended" : "Trim"}</Badge>
                                    </CardTitle>
                                    <CardDescription className="text-base font-semibold text-primary">{trim.pricePlaceholder}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {trim.addsFromPrevious && trim.addsFromPrevious.length > 0 ? (
                                            <>
                                                <li className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 border-b border-border/50 pb-2 flex items-center gap-2">
                                                    <ArrowRight className="h-4 w-4" /> Adds from previous:
                                                </li>
                                                {trim.addsFromPrevious.map((add, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                                        <CheckIcon className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> {add}
                                                    </li>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <li className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 border-b border-border/50 pb-2">
                                                    Base Features:
                                                </li>
                                                {trim.features.map((feat, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                                        <CheckIcon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" /> {feat}
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab: Performance */}
                <TabsContent value="performance">
                    <Card className="glass-card">
                        <CardHeader><CardTitle>Performance Engineering</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {model.engineOptions.map((eng, i) => (
                                    <li key={i} className="flex p-4 bg-muted/30 rounded-lg items-center gap-3">
                                        <Gauge className="h-5 w-5 text-primary" /> <span className="font-semibold">{eng}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Safety */}
                <TabsContent value="safety">
                    <Card className="glass-card border-green-500/20">
                        <CardHeader><CardTitle className="text-green-500 flex items-center gap-2"><ShieldCheck /> Advanced Safety Systems</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {model.safetySystems.map((sys, i) => (
                                    <li key={i} className="flex p-4 bg-green-500/5 rounded-lg border border-green-500/10 items-center gap-3">
                                        <CheckIcon className="h-5 w-5 text-green-500" /> <span className="font-medium">{sys}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Technology */}
                <TabsContent value="tech">
                    <Card className="glass-card">
                        <CardHeader><CardTitle>Technology & Infotainment</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {model.techFeatures.map((tech, i) => (
                                    <li key={i} className="flex p-4 bg-muted/40 rounded-lg items-center text-center justify-center font-semibold text-sm">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function CheckIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    );
}

function SparkleIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles text-primary"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
}
