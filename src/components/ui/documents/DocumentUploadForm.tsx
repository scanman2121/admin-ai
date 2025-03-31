import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { detectDocumentType, formatFileSize, validateFile } from "@/lib/documentUtils";
import { cn } from "@/lib/utils";
import { DocumentType } from "@/types/documents";
import { useState } from "react";
import { RiCloseLine, RiUploadCloud2Line } from "react-icons/ri";
import { DocumentFields } from "./DocumentFields";

interface DocumentUploadFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    isUploading?: boolean;
    uploadProgress?: number;
    error?: string;
}

export function DocumentUploadForm({
    onSubmit,
    isUploading = false,
    uploadProgress = 0,
    error,
}: DocumentUploadFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [documentTypes, setDocumentTypes] = useState<(DocumentType | null)[]>([]);
    const [documentFields, setDocumentFields] = useState<Record<number, Record<string, string | string[]>>>({});
    const [dragActive, setDragActive] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // Handle file selection
    const handleFileSelect = async (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const newFiles: File[] = [];
        const newTypes: (DocumentType | null)[] = [];
        const newErrors: string[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const validation = validateFile(file);

            if (!validation.valid) {
                newErrors.push(`${file.name}: ${validation.error}`);
                continue;
            }

            const { detectedType } = await detectDocumentType(file, file.name);
            newFiles.push(file);
            newTypes.push(detectedType);
        }

        setFiles([...files, ...newFiles]);
        setDocumentTypes([...documentTypes, ...newTypes]);
        setValidationErrors(newErrors);
    };

    // Handle drag and drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const { files } = e.dataTransfer;
        await handleFileSelect(files);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file-${index}`, file);
            formData.append(`type-${index}`, documentTypes[index] || "");

            if (documentFields[index]) {
                Object.entries(documentFields[index]).forEach(([field, value]) => {
                    formData.append(`${field}-${index}`, Array.isArray(value) ? value.join(",") : value);
                });
            }
        });

        await onSubmit(formData);
    };

    // Remove a file from the list
    const removeFile = (index: number) => {
        const newFiles = [...files];
        const newTypes = [...documentTypes];
        const newFields = { ...documentFields };
        newFiles.splice(index, 1);
        newTypes.splice(index, 1);
        delete newFields[index];
        setFiles(newFiles);
        setDocumentTypes(newTypes);
        setDocumentFields(newFields);
    };

    // Handle document field changes
    const handleFieldChange = (index: number, field: string, value: string | string[]) => {
        setDocumentFields((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value,
            },
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drag and drop area */}
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
                    dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.jpg,.jpeg,.png"
                />

                <div className="flex flex-col items-center gap-2 py-4">
                    <RiUploadCloud2Line className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                        Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, Word, Excel, Text, Images
                    </p>
                </div>
            </div>

            {/* Validation errors */}
            {validationErrors.length > 0 && (
                <Alert variant="destructive">
                    <AlertDescription>
                        <ul className="list-disc pl-4 space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index} className="text-sm">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            {/* Selected files */}
            {files.length > 0 && (
                <div className="space-y-4">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <RiCloseLine className="h-5 w-5" />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(file.size)}
                                </p>

                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <Label htmlFor={`type-${index}`}>Document type</Label>
                                        <Select
                                            value={documentTypes[index] || ""}
                                            onValueChange={(value) => {
                                                const newTypes = [...documentTypes];
                                                newTypes[index] = value as DocumentType;
                                                setDocumentTypes(newTypes);
                                            }}
                                        >
                                            <SelectTrigger id={`type-${index}`}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(DocumentType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Dynamic fields based on document type */}
                                    {documentTypes[index] && (
                                        <DocumentFields
                                            documentType={documentTypes[index]!}
                                            index={index}
                                            onChange={(field, value) => handleFieldChange(index, field, value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload progress */}
            {isUploading && (
                <div className="space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-center text-muted-foreground">
                        Uploading... {uploadProgress}%
                    </p>
                </div>
            )}

            {/* Error message */}
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Submit button */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={files.length === 0 || isUploading}
                    className="w-full sm:w-auto"
                >
                    {isUploading ? "Uploading..." : "Upload documents"}
                </Button>
            </div>
        </form>
    );
} 