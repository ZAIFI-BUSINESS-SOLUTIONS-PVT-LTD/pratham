"use client";

import { useState } from "react";
import {
    BATCHES,
    EXAMS,
    STAGES,
    MOCK_ZONES,
    MOCK_INSIGHTS,
    MOCK_COHORT_STATS
} from "@/lib/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ZoneCard } from "./ZoneCard";
import { StageTabs } from "./StageTabs";
import { InsightsSection } from "./InsightsSection";
import { ChevronDown, Users, Table as TableIcon, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BatchView() {
    const [selectedBatch, setSelectedBatch] = useState<string>(BATCHES[0]);
    const [selectedExam, setSelectedExam] = useState<string>(EXAMS[0]);
    const [activeStage, setActiveStage] = useState<string>(STAGES[0]);
    const [showRawTable, setShowRawTable] = useState(false);

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Top Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
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
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                        >
                            {EXAMS.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 md:top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Stage Dropdown */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Stage</label>
                    <div className="relative">
                        <select
                            className="w-full pl-4 pr-10 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                            value={activeStage}
                            onChange={(e) => setActiveStage(e.target.value)}
                        >
                            {STAGES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 md:top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Cohort Performance Overview */}
            <Card className="bg-white border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-4 mb-6">
                    <CardTitle className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">Cohort Performance Overview</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-full text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Students</p>
                            <p className="text-xl md:text-2xl font-bold text-slate-900">{MOCK_COHORT_STATS.totalStudents}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Exams Analyzed</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">{MOCK_COHORT_STATS.examsAnalyzed}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Coverage</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">{MOCK_COHORT_STATS.coverage}%</p>
                    </div>
                </div>
            </Card>

            {/* Cohort Focus & Steady Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ZoneCard
                    title="Cohort Focus Zone"
                    items={MOCK_ZONES.focus}
                    type="focus"
                />
                <ZoneCard
                    title="Cohort Steady Zone"
                    items={MOCK_ZONES.steady}
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
                <InsightsSection insights={MOCK_INSIGHTS[activeStage]} />
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
        </div>
    );
}
