import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-image-crop',
  templateUrl: './profile-image-crop.component.html',
  styleUrls: ['./profile-image-crop.component.scss']
})
export class ProfileImageCropComponent implements OnInit {
  @Input() ev: string='';
    
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob:any;
  canvasWidth = 400;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private ApiService:ApiService) {
		
    }
   
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  }
  ngOnInit(): void {
    this.imageChangedEvent = this.ev
  }

  imageCropped(event: any) {
    
    console.log("iiiiii")
    //this.croppedImage = event.base64;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    let blob =  event.blob;
    this.blob =  event.blob;
    
}
imageLoaded(image: LoadedImage) {
  
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

upload(){

  let getUserId =  this.ApiService.getUserId();
  const formData = new FormData();
  formData.append('UserId', getUserId+"");
  formData.append('file', this.blob, 'image.png');
  
  
  this.ApiService.httpostForm1('/UserMaster/uploadProfileImage',formData).subscribe((response:any)=>{

    if(response.isSuccess){
      localStorage.setItem("profile",JSON.stringify(response.data));
    }
    alert('Uploaded succesfully');
    //alert(response.message);
    this.closeModal('Refresh')

  })
}
}
