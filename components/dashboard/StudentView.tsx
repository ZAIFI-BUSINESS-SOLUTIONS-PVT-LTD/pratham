"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ZoneCard } from "./ZoneCard";
import { StageTabs } from "./StageTabs";
import { InsightsSection } from "./InsightsSection";
import { ChevronDown, UserCircle } from "lucide-react";
import { StudentProfile, ParsedStageInsight, ParsedZoneData } from "@/lib/types";

interface StudentViewProps {
    students: StudentProfile[];
    exams: string[];
    selectedStudentId?: string;
    selectedExamId?: string;
    data?: {
        stages: Record<string, ParsedStageInsight>;
        zones: ParsedZoneData;
    };
    onSelectionChange: (studentId: string, examId: string) => void;
}

const STAGES = ["Early Stage", "Mid-Course Stage", "Pre-Exam Stage"];

/**
 * StudentView Component
 * Displays performance metrics and insights for an individual student.
 */
export function StudentView({ students, exams, selectedStudentId, selectedExamId, data, onSelectionChange }: StudentViewProps) {
    // Local state for the active stage tab (Early, Mid, Pre-Exam)
    const [activeStage, setActiveStage] = useState<string>(STAGES[0]);

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    // Event handlers for dropdown changes
    const handleStudentChange = (id: string) => {
        onSelectionChange(id, selectedExamId || "");
    };

    const handleExamChange = (id: string) => {
        onSelectionChange(selectedStudentId || "", id);
    };

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Top Controls: Student and Exam Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
                {/* Student Dropdown */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Student</label>
                    <div className="relative">
                        <select
                            className="w-full pl-4 pr-10 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                            value={selectedStudentId || ""}
                            onChange={(e) => handleStudentChange(e.target.value)}
                        >
                            <option value="">Select a student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
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
                            onChange={(e) => handleExamChange(e.target.value)}
                            disabled={!selectedStudentId}
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

            {/* Placeholder when no data is selected */}
            {!selectedStudent || !selectedExamId || !data ? (
                <div className="flex flex-col items-center justify-center h-48 md:h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-4 text-center">
                    <UserCircle className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-20" />
                    <p className="font-medium text-sm md:text-base">Select a student and exam to view performance data</p>
                </div>
            ) : (
                <>
                    {/* Performance Snapshot: High-level student info */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4 mb-6">
                            <CardTitle className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">Performance Snapshot</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Student Name</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{selectedStudent.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Batch</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{selectedStudent.batch}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Exams Attempted</p>
                                <div className="flex items-baseline space-x-2">
                                    <p className="text-2xl md:text-3xl font-extrabold text-primary">{selectedStudent.examsAttempted}</p>
                                    <span className="text-base md:text-lg font-medium text-slate-400">/ {selectedStudent.totalExams}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Focus & Steady Zones: Specific test insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ZoneCard
                            title="Focus Zone (This Test)"
                            items={data.zones.focus}
                            type="focus"
                        />
                        <ZoneCard
                            title="Steady Zone (This Test)"
                            items={data.zones.steady}
                            type="steady"
                        />
                    </div>

                    {/* Stage Insights: Long-term predictive and prescriptive data */}
                    <div className="pt-4 md:pt-6">
                        <StageTabs
                            stages={STAGES}
                            activeStage={activeStage}
                            onStageChange={setActiveStage}
                        />
                        <InsightsSection insights={data.stages[activeStage]} />
                    </div>
                </>
            )}
        </div>
    );
}
