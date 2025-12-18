"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/dashboard/TopBar";
import { StudentView } from "@/components/dashboard/StudentView";
import { BatchView } from "@/components/dashboard/BatchView";

function DashboardContent() {
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "student";

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <TopBar />
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {currentView === "student" ? <StudentView /> : <BatchView />}
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
