"use client";

import { useState } from "react";
import {
    STUDENTS,
    EXAMS,
    STAGES,
    MOCK_ZONES,
    MOCK_INSIGHTS
} from "@/lib/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ZoneCard } from "./ZoneCard";
import { StageTabs } from "./StageTabs";
import { InsightsSection } from "./InsightsSection";
import { Search, UserCircle, ChevronDown } from "lucide-react";

export function StudentView() {
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");
    const [selectedExam, setSelectedExam] = useState<string>("");
    const [activeStage, setActiveStage] = useState<string>(STAGES[0]);
    const [searchQuery, setSearchQuery] = useState("");

    const selectedStudent = STUDENTS.find(s => s.id === selectedStudentId);

    const filteredStudents = STUDENTS.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Top Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
                {/* Student Dropdown */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Student</label>
                    <div className="relative">
                        <select
                            className="w-full pl-4 pr-10 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <option value="">Select a student...</option>
                            {filteredStudents.map(s => (
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
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            disabled={!selectedStudentId}
                        >
                            <option value="">Select an exam...</option>
                            {EXAMS.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 md:top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search Student</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 md:top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="w-full pl-10 pr-4 py-3 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {!selectedStudent || !selectedExam ? (
                <div className="flex flex-col items-center justify-center h-48 md:h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-4 text-center">
                    <UserCircle className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-20" />
                    <p className="font-medium text-sm md:text-base">Select a student and exam to view performance data</p>
                </div>
            ) : (
                <>
                    {/* Performance Snapshot */}
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

                    {/* Focus & Steady Zones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ZoneCard
                            title="Focus Zone (This Test)"
                            items={MOCK_ZONES.focus}
                            type="focus"
                        />
                        <ZoneCard
                            title="Steady Zone (This Test)"
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
                </>
            )}
        </div>
    );
}
