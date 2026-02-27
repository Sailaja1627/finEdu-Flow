import { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { GlobalNavigation } from './components/GlobalNavigation';
import { HeroStats } from './components/HeroStats';
import { UniversitySelector } from './components/UniversitySelector';
import { RepaymentSimulator } from './components/RepaymentSimulator';
import { VidyalaxmiBadge } from './components/VidyalaxmiBadge';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { Bell, Search, User } from 'lucide-react';

// Demo data for comparison
const SAMPLE_UNI1 = {
    name: 'IIT Bombay',
    avgSalary: 2500000,
    totalFees: 1000000,
    location: 'Mumbai, India'
};

const SAMPLE_UNI2 = {
    name: 'BITS Pilani',
    avgSalary: 2000000,
    totalFees: 2500000,
    location: 'Pilani, India'
};

function App() {
    const [isEligible, setIsEligible] = useState(true);

    useEffect(() => {
        // Staggered Entry Animation
        animate('.stagger-item', {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: stagger(100),
            easing: 'easeOutExpo',
            duration: 1000,
        });
    }, []);

    return (
        <div className="min-h-screen flex bg-background">
            <GlobalNavigation />

            <main className="flex-1 ml-64 p-8">
                {/* Top Header */}
                <header className="flex items-center justify-between mb-10 stagger-item">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Welcome back, Student</h1>
                        <p className="text-slate-400">Track your education flow and optimize your future.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-400/50 transition-all w-64"
                            />
                        </div>

                        <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,1)]" />
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right">
                                <p className="text-sm font-bold text-white">Aryan Sharma</p>
                                <p className="text-xs text-slate-500">Tier 1 Scholar</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-[1px]">
                                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                                    <User className="text-cyan-400 w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="max-w-[1400px] mx-auto space-y-8">
                    <HeroStats />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 space-y-8">
                            <ComparisonMatrix uni1={SAMPLE_UNI1} uni2={SAMPLE_UNI2} className="stagger-item" />
                            <RepaymentSimulator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 stagger-item">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Eligibility Status</h3>
                                    <VidyalaxmiBadge eligible={isEligible} />
                                    <button
                                        onClick={() => setIsEligible(!isEligible)}
                                        className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors"
                                    >
                                        Toggle Static Status (Demo Only)
                                    </button>
                                </div>
                                <div className="glass-card p-6 flex flex-col justify-center gap-4 group stagger-item">
                                    <h3 className="text-lg font-bold text-slate-100">Action: Refinance Early</h3>
                                    <p className="text-sm text-slate-400">Lock in a 0.5% lower rate with FinEdu-Flow partners.</p>
                                    <button className="neon-button-primary w-fit flex items-center gap-2 group">
                                        Explore Rates
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="xl:col-span-1 h-full">
                            <UniversitySelector />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
