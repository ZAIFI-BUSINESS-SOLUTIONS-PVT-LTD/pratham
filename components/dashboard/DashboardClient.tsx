"use client";

import { useRouter } from "next/navigation";
import { TopBar } from "@/components/dashboard/TopBar";
import { StudentView } from "@/components/dashboard/StudentView";
import { BatchView } from "@/components/dashboard/BatchView";
import { StudentProfile } from "@/lib/types";

interface DashboardClientProps {
    initialStudents: StudentProfile[];
    initialExams: string[];
    initialData: any;
    currentView: string;
    activeStudentId: string;
    activeExamId: string;
}

export function DashboardClient({
    initialStudents,
    initialExams,
    initialData,
    currentView,
    activeStudentId,
    activeExamId
}: DashboardClientProps) {
    const router = useRouter();

    const handleSelectionChange = (newStudentId: string, newExamId: string) => {
        const params = new URLSearchParams();
        params.set("view", "student");
        if (newStudentId) params.set("studentId", newStudentId);
        if (newExamId) params.set("examId", newExamId);
        router.push(`/dashboard?${params.toString()}`);
    };

    const handleBatchSelectionChange = (newExamId: string) => {
        const params = new URLSearchParams();
        params.set("view", "batch");
        if (newExamId) params.set("examId", newExamId);
        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <TopBar />
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {currentView === "student" ? (
                    <StudentView
                        students={initialStudents}
                        exams={initialExams}
                        selectedStudentId={activeStudentId}
                        selectedExamId={activeExamId}
                        data={initialData}
                        onSelectionChange={handleSelectionChange}
                    />
                ) : (
                    <BatchView
                        exams={initialExams}
                        selectedExamId={activeExamId}
                        data={initialData}
                        onSelectionChange={handleBatchSelectionChange}
                    />
                )}
            </main>
        </div>
    );
}
