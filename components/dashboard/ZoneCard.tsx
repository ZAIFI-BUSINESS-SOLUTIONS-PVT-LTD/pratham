import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface ZoneCardProps {
    title: string;
    items: string[];
    type: "focus" | "steady";
}

export function ZoneCard({ title, items, type }: ZoneCardProps) {
    const isFocus = type === "focus";
    const accentColor = isFocus ? "bg-amber-500" : "bg-emerald-500";
    const textColor = isFocus ? "text-amber-700" : "text-emerald-700";

    return (
        <Card className="h-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${accentColor}`} />
            <CardHeader className="border-b-0 pb-0 mb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{title}</CardTitle>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-opacity-10 ${accentColor.replace('bg-', 'bg-')} ${textColor}`}>
                        {isFocus ? "NEEDS ATTENTION" : "ON TRACK"}
                    </span>
                </div>
            </CardHeader>
            {items && items.length > 0 ? (
                <ul className="space-y-4">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm font-medium text-slate-700">
                            <span className={`mt-1.5 w-2 h-2 rounded-full ${accentColor} shrink-0`} />
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-sm text-slate-400 italic">No data available</div>
            )}
        </Card>
    );
}
