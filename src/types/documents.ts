export enum DocumentType {
    Lease = "lease",
    COI = "coi",
    AssetValuation = "valuation",
    Other = "other"
}

export const documentTypeLabels: Record<DocumentType, string> = {
    [DocumentType.Lease]: "Lease agreement",
    [DocumentType.COI]: "Certificate of Insurance (COI)",
    [DocumentType.AssetValuation]: "Asset valuation report",
    [DocumentType.Other]: "Other document"
}

export interface BaseDocumentFields {
    title: string;
    description?: string;
    effectiveDate?: string;
    tags?: string[];
}

export interface LeaseFields extends BaseDocumentFields {
    tenant: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
}

export interface COIFields extends BaseDocumentFields {
    insuranceProvider: string;
    policyNumber: string;
    expirationDate: string;
    coverageAmount: number;
}

export interface AssetValuationFields extends BaseDocumentFields {
    appraiser: string;
    valuationDate: string;
    propertyValue: number;
    methodology: "income" | "market" | "cost";
}

export interface DocumentUploadState {
    files: File[];
    documentType: DocumentType;
    fields: Record<string, string>;
    isUploading: boolean;
    error?: string;
}