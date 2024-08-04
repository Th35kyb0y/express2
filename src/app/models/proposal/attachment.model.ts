// attachment.model.ts
export interface Attachment {
    id: number;
    kitchen: string;
    fileType: string;
    file: File;
    originalFilesName:string
    filesPath:string;
  }
  