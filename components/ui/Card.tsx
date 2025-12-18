import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl border border-slate-200 shadow-card p-6 transition-shadow hover:shadow-card-hover",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: CardProps) {
    return (
        <div className={cn("mb-5 border-b border-slate-100 pb-3", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }: CardProps) {
    return (
        <h3
            className={cn(
                "text-lg font-bold text-slate-900 tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}
