import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileChangePwdComponent } from 'src/app/model-popups/user/edit-profile-change-pwd/edit-profile-change-pwd.component';
import { ApiService } from 'src/app/services/api.service';
import { ProfileImageCropComponent } from './profile-image-crop/profile-image-crop.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:any = null;
  imtUrl = ""
  constructor(private modalService: NgbModal,private apiService:ApiService) { }

  ngOnInit(): void {
     this.imtUrl =  this.apiService.getbaseURLEXP().replace('/api','/')
    this.setprofile();
  }
 
  setprofile(){
    
    this.profile = ApiService.getProfile();
  }

  getImage(profile:any){
    if(profile.profileImage){
      return this.imtUrl+''+profile.profileImage;
    }else {
      return '/assets/img/avatar7.webp';
    }
  }

  handleFileInput(event:any) {
   let file = event.target.files[0] as File;

   const modalRef = this.modalService.open(ProfileImageCropComponent, {
    size: 'lg', // You can specify the size of the modal
    centered: true,
  });
  modalRef.componentInstance.ev = event;
   // Subscribe to modal close event if needed
   modalRef.result.then(
    (result) => {
      this.setprofile();
      console.log('Modal closed with:', result);
    },
    (reason) => {
      this.setprofile();
      console.log('Modal dismissed with:', reason);
    }
  );

  }

  editProfile(type:string){
    const modalRef = this.modalService.open(EditProfileChangePwdComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        this.setprofile();
        console.log('Modal closed with:', result);
      },
      (reason) => {
        this.setprofile();
        console.log('Modal dismissed with:', reason);
      }
    );
  }

}
