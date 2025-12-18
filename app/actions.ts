"use server";

import { getStudentData, getBatchData } from "@/lib/data-service";

export async function getStudentDataAction(studentId: string, examId: string) {
    return getStudentData(studentId, examId);
}

export async function getBatchDataAction(batchId: string, examId: string) {
    return getBatchData(batchId, examId);
}
