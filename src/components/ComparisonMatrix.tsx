import { TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface University {
    name: string;
    avgSalary: number;
    totalFees: number;
    location: string;
}

interface ComparisonMatrixProps {
    uni1: University;
    uni2: University;
    className?: string;
}

export const ComparisonMatrix = ({ uni1, uni2, className }: ComparisonMatrixProps) => {
    // Simple EMI calculation (assuming 10% interest for 10 years for demo)
    const calculateEMI = (principal: number) => {
        const rate = 0.1 / 12;
        const n = 120;
        return Math.round((principal * rate * Math.pow(1, rate)) / (Math.pow(1 + rate, n) - 1));
    };

    const emi1 = calculateEMI(uni1.totalFees);
    const emi2 = calculateEMI(uni2.totalFees);
    const roi1 = (uni1.avgSalary / uni1.totalFees).toFixed(2);
    const roi2 = (uni2.avgSalary / uni2.totalFees).toFixed(2);

    const MetricRow = ({ label, val1, val2, unit = '', higherIsBetter = true }: any) => {
        const v1 = parseFloat(val1.toString().replace(/[^0-9.]/g, ''));
        const v2 = parseFloat(val2.toString().replace(/[^0-9.]/g, ''));

        const is1Better = higherIsBetter ? v1 > v2 : v1 < v2;
        const is2Better = higherIsBetter ? v2 > v1 : v2 < v1;

        return (
            <div className="grid grid-cols-7 gap-4 py-4 border-b border-white/5 items-center">
                <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                <div className={cn("col-span-2 text-center font-bold px-3 py-1 rounded-lg transition-colors", is1Better ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300")}>
                    {unit}{val1}
                    {is1Better && <ArrowUpRight className="inline w-3 h-3 ml-1" />}
                </div>
                <div className="col-span-1 flex justify-center">
                    <div className="h-4 w-[1px] bg-white/10" />
                </div>
                <div className={cn("col-span-2 text-center font-bold px-3 py-1 rounded-lg transition-colors", is2Better ? "text-cyan-400 bg-cyan-400/10" : "text-slate-300")}>
                    {unit}{val2}
                    {is2Better && <ArrowUpRight className="inline w-3 h-3 ml-1" />}
                </div>
            </div>
        );
    };

    return (
        <div className={cn("glass-card p-6 overflow-hidden relative", className)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl -mr-32 -mt-32" />

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <TrendingUp className="text-purple-500 w-6 h-6" />
                    Comparison Matrix
                </h2>
                <div className="flex gap-2">
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 uppercase font-black">Beta</span>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-6">
                <div className="col-span-2" />
                <div className="col-span-2 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">{uni1.name[0]}</span>
                    </div>
                    <p className="text-sm font-bold text-white truncate px-2">{uni1.name}</p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center italic text-xs text-slate-500 font-bold">VS</div>
                </div>
                <div className="col-span-2 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent">{uni2.name[0]}</span>
                    </div>
                    <p className="text-sm font-bold text-white truncate px-2">{uni2.name}</p>
                </div>
            </div>

            <div className="space-y-1">
                <MetricRow label="Est. Monthly EMI" val1={emi1.toLocaleString()} val2={emi2.toLocaleString()} unit="₹" higherIsBetter={false} />
                <MetricRow label="ROI Efficiency" val1={roi1} val2={roi2} unit="x" />
                <MetricRow label="Avg Placement" val1={(uni1.avgSalary / 100000).toFixed(1)} val2={(uni2.avgSalary / 100000).toFixed(1)} unit="₹" suffix="L" />
            </div>

            <div className="mt-8 p-4 bg-cyan-400/5 border border-cyan-400/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                        <IndianRupee className="text-cyan-400 w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Winner by Value</p>
                        <p className="text-sm font-bold text-white">{parseFloat(roi1) > parseFloat(roi2) ? uni1.name : uni2.name}</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
                    View Detailed Math <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
