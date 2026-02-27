import { Search, GraduationCap, MapPin, Star, Info, TrendingUp, DollarSign } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface University {
    name: string;
    location: string;
    rating: number;
    avgSalary: number; // in INR
    totalFees: number; // in INR
    avgPackageLabel: string;
    tags: string[];
}

const universities: University[] = [
    {
        name: 'IIT Bombay',
        location: 'Mumbai, India',
        rating: 4.8,
        avgSalary: 2500000,
        totalFees: 1000000,
        avgPackageLabel: '25L+',
        tags: ['High ROI', 'Tier 1'],
    },
    {
        name: 'BITS Pilani',
        location: 'Pilani, India',
        rating: 4.6,
        avgSalary: 2000000,
        totalFees: 2500000,
        avgPackageLabel: '20L+',
        tags: ['Premium', 'Tier 1'],
    },
    {
        name: 'Stanford University',
        location: 'California, USA',
        rating: 4.9,
        avgSalary: 10000000, // $120k
        totalFees: 20000000, // ~$240k for degree
        avgPackageLabel: '120k$',
        tags: ['Ivy League', 'Global'],
    },
];

interface InfoCardProps {
    uni: University;
    onClose: () => void;
}

const InfoCard = ({ uni, onClose }: InfoCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const roi = (uni.avgSalary / uni.totalFees).toFixed(2);

    useEffect(() => {
        if (cardRef.current) {
            animate(cardRef.current, {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutBack'
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}>
            <div
                ref={cardRef}
                className="glass-card p-8 max-w-md w-full border-cyan-400/30 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl -mr-16 -mt-16" />

                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{uni.name}</h3>
                        <p className="text-slate-400 flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4" /> {uni.location}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">&times;</button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Avg Salary</p>
                            <p className="text-xl font-bold text-cyan-400">₹{(uni.avgSalary / 100000).toFixed(1)}L</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Fees</p>
                            <p className="text-xl font-bold text-purple-400">₹{(uni.totalFees / 100000).toFixed(1)}L</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-400/20 to-purple-500/20 p-6 rounded-2xl border border-cyan-400/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                                <TrendingUp className="text-cyan-400 w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-100 uppercase tracking-tighter">ROI Score</p>
                                <p className="text-xs text-slate-400">Efficiency Ratio</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                {roi}
                            </span>
                            <p className="text-[10px] text-cyan-500/70 font-bold">AVG SALARY / FEES</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full neon-button-primary"
                    >
                        Close Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

export const UniversitySelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeUni, setActiveUni] = useState<University | null>(null);

    const filteredUniversities = universities.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="glass-card p-6 flex flex-col gap-6 stagger-item h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <GraduationCap className="text-cyan-400 w-6 h-6" />
                        Institution ROI
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors w-40"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 flex-1">
                    {filteredUniversities.map((uni) => {
                        const roi = (uni.avgSalary / uni.totalFees).toFixed(1);
                        return (
                            <div
                                key={uni.name}
                                className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all group cursor-pointer border border-white/5"
                                onClick={() => setActiveUni(uni)}
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="text-xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                        {uni.name[0]}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-100 text-sm mb-0.5 truncate flex items-center gap-2">
                                        {uni.name}
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    </h3>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">ROI: {roi}x</p>
                                </div>

                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                                    <Info className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {activeUni && (
                <InfoCard
                    uni={activeUni}
                    onClose={() => setActiveUni(null)}
                />
            )}
        </>
    );
};
