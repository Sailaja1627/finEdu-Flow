import { LayoutDashboard, GraduationCap, PiggyBank, Target, Settings, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: GraduationCap, label: 'Loan Planner', active: false },
    { icon: PiggyBank, label: 'Budget', active: false },
    { icon: Target, label: 'Clear-Fast Strategy', active: false },
];

export const GlobalNavigation = () => {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-white/10 flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Target className="text-slate-950 w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    FinEdu-Flow
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                            item.active
                                ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                            item.active ? "text-cyan-400" : "text-slate-400"
                        )} />
                        <span className="font-medium">{item.label}</span>
                        {item.active && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
                        )}
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-2 pt-6 border-t border-white/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10">
                <p className="text-xs text-cyan-300 font-semibold mb-1 uppercase tracking-wider">Pro Tip</p>
                <p className="text-xs text-slate-300">Switch to CSIS criteria to see if you quality for 1% interest rebate.</p>
            </div>
        </aside>
    );
};
