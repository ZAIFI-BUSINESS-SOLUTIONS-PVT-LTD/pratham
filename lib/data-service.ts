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

    // Unique student names from student_specific_insights.csv
    const studentNames = Array.from(new Set(studentInsights.map(s => s.student_name).filter(name => name)));

    return studentNames.map(name => {
        // Count exams attempted by this student (using student_name in test_insights.csv)
        const attempts = testInsights.filter(t => t.student_name === name).length;

        return {
            id: name, // Using name as ID now
            name: name,
            batch: "CC Batch 1", // Hardcoded as per CSV data
            examsAttempted: attempts,
            totalExams: 25 // Fixed as per requirements
        };
    });
}

export function getAllExams(): string[] {
    const { testInsights } = csvLoader;
    const examNames = Array.from(new Set(testInsights.map(t => t.exam_name).filter(name => name)));
    return examNames.sort();
}

export function getStudentData(studentId: string, examId: string) {
    const { studentInsights, testInsights } = csvLoader;

    // Find student using student_name (passed as studentId)
    const studentRow = studentInsights.find(s => s.student_name === studentId);

    const stages = {
        "Early Stage": parseStageContent(studentRow?.early_stage || ""),
        "Mid-Course Stage": parseStageContent(studentRow?.midcourse_stage || ""),
        "Pre-Exam Stage": parseStageContent(studentRow?.preexam_stage || "")
    };

    // Find test using student_name and exam_name
    const testRow = testInsights.find(t => t.student_name === studentId && t.exam_name === examId);

    const zones = {
        focus: parseZoneContent(testRow?.i_focus || ""),
        steady: parseZoneContent(testRow?.i_study || "")
    };

    return { stages, zones };
}

export function getBatchData(batchId: string, examId: string) {
    const { batchInsights, testWiseInsights, testInsights, studentInsights } = csvLoader;

    const totalStudents = new Set(studentInsights.map(s => s.student_name).filter(name => name)).size;
    const examsAnalyzed = new Set(testInsights.map(t => t.exam_name).filter(name => name)).size;

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

    const testWiseRow = testWiseInsights.find(t => t.batch_id === batchId && t.exam_name === examId);

    const zones = {
        focus: parseCohortZoneContent(testWiseRow?.focus || ""),
        steady: parseCohortZoneContent(testWiseRow?.steady || "")
    };

    return { stats, stages, zones };
}
