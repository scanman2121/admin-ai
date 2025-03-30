import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from "@/components/Drawer";
import { Button } from "@/components/Button";

interface DocumentUploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function DocumentUploadDrawer({
  isOpen,
  onClose,
  title = "Upload documents",
  description,
}: DocumentUploadDrawerProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    // TODO: Implement file upload logic
    console.log("Uploading files:", selectedFiles);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="fixed inset-x-0 bottom-0 mt-24 h-[85vh] rounded-t-xl border-t border-gray-200">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </DrawerHeader>
        <DrawerBody>
          <div className="flex h-full flex-col gap-6">
            <div className="relative flex-1 rounded-lg border-2 border-dashed border-gray-300 p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <svg
                  className="mb-4 h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm font-medium text-gray-900">
                  Drag and drop your files here
                </p>
                <p className="text-xs text-gray-500">
                  or click to browse from your computer
                </p>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-medium">Selected files</h3>
                <ul className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate">{file.name}</span>
                      <span className="text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
          >
            Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 