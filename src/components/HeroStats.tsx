import { Landmark, TrendingUp, ShieldCheck } from 'lucide-react';
import { NumberTicker } from './NumberTicker';

const stats = [
    {
        label: 'Total Loan Estimate',
        value: 4500000,
        prefix: '₹',
        icon: Landmark,
        accent: 'cyan',
    },
    {
        label: 'Effective Monthly EMI',
        value: 42500,
        prefix: '₹',
        icon: TrendingUp,
        accent: 'purple',
    },
    {
        label: 'PM-Vidyalaxmi Eligibility',
        value: 1, // 1 for Eligible
        suffix: '',
        icon: ShieldCheck,
        accent: 'cyan',
        isEligibilityCard: true,
    },
];

export const HeroStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-item">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="glass-card p-6 flex flex-col gap-4 relative group overflow-hidden"
                >
                    {/* Subtle background glow */}
                    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${stat.accent === 'cyan' ? 'bg-cyan-400' : 'bg-purple-500'
                        }`} />

                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${stat.accent === 'cyan' ? 'bg-cyan-400/10 text-cyan-400' : 'bg-purple-500/10 text-purple-500'
                            }`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        {stat.isEligibilityCard && (
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                ACTIVE
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                        {stat.isEligibilityCard ? (
                            <h3 className="text-2xl font-bold text-slate-100 italic">High Eligibility</h3>
                        ) : (
                            <h3 className="text-3xl font-bold text-slate-100 flex items-baseline gap-1">
                                <NumberTicker
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    className={stat.accent === 'cyan' ? 'text-white' : 'text-slate-100'}
                                />
                            </h3>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-400 font-semibold">↑ 12%</span>
                        <span className="text-slate-500 text">vs last month</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
