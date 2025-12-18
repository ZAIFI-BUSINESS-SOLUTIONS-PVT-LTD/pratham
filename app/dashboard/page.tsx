import { Suspense } from "react";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getAllStudents, getAllExams, getStudentData, getBatchData } from "@/lib/data-service";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ searchParams }: PageProps) {
    const students = getAllStudents();
    const exams = getAllExams();

    const view = (searchParams.view as string) || "student";

    let data = null;
    let activeStudentId = "";
    let activeExamId = "";

    if (view === "student") {
        // Default to first student/exam if not provided
        activeStudentId = (searchParams.studentId as string) || (students.length > 0 ? students[0].id : "");
        activeExamId = (searchParams.examId as string) || (exams.length > 0 ? exams[0] : "");

        if (activeStudentId && activeExamId) {
            data = getStudentData(activeStudentId, activeExamId);
        }
    } else {
        // Default to first exam if not provided
        activeExamId = (searchParams.examId as string) || (exams.length > 0 ? exams[0] : "");
        if (activeExamId) {
            data = getBatchData("CC Batch 1", activeExamId);
        }
    }

    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading dashboard...</div>}>
            <DashboardClient
                initialStudents={students}
                initialExams={exams}
                initialData={data}
                currentView={view}
                activeStudentId={activeStudentId}
                activeExamId={activeExamId}
            />
        </Suspense>
    );
}
