import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface NumberTickerProps {
    value: number;
    decimalPlaces?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export const NumberTicker = ({
    value,
    decimalPlaces = 0,
    prefix = '',
    suffix = '',
    className = ''
}: NumberTickerProps) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<any>(null); // Using any temporarily as v4 types might vary

    useEffect(() => {
        const obj = { val: 0 };

        if (animationRef.current) {
            animationRef.current.pause();
        }

        animationRef.current = animate(obj, {
            val: value,
            round: 1 / Math.pow(10, decimalPlaces),
            easing: 'easeOutExpo',
            duration: 2000,
            update: () => {
                if (spanRef.current) {
                    spanRef.current.innerText = `${prefix}${obj.val.toLocaleString(undefined, {
                        minimumFractionDigits: decimalPlaces,
                        maximumFractionDigits: decimalPlaces,
                    })}${suffix}`;
                }
            }
        });

        return () => {
            if (animationRef.current) animationRef.current.pause();
        };
    }, [value, decimalPlaces, prefix, suffix]);

    return (
        <span ref={spanRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
};
