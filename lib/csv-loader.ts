import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { RawStudentInsight, RawTestInsight, RawTestWiseInsight, RawBatchInsight } from './types';

// Helper to read and parse CSV
function parseCSV<T>(fileName: string): T[] {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false, // Keep everything as strings to avoid issues
    });
    return data as T[];
}

// Singleton to hold loaded data
class CSVDataLoader {
    private static instance: CSVDataLoader;

    public studentInsights: RawStudentInsight[] = [];
    public testInsights: RawTestInsight[] = [];
    public testWiseInsights: RawTestWiseInsight[] = [];
    public batchInsights: RawBatchInsight[] = [];

    private constructor() {
        this.reload();
    }

    public static getInstance(): CSVDataLoader {
        if (!CSVDataLoader.instance) {
            CSVDataLoader.instance = new CSVDataLoader();
        }
        return CSVDataLoader.instance;
    }

    public reload() {
        try {
            this.studentInsights = parseCSV<RawStudentInsight>('student_specific_insights.csv');
            this.testInsights = parseCSV<RawTestInsight>('test_insights.csv');
            this.testWiseInsights = parseCSV<RawTestWiseInsight>('test_wise_insights.csv');
            this.batchInsights = parseCSV<RawBatchInsight>('batch_insights.csv');
            console.log('CSV Data Loaded Successfully');
        } catch (error) {
            console.error('Failed to load CSV data:', error);
        }
    }
}

export const csvLoader = CSVDataLoader.getInstance();
