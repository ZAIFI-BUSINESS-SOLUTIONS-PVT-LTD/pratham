import { Suspense } from "react";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getAllStudents, getAllExams, getStudentData, getBatchData } from "@/lib/data-service";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * The main Dashboard Page (Server Component).
 * Responsible for:
 * 1. Reading URL search parameters (view, studentId, examId).
 * 2. Fetching the initial data from the CSV data service.
 * 3. Passing the data to the DashboardClient for rendering.
 */
export default function DashboardPage({ searchParams }: PageProps) {
    // Fetch base lists for dropdowns
    const students = getAllStudents();
    const exams = getAllExams();

    // Determine current view (student or batch)
    const view = (searchParams.view as string) || "student";

    let data = null;
    let activeStudentId = "";
    let activeExamId = "";

    if (view === "student") {
        // Resolve active student and exam for Student View
        // Default to first student/exam if not explicitly provided in URL
        activeStudentId = (searchParams.studentId as string) || (students.length > 0 ? students[0].id : "");
        activeExamId = (searchParams.examId as string) || (exams.length > 0 ? exams[0] : "");

        if (activeStudentId && activeExamId) {
            data = getStudentData(activeStudentId, activeExamId);
        }
    } else {
        // Resolve active exam for Batch View
        // Default to first exam if not provided
        activeExamId = (searchParams.examId as string) || (exams.length > 0 ? exams[0] : "");
        if (activeExamId) {
            // Hardcoded batch ID for this pilot
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
