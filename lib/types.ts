export interface RawStudentInsight {
    id: string;
    batch_id: string;
    early_stage: string;
    midcourse_stage: string;
    preexam_stage: string;
    student_id: string;
}

export interface RawTestInsight {
    id: string;
    batch_id: string;
    i_focus: string;
    i_study: string;
    exam_id: string;
    student_id: string;
}

export interface RawTestWiseInsight {
    id: string;
    batch_id: string;
    focus: string;
    steady: string;
    exam_id: string;
}

export interface RawBatchInsight {
    id: string;
    batch_id: string;
    early_stage: string;
    midcourse_stage: string;
    preexam_stage: string;
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
