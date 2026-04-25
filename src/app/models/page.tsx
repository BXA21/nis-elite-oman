'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Scale, Filter, Search, ShieldAlert, Award, Zap } from 'lucide-react';
import { ALTIMA_MODELS } from '@/data/models';
import { useFavorites } from '@/store/useFavorites';
import { useCompare } from '@/store/useCompare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export default function BrowseModelsPage() {
    const { favorites, toggleFavorite } = useFavorites();
    const { selections, toggleCompare } = useCompare();

    // Basic Filter States (Placeholder functionality for MVP)
    const [yearRange, setYearRange] = useState([2015, 2025]);
    const [search, setSearch] = useState('');

    const filteredModels = ALTIMA_MODELS.filter(m =>
        m.year >= yearRange[0] &&
        m.year <= yearRange[1] &&
        m.id.toLowerCase().includes(search.toLowerCase())
    );

    const filterSidebarContent = (
        <div className="space-y-8">
            <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Year Range</h3>
                <Slider
                    defaultValue={[2015, 2025]}
                    min={2015}
                    max={2025}
                    step={1}
                    value={yearRange}
                    onValueChange={setYearRange}
                    className="my-6"
                />
                <div className="flex justify-between text-sm">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Engine Type</h3>
                <div className="space-y-3">
                    {['2.5L 4-Cylinder', '2.0L VC-Turbo', '3.5L V6'].map(engine => (
                        <div key={engine} className="flex items-center space-x-2">
                            <Checkbox id={engine} />
                            <label htmlFor={engine} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {engine}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Priorities</h3>
                <div className="space-y-3">
                    {['Fuel Economy', 'Safety Ratings', 'Performance', 'Latest Tech'].map(priority => (
                        <div key={priority} className="flex items-center space-x-2">
                            <Checkbox id={priority} />
                            <label htmlFor={priority} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {priority}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Browse Models</h1>
                    <p className="text-muted-foreground mt-2">Discover and compare Nissan Altima models from 2015 to 2025.</p>
                </div>

                {/* Mobile Filter */}
                <div className="md:hidden w-full flex items-center justify-between">
                    <span className="text-sm font-medium">{filteredModels.length} Models Found</span>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[80vh]">
                            <SheetHeader>
                                <SheetTitle>Filter Models</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8">
                                {filterSidebarContent}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block col-span-1 border-r pr-8">
                    <div className="sticky top-24">
                        {filterSidebarContent}
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="col-span-1 md:col-span-3">
                    <div className="hidden md:flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-muted-foreground">{filteredModels.length} Models Found</span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-full">Newest First</Button>
                            <Button variant="ghost" size="sm" className="rounded-full">Most Popular</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredModels.map((model) => {
                            const isFav = favorites.includes(model.id);
                            const isComp = selections.includes(model.id);

                            return (
                                <Card key={model.id} className="group overflow-hidden flex flex-col hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl bg-card/50 backdrop-blur-sm">
                                    <div className="relative aspect-[16/10] bg-muted/20 flex items-center justify-center p-4">
                                        {/* Placeholder for Image */}
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={model.image}
                                                alt={`Nissan Altima ${model.year}`}
                                                fill
                                                className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleFavorite(model.id)}
                                            className={`absolute top-2 right-2 rounded-full backdrop-blur-md ${isFav ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-background/40 hover:bg-background/80 text-foreground'}`}
                                        >
                                            <Heart className={`h-5 w-5 ${isFav ? 'fill-primary' : ''}`} />
                                        </Button>
                                    </div>

                                    <CardContent className="p-5 flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Link href={`/models/${model.id}`} className="hover:text-primary transition-colors">
                                                    <h2 className="text-xl font-bold">Altima {model.year}</h2>
                                                </Link>
                                                <p className="text-xs text-muted-foreground">{model.generation}</p>
                                            </div>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{model.mpg}</Badge>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {model.highlightBadges.slice(0, 2).map(badge => (
                                                <Badge key={badge} variant="secondary" className="text-[10px] px-2 py-0.5 whitespace-nowrap bg-muted">
                                                    {badge.includes('Safety') ? <ShieldAlert className="w-3 h-3 mr-1 text-green-500" /> : <Award className="w-3 h-3 mr-1 text-yellow-500" />}
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-5 pt-0 flex gap-2">
                                        <Button
                                            onClick={() => toggleCompare(model.id)}
                                            variant={isComp ? "default" : "outline"}
                                            className="w-full gap-2 transition-all"
                                        >
                                            <Scale className="h-4 w-4" />
                                            {isComp ? 'In Compare' : 'Compare'}
                                        </Button>
                                        <Link href={`/models/${model.id}`} className="w-full">
                                            <Button variant="secondary" className="w-full">
                                                Details
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
