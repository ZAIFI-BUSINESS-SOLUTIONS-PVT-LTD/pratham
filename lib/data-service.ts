import { csvLoader } from './csv-loader';
import {
    ParsedStageInsight,
    ParsedZoneData,
    StudentProfile,
    CohortStats
} from './types';

// --- Parsing Helpers ---

function parseStageContent(content: string): ParsedStageInsight {
    if (!content) return { upliftPotential: 0, predictive: [], prescriptive: [] };

    // Extract SUP Score
    const supMatch = content.match(/SUP Score \(Score Uplift Potential\): (\d+)/);
    const upliftPotential = supMatch ? parseInt(supMatch[1], 10) : 0;

    // Extract "What will go wrong" (Predictive)
    const predictive: string[] = [];
    const predictiveMatch = content.match(/What will go wrong\n([\s\S]*?)\n\nWhat exactly to fix/);
    if (predictiveMatch) {
        predictiveMatch[1].split('\n').forEach(line => {
            if (line.trim().startsWith('*')) predictive.push(line.trim().substring(1).trim());
        });
    }

    // Extract "What exactly to fix" (Prescriptive)
    const prescriptive: string[] = [];
    const prescriptiveMatch = content.match(/What exactly to fix\n([\s\S]*?)\n\nSUP Score/);
    if (prescriptiveMatch) {
        prescriptiveMatch[1].split('\n').forEach(line => {
            if (line.trim().startsWith('*')) prescriptive.push(line.trim().substring(1).trim());
        });
    }

    // Fallback for Batch Insights which might have different formatting (End of string instead of SUP Score)
    if (prescriptive.length === 0) {
        const prescriptiveMatchAlt = content.match(/What exactly to fix\n([\s\S]*?)$/);
        if (prescriptiveMatchAlt) {
            prescriptiveMatchAlt[1].split('\n').forEach(line => {
                if (line.trim().startsWith('*')) prescriptive.push(line.trim().substring(1).trim());
            });
        }
    }

    return {
        upliftPotential,
        predictive: predictive.slice(0, 3), // Limit to 3
        prescriptive: prescriptive.slice(0, 3) // Limit to 3
    };
}

function parseZoneContent(content: string): string[] {
    if (!content || content === 'None' || content.includes('No incorrect answers')) return [];

    const items: string[] = [];
    const lines = content.split('\n');
    lines.forEach(line => {
        if (line.trim().startsWith('-')) {
            items.push(line.trim().substring(1).trim());
        }
    });

    return items.slice(0, 3); // Limit to 3
}

function parseCohortZoneContent(content: string): string[] {
    if (!content) return [];
    return content.split('\n').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3);
}


// --- Data Accessors ---

export function getAllStudents(): StudentProfile[] {
    const { studentInsights, testInsights } = csvLoader;

    // Unique student IDs from student_specific_insights.csv (using student_lms_id)
    // Filter out undefined or empty IDs
    const studentIds = Array.from(new Set(studentInsights.map(s => s.student_lms_id).filter(id => id)));

    return studentIds.map(id => {
        // Count exams attempted by this student (using student_id in test_insights.csv)
        const attempts = testInsights.filter(t => t.student_id === id).length;

        return {
            id,
            name: `Student ${id}`, // Placeholder as no name map exists
            batch: "CC Batch 1", // Hardcoded as per CSV data
            examsAttempted: attempts,
            totalExams: 25 // Fixed as per requirements
        };
    });
}

export function getAllExams(): string[] {
    const { testInsights } = csvLoader;
    const examIds = Array.from(new Set(testInsights.map(t => t.exam_id).filter(id => id)));
    return examIds.sort((a, b) => parseInt(a) - parseInt(b));
}

export function getStudentData(studentId: string, examId: string) {
    const { studentInsights, testInsights } = csvLoader;

    // Find student using student_lms_id
    const studentRow = studentInsights.find(s => s.student_lms_id === studentId);

    const stages = {
        "Early Stage": parseStageContent(studentRow?.early_stage || ""),
        "Mid-Course Stage": parseStageContent(studentRow?.midcourse_stage || ""),
        "Pre-Exam Stage": parseStageContent(studentRow?.preexam_stage || "")
    };

    // Find test using student_id
    const testRow = testInsights.find(t => t.student_id === studentId && t.exam_id === examId);

    const zones = {
        focus: parseZoneContent(testRow?.i_focus || ""),
        steady: parseZoneContent(testRow?.i_study || "")
    };

    return { stages, zones };
}

export function getBatchData(batchId: string, examId: string) {
    const { batchInsights, testWiseInsights, testInsights, studentInsights } = csvLoader;

    const totalStudents = new Set(studentInsights.map(s => s.student_lms_id).filter(id => id)).size;
    const examsAnalyzed = new Set(testInsights.map(t => t.exam_id).filter(id => id)).size;

    const stats: CohortStats = {
        totalStudents,
        examsAnalyzed
    };

    const batchRow = batchInsights.find(b => b.batch_id === batchId);

    const stages = {
        "Early Stage": parseStageContent(batchRow?.early_stage || ""),
        "Mid-Course Stage": parseStageContent(batchRow?.midcourse_stage || ""),
        "Pre-Exam Stage": parseStageContent(batchRow?.preexam_stage || "")
    };

    const testWiseRow = testWiseInsights.find(t => t.batch_id === batchId && t.exam_id === examId);

    const zones = {
        focus: parseCohortZoneContent(testWiseRow?.focus || ""),
        steady: parseCohortZoneContent(testWiseRow?.steady || "")
    };

    return { stats, stages, zones };
}
