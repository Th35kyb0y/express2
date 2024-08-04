export class FileUploadEntity {
    Flag: string = '';
    FilesId: number = 0;
    FilesName: string = '';
    OriginalFilesName: String = '';
    FilesPath: string = '';
    ProspectCode: string = '';
    ProductId: number = 0;
    IID: number = 0;
    FileType: string = '';
    CreatedBy: any ;
}

export class NotificationEntity {
    id: number = 0;
    notificationFor: string = "";
    notificationBy: string = "";
    notificationContent: string = "";
    readReceipt: boolean = false;
    createdOn: Date  = new Date();
    caseId: string = "";

    constructor(data?: Partial<NotificationEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}