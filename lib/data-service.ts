import { csvLoader } from './csv-loader';
import {
    ParsedStageInsight,
    ParsedZoneData,
    StudentProfile,
    CohortStats
} from './types';

// --- Parsing Helpers ---

/**
 * Parses a multiline string from the CSV into a structured ParsedStageInsight object.
 * Uses regex to extract the SUP Score, "What will go wrong", and "What exactly to fix" sections.
 */
function parseStageContent(content: string): ParsedStageInsight {
    if (!content) return { upliftPotential: 0, predictive: [], prescriptive: [] };

    // Extract SUP Score using regex
    const supMatch = content.match(/SUP Score \(Score Uplift Potential\): (\d+)/);
    const upliftPotential = supMatch ? parseInt(supMatch[1], 10) : 0;

    // Extract "What will go wrong" (Predictive) section
    const predictive: string[] = [];
    const predictiveMatch = content.match(/What will go wrong\n([\s\S]*?)\n\nWhat exactly to fix/);
    if (predictiveMatch) {
        predictiveMatch[1].split('\n').forEach(line => {
            if (line.trim().startsWith('*')) predictive.push(line.trim().substring(1).trim());
        });
    }

    // Extract "What exactly to fix" (Prescriptive) section
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
        predictive: predictive.slice(0, 3), // Limit to top 3 as per requirements
        prescriptive: prescriptive.slice(0, 3) // Limit to top 3 as per requirements
    };
}

/**
 * Parses focus/steady zone content from student-specific test insights.
 * Expects bullet points starting with '-'.
 */
function parseZoneContent(content: string): string[] {
    if (!content || content === 'None' || content.includes('No incorrect answers')) return [];

    const items: string[] = [];
    const lines = content.split('\n');
    lines.forEach(line => {
        if (line.trim().startsWith('-')) {
            items.push(line.trim().substring(1).trim());
        }
    });

    return items.slice(0, 3); // Limit to top 3
}

/**
 * Parses cohort-level zone content.
 * Expects simple newline-separated strings.
 */
function parseCohortZoneContent(content: string): string[] {
    if (!content) return [];
    return content.split('\n').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3);
}


// --- Data Accessors ---

/**
 * Retrieves a list of all unique students from the insights data.
 */
export function getAllStudents(): StudentProfile[] {
    const { studentInsights, testInsights } = csvLoader;

    // Get unique student names
    const studentNames = Array.from(new Set(studentInsights.map(s => s.student_name).filter(name => name)));

    return studentNames.map(name => {
        // Count how many exams this student has attempted
        const attempts = testInsights.filter(t => t.student_name === name).length;

        return {
            id: name, // Using name as unique ID for simplicity in this pilot
            name: name,
            batch: "CC Batch 1", // Hardcoded for this pilot
            examsAttempted: attempts,
            totalExams: 25 // Total exams in the series
        };
    });
}

/**
 * Retrieves a list of all unique exam names available in the test insights.
 */
export function getAllExams(): string[] {
    const { testInsights } = csvLoader;
    const examNames = Array.from(new Set(testInsights.map(t => t.exam_name).filter(name => name)));
    return examNames.sort();
}

/**
 * Fetches detailed performance data for a specific student and exam.
 */
export function getStudentData(studentId: string, examId: string) {
    const { studentInsights, testInsights } = csvLoader;

    // Find the student's stage-level insights
    const studentRow = studentInsights.find(s => s.student_name === studentId);

    const stages = {
        "Early Stage": parseStageContent(studentRow?.early_stage || ""),
        "Mid-Course Stage": parseStageContent(studentRow?.midcourse_stage || ""),
        "Pre-Exam Stage": parseStageContent(studentRow?.preexam_stage || "")
    };

    // Find the student's specific test performance (Focus/Steady zones)
    const testRow = testInsights.find(t => t.student_name === studentId && t.exam_name === examId);

    const zones = {
        focus: parseZoneContent(testRow?.i_focus || ""),
        steady: parseZoneContent(testRow?.i_study || "")
    };

    return { stages, zones };
}

/**
 * Fetches aggregated performance data for a specific batch and exam.
 */
export function getBatchData(batchId: string, examId: string) {
    const { batchInsights, testWiseInsights, testInsights, studentInsights } = csvLoader;

    // Calculate cohort statistics
    const totalStudents = new Set(studentInsights.map(s => s.student_name).filter(name => name)).size;
    const examsAnalyzed = new Set(testInsights.map(t => t.exam_name).filter(name => name)).size;

    const stats: CohortStats = {
        totalStudents,
        examsAnalyzed
    };

    // Get batch-level stage insights
    const batchRow = batchInsights.find(b => b.batch_id === batchId);

    const stages = {
        "Early Stage": parseStageContent(batchRow?.early_stage || ""),
        "Mid-Course Stage": parseStageContent(batchRow?.midcourse_stage || ""),
        "Pre-Exam Stage": parseStageContent(batchRow?.preexam_stage || "")
    };

    // Get test-wise cohort insights (Focus/Steady zones for the whole batch)
    const testWiseRow = testWiseInsights.find(t => t.batch_id === batchId && t.exam_name === examId);

    const zones = {
        focus: parseCohortZoneContent(testWiseRow?.focus || ""),
        steady: parseCohortZoneContent(testWiseRow?.steady || "")
    };

    return { stats, stages, zones };
}
