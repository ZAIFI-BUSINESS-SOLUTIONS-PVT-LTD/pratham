import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { RawStudentInsight, RawTestInsight, RawTestWiseInsight, RawBatchInsight } from './types';

/**
 * Utility function to read a CSV file from the 'data' directory and parse it into an array of objects.
 * Uses PapaParse for robust CSV parsing.
 */
function parseCSV<T>(fileName: string): T[] {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false, // Keep everything as strings to maintain data integrity for parsing
    });
    return data as T[];
}

/**
 * Singleton class responsible for loading and providing access to raw CSV data.
 * This ensures data is loaded once and shared across the application.
 */
class CSVDataLoader {
    private static instance: CSVDataLoader;

    // Raw data arrays corresponding to each CSV file
    public studentInsights: RawStudentInsight[] = [];
    public testInsights: RawTestInsight[] = [];
    public testWiseInsights: RawTestWiseInsight[] = [];
    public batchInsights: RawBatchInsight[] = [];

    private constructor() {
        this.reload();
    }

    /**
     * Returns the singleton instance of the loader.
     */
    public static getInstance(): CSVDataLoader {
        if (!CSVDataLoader.instance) {
            CSVDataLoader.instance = new CSVDataLoader();
        }
        return CSVDataLoader.instance;
    }

    /**
     * Loads or reloads all CSV data from the filesystem.
     */
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

// Export a single instance to be used throughout the app
export const csvLoader = CSVDataLoader.getInstance();
