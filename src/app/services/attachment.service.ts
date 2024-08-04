// attachment.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Attachment } from './attachment.model';
// import { Attachment } from '../pages/cep/_model/attachment.model';
import { Attachment } from '../models/proposal/attachment.model';
@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private attachments: Attachment[] = [];

  getAttachments(): Observable<Attachment[]> {
    return of(this.attachments);
  }

  addAttachment(attachment: Attachment): void {
    this.attachments.push(attachment);
   
  }

  // Implement delete and download actions as needed
  deleteAttachment(id: number): void {
    const index = this.attachments.findIndex(attachment => attachment.id === id);
    if (index !== -1) {
      this.attachments.splice(index, 1);
    }
  }

  downloadAttachment(id: number): void {
    // Implement download logic here
    console.log(`Download attachment with ID: ${id}`);
  }
}
