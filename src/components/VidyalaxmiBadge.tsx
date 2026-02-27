import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface VidyalaxmiBadgeProps {
    eligible: boolean;
    className?: string;
}

export const VidyalaxmiBadge = ({ eligible, className }: VidyalaxmiBadgeProps) => {
    const badgeRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<any>(null);

    useEffect(() => {
        if (eligible && badgeRef.current) {
            pulseRef.current = animate(badgeRef.current, {
                boxShadow: [
                    '0 0 0px rgba(34, 211, 238, 0)',
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                    '0 0 0px rgba(34, 211, 238, 0)'
                ],
                opacity: [0.8, 1, 0.8],
                duration: 2000,
                easing: 'easeInOutSine',
                loop: true
            });
        } else if (pulseRef.current) {
            pulseRef.current.pause();
        }

        return () => {
            if (pulseRef.current) pulseRef.current.pause();
        };
    }, [eligible]);

    return (
        <div
            ref={badgeRef}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500",
                eligible
                    ? "bg-cyan-400/10 border-cyan-400/50 text-cyan-400"
                    : "bg-slate-800/50 border-white/5 text-slate-500 grayscale",
                className
            )}
        >
            <ShieldCheck className={cn("w-4 h-4", eligible && "animate-pulse")} />
            <span className="text-xs font-bold uppercase tracking-wider">
                PM-Vidyalaxmi {eligible ? 'Eligible' : 'Not Eligible'}
            </span>
        </div>
    );
};
