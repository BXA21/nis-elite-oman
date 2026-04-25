'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ALTIMA_MODELS } from '@/data/models';
import { useFavorites } from '@/store/useFavorites';
import { useCompare } from '@/store/useCompare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { HeartOff, Scale, ChevronRight, Archive } from 'lucide-react';

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
    const { selections, toggleCompare } = useCompare();

    const favoriteModels = ALTIMA_MODELS.filter(m => favorites.includes(m.id));

    if (favoriteModels.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-muted p-6 rounded-full mb-8 relative mb-8">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
                    <Archive className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Your Garage is Empty</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-md">
                    Save your favorite Nissan Altima models while you browse to easily compare them later.
                </p>
                <Link href="/models">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                        Browse Models <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-border/50 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Shortlist</h1>
                    <p className="text-lg text-muted-foreground">Keep track of the models you&apos;re most interested in.</p>
                </div>
                <div className="text-sm font-medium bg-muted/50 px-4 py-2 rounded-full border border-border">
                    {favoriteModels.length} Saved Model{favoriteModels.length !== 1 && 's'}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favoriteModels.map(model => {
                    const isComp = selections.includes(model.id);

                    return (
                        <Card key={model.id} className="group overflow-hidden flex flex-col hover:border-primary/50 transition-all shadow-lg hover:shadow-xl bg-card/60 backdrop-blur-md">
                            <div className="relative aspect-[16/10] bg-gradient-to-tr from-muted/30 to-muted/5 flex items-center justify-center p-4 border-b border-white/5">
                                <Image
                                    src={model.image}
                                    alt={`Nissan Altima ${model.year}`}
                                    fill
                                    className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out p-4"
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    onClick={() => removeFavorite(model.id)}
                                    title="Remove from favorites"
                                >
                                    <HeartOff className="h-4 w-4" />
                                </Button>
                            </div>

                            <CardContent className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <Link href={`/models/${model.id}`} className="hover:text-primary transition-colors inline-block">
                                            <h2 className="text-2xl font-bold tracking-tight">Altima {model.year}</h2>
                                        </Link>
                                        <p className="text-sm font-medium text-muted-foreground">{model.generation}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-background/50 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">MPG:</span>
                                        <span className="font-bold">{model.mpg}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Safety:</span>
                                        <span className="font-bold text-green-500">{model.safetyScore.split('/')[0]}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 flex gap-3">
                                <Button
                                    onClick={() => toggleCompare(model.id)}
                                    variant={isComp ? "default" : "outline"}
                                    className="w-full gap-2 transition-all font-semibold"
                                >
                                    <Scale className="h-4 w-4" />
                                    {isComp ? 'In Tray' : 'Compare'}
                                </Button>
                                <Link href={`/models/${model.id}`} className="w-full">
                                    <Button variant="secondary" className="w-full font-semibold bg-muted hover:bg-muted/80">
                                        Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
