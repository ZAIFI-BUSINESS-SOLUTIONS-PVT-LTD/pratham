"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Users } from "lucide-react";
import Image from "next/image";

export function TopBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "student";

    const setView = (view: "student" | "batch") => {
        const params = new URLSearchParams(searchParams);
        params.set("view", view);
        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
                <div className="container mx-auto px-4 md:px-6 py-3 md:h-16 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

                    {/* Mobile: Pratham Logo Top Center */}
                    <div className="md:hidden w-full flex justify-center border-b border-slate-100 pb-2 mb-1">
                        <Image src="/pratham.png" alt="Pratham" width={80} height={24} className="h-6 w-auto opacity-90" />
                    </div>

                    {/* Left: InzightEd Logo */}
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-start space-x-4">
                        <Image src="/logo.svg" alt="InzightEd" width={120} height={32} className="h-6 md:h-8 w-auto" priority />

                        {/* Desktop Context */}
                        <div className="hidden md:block h-6 w-px bg-slate-300 mx-2"></div>
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-sm font-semibold text-slate-600">IPMAT – Pratham</span>
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Batch 1</span>
                        </div>

                        {/* Mobile Context (Simplified) */}
                        <span className="md:hidden text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Batch 1</span>
                    </div>

                    {/* Right: Controls & Pratham Logo (Desktop) */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* View Toggle */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                                onClick={() => setView("student")}
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all",
                                    currentView === "student"
                                        ? "bg-white text-primary shadow-sm border border-slate-200"
                                        : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                <User className="w-4 h-4" />
                                <span>Student</span>
                            </button>
                            <button
                                onClick={() => setView("batch")}
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all",
                                    currentView === "batch"
                                        ? "bg-white text-primary shadow-sm border border-slate-200"
                                        : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                <Users className="w-4 h-4" />
                                <span>Batch</span>
                            </button>
                        </div>

                        {/* Pratham Logo */}
                        <div className="flex items-center pl-4 border-l border-slate-200">
                            <Image src="/pratham.png" alt="Pratham" width={100} height={30} className="h-8 w-auto opacity-90" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Only: View Toggle Bar (Below Header) */}
            <div className="md:hidden bg-white border-b border-slate-200 p-2 sticky top-[89px] z-40 shadow-sm">
                <div className="flex items-center justify-center bg-slate-100 p-1 rounded-lg border border-slate-200 mx-4">
                    <button
                        onClick={() => setView("student")}
                        className={cn(
                            "flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold transition-all",
                            currentView === "student"
                                ? "bg-white text-primary shadow-sm border border-slate-200"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <User className="w-4 h-4" />
                        <span>Student View</span>
                    </button>
                    <button
                        onClick={() => setView("batch")}
                        className={cn(
                            "flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold transition-all",
                            currentView === "batch"
                                ? "bg-white text-primary shadow-sm border border-slate-200"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <Users className="w-4 h-4" />
                        <span>Batch View</span>
                    </button>
                </div>
            </div>
        </>
    );
}
