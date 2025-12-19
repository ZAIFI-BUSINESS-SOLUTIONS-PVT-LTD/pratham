/**
 * Represents the raw structure of a student insight record as stored in student_specific_insights.csv
 */
export interface RawStudentInsight {
    id: string;
    student_name: string;
    batch_id: string;
    early_stage: string;    // Multiline string containing stage-specific insights
    midcourse_stage: string;
    preexam_stage: string;
    created_at: string;
    updated_at: string;
}

/**
 * Represents the raw structure of a test insight record as stored in test_insights.csv
 */
export interface RawTestInsight {
    id: string;
    student_name: string;
    batch_id: string;
    exam_name: string;
    i_focus: string;        // Focus zone bullet points (raw string)
    i_study: string;        // Steady zone bullet points (raw string)
    created_at: string;
    updated_at: string;
}

/**
 * Represents the raw structure of a test-wise cohort insight as stored in test_wise_insights.csv
 */
export interface RawTestWiseInsight {
    id: string;
    batch_id: string;
    exam_name: string;
    focus: string;          // Cohort-level focus areas
    steady: string;         // Cohort-level steady areas
    created_at: string;
    updated_at: string;
}

/**
 * Represents the raw structure of a batch-level insight as stored in batch_insights.csv
 */
export interface RawBatchInsight {
    id: string;
    batch_id: string;
    early_stage: string;
    midcourse_stage: string;
    preexam_stage: string;
    created_at: string;
    updated_at: string;
}

/**
 * Structured data for a specific stage (Early, Mid, Pre-Exam) after parsing the raw multiline strings
 */
export type ParsedStageInsight = {
    upliftPotential: number; // SUP Score
    predictive: string[];    // "What will go wrong" bullet points
    prescriptive: string[];  // "What exactly to fix" bullet points
};

/**
 * Structured data for focus and steady zones after parsing
 */
export type ParsedZoneData = {
    focus: string[];
    steady: string[];
};

/**
 * Basic profile information for a student
 */
export type StudentProfile = {
    id: string;
    name: string;
    batch: string;
    examsAttempted: number;
    totalExams: number;
};

/**
 * Statistics for a cohort/batch
 */
export type CohortStats = {
    totalStudents: number;
    examsAnalyzed: number;
};
