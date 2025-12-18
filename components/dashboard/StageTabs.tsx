"use client";

import { cn } from "@/lib/utils";

interface StageTabsProps {
    stages: string[];
    activeStage: string;
    onStageChange: (stage: string) => void;
}

export function StageTabs({ stages, activeStage, onStageChange }: StageTabsProps) {
    return (
        <div className="border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 md:space-x-8 min-w-max px-1">
                {stages.map((stage) => (
                    <button
                        key={stage}
                        onClick={() => onStageChange(stage)}
                        className={cn(
                            "pb-3 md:pb-4 text-sm font-bold transition-all border-b-2 px-2 whitespace-nowrap",
                            activeStage === stage
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                        )}
                    >
                        {stage}
                    </button>
                ))}
            </div>
        </div>
    );
}
