export interface RawStudentInsight {
    id: string;
    student_name: string;
    batch_id: string;
    early_stage: string;
    midcourse_stage: string;
    preexam_stage: string;
    created_at: string;
    updated_at: string;
}

export interface RawTestInsight {
    id: string;
    student_name: string;
    batch_id: string;
    exam_name: string;
    i_focus: string;
    i_study: string;
    created_at: string;
    updated_at: string;
}

export interface RawTestWiseInsight {
    id: string;
    batch_id: string;
    exam_name: string;
    focus: string;
    steady: string;
    created_at: string;
    updated_at: string;
}

export interface RawBatchInsight {
    id: string;
    batch_id: string;
    early_stage: string;
    midcourse_stage: string;
    preexam_stage: string;
    created_at: string;
    updated_at: string;
}

export type ParsedStageInsight = {
    upliftPotential: number;
    predictive: string[];
    prescriptive: string[];
};

export type ParsedZoneData = {
    focus: string[];
    steady: string[];
};

export type StudentProfile = {
    id: string;
    name: string;
    batch: string;
    examsAttempted: number;
    totalExams: number;
};

export type CohortStats = {
    totalStudents: number;
    examsAnalyzed: number;
};
