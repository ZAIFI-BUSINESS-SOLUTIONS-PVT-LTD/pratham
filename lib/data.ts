export type Student = {
    id: string;
    name: string;
    batch: string;
    examsAttempted: number;
    totalExams: number;
};

export type ZoneData = {
    focus: string[];
    steady: string[];
};

export type StageInsights = {
    upliftPotential: number;
    predictive: string[];
    prescriptive: string[];
};

export type CohortStats = {
    totalStudents: number;
    examsAnalyzed: number;
    coverage: number;
};

// Mock Data
export const STUDENTS: Student[] = [
    { id: "s1", name: "Aarav Patel", batch: "IPMAT-B1", examsAttempted: 18, totalExams: 25 },
    { id: "s2", name: "Ishaan Sharma", batch: "IPMAT-B1", examsAttempted: 22, totalExams: 25 },
    { id: "s3", name: "Diya Gupta", batch: "IPMAT-B1", examsAttempted: 12, totalExams: 25 },
];

export const EXAMS = ["Mock 1", "Mock 2", "Mock 3", "Sectional A", "Sectional B"];
export const BATCHES = ["IPMAT-B1", "IPMAT-B2"];
export const STAGES = ["Early Stage", "Mid-Course Stage", "Pre-Exam Stage"];

export const MOCK_ZONES: ZoneData = {
    focus: [
        "Accuracy in Algebra word problems < 40%",
        "Time spent on RC passages > 8 mins",
        "Skipped 5+ easy Arithmetic questions"
    ],
    steady: [
        "Consistent 90% accuracy in Vocabulary",
        "Logical Reasoning speed improved by 15%",
        "Data Interpretation error rate < 5%"
    ]
};

export const MOCK_INSIGHTS: Record<string, StageInsights> = {
    "Early Stage": {
        upliftPotential: 45,
        predictive: [
            "Current trajectory suggests 60th percentile",
            "Algebra weakness may cap score at 120",
            "Verbal strength is a key asset"
        ],
        prescriptive: [
            "Focus on Algebra basics for 2 weeks",
            "Attempt 3 sectional tests in Quant",
            "Maintain reading habit for Verbal"
        ]
    },
    "Mid-Course Stage": {
        upliftPotential: 30,
        predictive: [
            "Consolidating around 75th percentile",
            "Geometry is becoming a new bottleneck",
            "Time management is stabilizing"
        ],
        prescriptive: [
            "Drill Geometry formulas daily",
            "Practice skipping difficult questions",
            "Analyze Mock 2 errors deeply"
        ]
    },
    "Pre-Exam Stage": {
        upliftPotential: 15,
        predictive: [
            "Likely to score between 180-200",
            "High accuracy but low attempts",
            "Stress management is crucial now"
        ],
        prescriptive: [
            "Take full-length mocks at exam time",
            "Focus on maximizing attempts in strength areas",
            "Light revision only"
        ]
    }
};

export const MOCK_COHORT_STATS: CohortStats = {
    totalStudents: 45,
    examsAnalyzed: 12,
    coverage: 88
};
