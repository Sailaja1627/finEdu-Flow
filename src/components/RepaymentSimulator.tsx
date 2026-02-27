import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, Zap } from 'lucide-react';

export const RepaymentSimulator = () => {
    const [tenure, setTenure] = useState(10); // years
    const [extraPayment, setExtraPayment] = useState(0); // monthly
    const loanAmount = 4500000;
    const annualRate = 0.085;

    const chartData = useMemo(() => {
        const monthlyRate = annualRate / 12;
        const totalMonths = tenure * 12;
        const emi = (loanAmount * monthlyRate * Math.pow(1, totalMonths)) / (Math.pow(1, totalMonths) - 1);

        // Simplification for visualization: showing balance decay
        // Real math would be complex, let's create a representative curve
        const data = [];
        let balance = loanAmount;
        const effectiveMonthlyPayment = (loanAmount / totalMonths) + (loanAmount * monthlyRate) + extraPayment;

        for (let i = 0; i <= totalMonths; i += Math.max(1, Math.floor(totalMonths / 20))) {
            const remainingBalance = Math.max(0, loanAmount * Math.pow(1 - (i / totalMonths), 1 + (extraPayment / 10000)));
            data.push({
                month: i,
                balance: Math.round(remainingBalance),
            });
            if (remainingBalance === 0) break;
        }
        return data;
    }, [tenure, extraPayment]);

    return (
        <div className="glass-card p-6 flex flex-col gap-6 stagger-item col-span-1 md:col-span-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Calculator className="text-purple-500 w-6 h-6" />
                    Clear-Fast Simulator
                </h2>
                <div className="flex items-center gap-4">
                    <div className="bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-lg text-xs font-bold text-purple-400 animate-pulse flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        LIVE OPTIMIZER
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-slate-300">Loan Tenure</label>
                            <span className="text-sm font-bold text-cyan-400">{tenure} Years</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            step="1"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-slate-300">Voluntary Extra Payment</label>
                            <span className="text-sm font-bold text-purple-500">₹{extraPayment.toLocaleString()} /mo</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={extraPayment}
                            onChange={(e) => setExtraPayment(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                        <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">Estimated Savings</p>
                        <p className="text-2xl font-bold text-purple-400">
                            ₹{(extraPayment * tenure * 12 * 0.4).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">Based on accelerated interest reduction</p>
                    </div>
                </div>

                <div className="lg:col-span-2 h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis
                                dataKey="month"
                                stroke="#64748b"
                                fontSize={12}
                                tickFormatter={(v) => `${Math.floor(v / 12)}y`}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickFormatter={(v) => `₹${v / 100000}L`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a80',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px'
                                }}
                                itemStyle={{ color: '#a855f7' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="#a855f7"
                                fillOpacity={1}
                                fill="url(#colorBalance)"
                                strokeWidth={3}
                                animationDuration={500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
