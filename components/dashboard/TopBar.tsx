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
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm transition-all duration-200">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex h-20 items-center justify-between">
                        {/* Left: InzightEd Logo */}
                        <div className="flex-1 flex justify-start">
                            <Image
                                src="/logo.svg"
                                alt="InzightEd"
                                width={140}
                                height={40}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Center: Context */}
                        <div className="flex-1 flex justify-center items-center">
                            <div className="flex items-center space-x-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                <span className="text-base font-bold text-slate-700">IPMAT – Pratham</span>
                                <div className="h-4 w-px bg-slate-300"></div>
                                <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-0.5 rounded-full">Batch 1</span>
                            </div>
                        </div>

                        {/* Right: Controls & Pratham Logo */}
                        <div className="flex-1 flex justify-end items-center space-x-6">
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
                            <div className="pl-6 border-l border-slate-200">
                                <Image
                                    src="/pratham.png"
                                    alt="Pratham"
                                    width={120}
                                    height={40}
                                    className="h-9 w-auto object-contain opacity-95"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex flex-col items-center py-3 space-y-2">
                        {/* Pratham Logo Only (InzightEd Removed) */}
                        <div className="flex justify-center">
                            <Image
                                src="/pratham.png"
                                alt="Pratham"
                                width={100}
                                height={30}
                                className="h-8 w-auto opacity-95"
                            />
                        </div>

                        {/* Context */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-slate-700">IPMAT – Pratham</span>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Batch 1</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Only: View Toggle Bar (Below Header) */}
            <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 sticky top-[88px] z-40 shadow-sm">
                <div className="flex items-center justify-center bg-slate-100 p-1 rounded-lg border border-slate-200 w-full">
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
