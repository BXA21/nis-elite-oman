'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type ModelYear, ALTIMA_MODELS } from '@/data/models';
import { useCompare } from '@/store/useCompare';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Search } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ComparePage() {
    const { selections, removeCompare, clearCompare } = useCompare();
    const [onlyDifferences, setOnlyDifferences] = useState(false);

    const comparedModels = selections.map(id => ALTIMA_MODELS.find(m => m.id === id)!).filter(Boolean);

    if (comparedModels.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    <Search className="h-10 w-10 text-muted-foreground mr-1" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-4">Compare Tray Empty</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Add up to 4 models from the browse page to see a side-by-side breakdown of features, performance, and trims.
                </p>
                <Link href="/models">
                    <Button size="lg" className="rounded-full px-8 text-lg shadow-xl shadow-primary/20">
                        Browse Models
                    </Button>
                </Link>
            </div>
        );
    }

    // Pre-compute whether attributes differ across the selected models
    const isDifferent = (getter: (model: ModelYear) => any) => {
        if (comparedModels.length <= 1) return false;
        const firstVal = getter(comparedModels[0]);
        return comparedModels.some(m => getter(m) !== firstVal);
    };

    const renderRow = (label: string, getter: (model: ModelYear) => any, highlightDiff = false) => {
        const differs = isDifferent(getter);
        if (onlyDifferences && !differs) return null;

        return (
            <TableRow className={differs && highlightDiff ? "bg-primary/5 hover:bg-primary/10 transition-colors" : "hover:bg-muted/30 transition-colors"}>
                <TableCell className="font-semibold align-top w-[200px] border-r">
                    {label}
                </TableCell>
                {comparedModels.map(model => (
                    <TableCell key={model.id} className="align-top border-r last:border-0 text-muted-foreground font-medium">
                        {getter(model)}
                    </TableCell>
                ))}
            </TableRow>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Compare Models</h1>
                    <p className="text-muted-foreground">Detailed head-to-head comparison of your selected Altima years.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2 bg-muted/40 p-2 rounded-full border border-border/50">
                        <Switch id="differences" checked={onlyDifferences} onCheckedChange={setOnlyDifferences} />
                        <label htmlFor="differences" className="text-sm font-medium cursor-pointer pr-2">Highlight Differences</label>
                    </div>
                    <Button variant="ghost" onClick={clearCompare} className="text-muted-foreground hover:text-destructive">
                        Clear All
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto pb-8 relative">
                <Table className="border rounded-2xl overflow-hidden shadow-lg glass-card border-border/50">
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-2 border-primary/20">
                            <TableHead className="w-[200px] border-r"></TableHead>
                            {comparedModels.map(model => (
                                <TableHead key={model.id} className="min-w-[300px] border-r last:border-0 p-6 align-top">
                                    <div className="relative group">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeCompare(model.id)}
                                            className="absolute -top-4 -right-4 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                        <div className="aspect-[16/9] bg-muted/20 relative rounded-xl overflow-hidden mb-4 border border-white/5">
                                            <Image src={model.image} alt={model.year.toString()} fill className="object-contain p-2 hover:scale-105 transition-transform" />
                                        </div>
                                        <Link href={`/models/${model.id}`} className="hover:text-primary transition-colors inline-block">
                                            <h3 className="text-2xl font-bold tracking-tight">Altima {model.year}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{model.generation}</p>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="bg-muted/30"><TableCell colSpan={comparedModels.length + 1} className="font-bold text-lg py-4 pl-4 text-primary">Overview</TableCell></TableRow>
                        {renderRow('Starting Price Range', m => m.trims[0].pricePlaceholder, true)}
                        {renderRow('Fuel Economy', m => m.mpg, true)}
                        {renderRow('Reliability Score', m => m.reliabilityScore, true)}
                        {renderRow('Safety Score', m => m.safetyScore, true)}

                        <TableRow className="bg-muted/30"><TableCell colSpan={comparedModels.length + 1} className="font-bold text-lg py-4 pl-4 text-primary">Performance</TableCell></TableRow>
                        {renderRow('Base Engine', m => m.engineOptions[0], true)}
                        {renderRow('Available Upgrade', m => m.engineOptions[1] || 'None', true)}

                        <TableRow className="bg-muted/30"><TableCell colSpan={comparedModels.length + 1} className="font-bold text-lg py-4 pl-4 text-primary">Key Technology</TableCell></TableRow>
                        {renderRow('Top Features', m => (
                            <ul className="list-disc list-inside space-y-1">
                                {m.techFeatures.map((t: string, i: number) => <li key={i}>{t}</li>)}
                            </ul>
                        ), true)}

                        <TableRow className="bg-muted/30"><TableCell colSpan={comparedModels.length + 1} className="font-bold text-lg py-4 pl-4 text-primary">Safety Infrastructure</TableCell></TableRow>
                        {renderRow('Advanced Systems', m => (
                            <ul className="list-disc list-inside space-y-1">
                                {m.safetySystems.map((t: string, i: number) => <li key={i}>{t}</li>)}
                            </ul>
                        ), true)}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
