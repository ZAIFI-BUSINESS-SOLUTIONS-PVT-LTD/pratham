"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ZoneCard } from "./ZoneCard";
import { StageTabs } from "./StageTabs";
import { InsightsSection } from "./InsightsSection";
import { ChevronDown, Users, Table as TableIcon, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CohortStats, ParsedStageInsight, ParsedZoneData } from "@/lib/types";

interface BatchViewProps {
    exams: string[];
    selectedExamId?: string;
    data?: {
        stats: CohortStats;
        stages: Record<string, ParsedStageInsight>;
        zones: ParsedZoneData;
    };
    onSelectionChange: (examId: string) => void;
}

const STAGES = ["Early Stage", "Mid-Course Stage", "Pre-Exam Stage"];
const BATCHES = ["CC Batch 1"]; // Hardcoded as per CSV

export function BatchView({ exams, selectedExamId, data, onSelectionChange }: BatchViewProps) {
    const [selectedBatch, setSelectedBatch] = useState<string>(BATCHES[0]);
    const [activeStage, setActiveStage] = useState<string>(STAGES[0]);
    const [showRawTable, setShowRawTable] = useState(false);

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Top Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
                {/* Batch Dropdown */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Batch</label>
                    <div className="relative">
                        <select
                            className="w-full pl-4 pr-10 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                        >
                            {BATCHES.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 md:top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Exam Dropdown */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Exam</label>
                    <div className="relative">
                        <select
                            className="w-full pl-4 pr-10 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                            value={selectedExamId || ""}
                            onChange={(e) => onSelectionChange(e.target.value)}
                        >
                            <option value="">Select an exam...</option>
                            {exams.map(e => (
                                <option key={e} value={e}>Exam {e}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 md:top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {!data ? (
                <div className="flex flex-col items-center justify-center h-48 md:h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-4 text-center">
                    <Users className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-20" />
                    <p className="font-medium text-sm md:text-base">Select an exam to view batch performance data</p>
                </div>
            ) : (
                <>
                    {/* Batch Performance Overview */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4 mb-6">
                            <CardTitle className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">Batch Performance Overview</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-50 rounded-full text-primary">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Students</p>
                                    <p className="text-xl md:text-2xl font-bold text-slate-900">{data.stats.totalStudents}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Exams Analyzed</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{data.stats.examsAnalyzed}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Batch Focus & Steady Zones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ZoneCard
                            title="Batch Focus Zone"
                            items={data.zones.focus}
                            type="focus"
                        />
                        <ZoneCard
                            title="Batch Steady Zone"
                            items={data.zones.steady}
                            type="steady"
                        />
                    </div>

                    {/* Stage Insights */}
                    <div className="pt-4 md:pt-6">
                        <StageTabs
                            stages={STAGES}
                            activeStage={activeStage}
                            onStageChange={setActiveStage}
                        />
                        <InsightsSection insights={data.stages[activeStage]} showUplift={false} />
                    </div>

                    {/* Raw Table (Optional) */}
                    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                        <button
                            onClick={() => setShowRawTable(!showRawTable)}
                            className="w-full flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            <div className="flex items-center space-x-3 font-bold text-slate-700">
                                <TableIcon className="w-5 h-5" />
                                <span>Raw Data Table</span>
                            </div>
                            {showRawTable ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </button>

                        <div className={cn(
                            "transition-all duration-300 ease-in-out",
                            showRawTable ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        )}>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-sm text-left min-w-[600px]">
                                    <thead className="text-xs font-bold text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Student ID</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Score</th>
                                            <th className="px-6 py-4">Percentile</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">STU-{100 + i}</td>
                                                <td className="px-6 py-4 text-slate-600">Student Name {i}</td>
                                                <td className="px-6 py-4 font-bold text-slate-900">{150 + i * 5}</td>
                                                <td className="px-6 py-4 text-slate-600">{85 + i}.5</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
