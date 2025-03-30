export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  status: "Active" | "Pending" | "Inactive";
}

export type DocumentStatus = Document["status"]; 