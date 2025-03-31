import { DocumentType } from "@/types/documents";

interface DocumentTypeDetectionResult {
    detectedType: DocumentType | null;
    confidence: number;
}

// Keywords associated with each document type
const documentTypeKeywords: Record<DocumentType, string[]> = {
    [DocumentType.Lease]: [
        "lease",
        "tenant",
        "landlord",
        "rent",
        "premises",
        "term",
        "rental",
        "property",
        "agreement",
    ],
    [DocumentType.COI]: [
        "certificate",
        "insurance",
        "policy",
        "coverage",
        "insured",
        "liability",
        "coi",
        "insurer",
    ],
    [DocumentType.AssetValuation]: [
        "valuation",
        "appraisal",
        "asset",
        "value",
        "property",
        "assessment",
        "market value",
    ],
    [DocumentType.Other]: [
        "document",
        "file",
        "report",
        "form",
        "record",
    ],
};

/**
 * Detects the document type based on file name and content
 */
export async function detectDocumentType(
    file: File,
    fileName: string
): Promise<DocumentTypeDetectionResult> {
    // Convert filename to lowercase for matching
    const fileNameLower = fileName.toLowerCase();

    // Initialize scores for each document type
    const scores = new Map<DocumentType, number>();

    // Check filename against keywords for each document type
    Object.entries(documentTypeKeywords).forEach(([type, keywords]) => {
        let score = 0;
        keywords.forEach(keyword => {
            if (fileNameLower.includes(keyword.toLowerCase())) {
                score += 1;
            }
        });
        scores.set(type as DocumentType, score);
    });

    // If it's a text-based file, try to read its content
    if (
        file.type.includes("text") ||
        file.type.includes("pdf") ||
        file.type.includes("document")
    ) {
        try {
            const content = await readFileContent(file);
            const contentLower = content.toLowerCase();

            // Update scores based on content
            Object.entries(documentTypeKeywords).forEach(([type, keywords]) => {
                let score = scores.get(type as DocumentType) || 0;
                keywords.forEach(keyword => {
                    const matches = contentLower.split(keyword.toLowerCase()).length - 1;
                    score += matches * 0.5; // Give less weight to content matches
                });
                scores.set(type as DocumentType, score);
            });
        } catch (error) {
            console.error("Error reading file content:", error);
        }
    }

    // Find the type with the highest score
    let maxScore = 0;
    let detectedType: DocumentType | null = null;

    scores.forEach((score, type) => {
        if (score > maxScore) {
            maxScore = score;
            detectedType = type;
        }
    });

    // Calculate confidence (0-1)
    const confidence = maxScore > 0 ? Math.min(maxScore / 5, 1) : 0;

    return {
        detectedType,
        confidence,
    };
}

/**
 * Reads the content of a file as text
 */
async function readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target?.result as string);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        if (file.type.includes("pdf")) {
            // For PDFs, we'll just use the raw text for now
            // In a production environment, you'd want to use a PDF parsing library
            reader.readAsText(file);
        } else {
            reader.readAsText(file);
        }
    });
}

/**
 * Generates a default document reference number based on type and date
 */
export function generateReferenceNumber(type: DocumentType): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    const typePrefix = type.split(' ')[0].substring(0, 3).toUpperCase();

    return `${typePrefix}-${year}${month}${day}-${random}`;
}

/**
 * Returns the file size in a human-readable format
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validates a file based on type and size
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'image/jpeg',
        'image/png',
    ];

    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File size exceeds 50MB limit (${formatFileSize(file.size)})`,
        };
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'File type not supported. Please upload PDF, Word, Excel, or text files.',
        };
    }

    return { valid: true };
} 