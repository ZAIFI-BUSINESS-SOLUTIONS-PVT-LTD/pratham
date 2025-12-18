import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { StageInsights } from "@/lib/data";
import { Lightbulb, ClipboardList, TrendingUp } from "lucide-react";

interface InsightsSectionProps {
    insights: StageInsights;
}

export function InsightsSection({ insights }: InsightsSectionProps) {
    if (!insights) return <div className="text-slate-400 text-sm p-4 border border-dashed border-slate-300 rounded-lg">No data available for this stage.</div>;

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header with Uplift Potential - HERO STYLE */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                        <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">Score Uplift Potential</h4>
                        <p className="text-sm text-slate-500">Estimated gain if actions are taken</p>
                    </div>
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-primary tracking-tighter">
                    +{insights.upliftPotential}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Predictive Insight */}
                <Card className="border-t-4 border-t-indigo-500">
                    <CardHeader className="flex flex-row items-center space-x-3 pb-4">
                        <Lightbulb className="w-6 h-6 text-indigo-600" />
                        <CardTitle className="text-indigo-900">Predictive Insight</CardTitle>
                    </CardHeader>
                    <ul className="space-y-4">
                        {insights.predictive.map((item, i) => (
                            <li key={i} className="flex items-start space-x-3 text-sm font-medium text-slate-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Prescriptive Actions */}
                <Card className="border-t-4 border-t-teal-500">
                    <CardHeader className="flex flex-row items-center space-x-3 pb-4">
                        <ClipboardList className="w-6 h-6 text-teal-600" />
                        <CardTitle className="text-teal-900">Prescriptive Actions</CardTitle>
                    </CardHeader>
                    <ul className="space-y-4">
                        {insights.prescriptive.map((item, i) => (
                            <li key={i} className="flex items-start space-x-3 text-sm font-medium text-slate-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
}
