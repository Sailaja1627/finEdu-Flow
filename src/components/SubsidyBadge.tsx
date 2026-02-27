import { ShieldCheck, Info } from 'lucide-react';
import { useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SubsidyBadgeProps {
    annualIncome: number;
}

export const SubsidyBadge = ({ annualIncome }: SubsidyBadgeProps) => {
    const subsidyInfo = useMemo(() => {
        if (annualIncome <= 450000) {
            return {
                label: 'CSIS ELIGIBLE',
                description: 'Full interest subsidy during moratorium (4.5L criteria met)',
                glow: 'shadow-[0_0_25px_rgba(168,85,247,0.5)] border-purple-500/50 text-purple-400',
                bg: 'bg-purple-500/20',
                iconColor: 'text-purple-400'
            };
        } else if (annualIncome <= 800000) {
            return {
                label: 'PM-VIDYALAXMI ELIGIBLE',
                description: '3% interest subvention active (8L criteria met)',
                glow: 'shadow-[0_0_25px_rgba(34,211,238,0.5)] border-cyan-400/50 text-cyan-400',
                bg: 'bg-cyan-400/20',
                iconColor: 'text-cyan-400'
            };
        }
        return null;
    }, [annualIncome]);

    if (!subsidyInfo) return null;

    return (
        <div className={cn(
            "stagger-item flex items-center gap-4 p-4 rounded-2xl border transition-all duration-700 backdrop-blur-md",
            subsidyInfo.bg,
            subsidyInfo.glow
        )}>
            <div className={cn("p-2 rounded-lg bg-white/10", subsidyInfo.iconColor)}>
                <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm tracking-widest">{subsidyInfo.label}</h4>
                <p className="text-xs text-slate-300 opacity-80">{subsidyInfo.description}</p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
        </div>
    );
};
