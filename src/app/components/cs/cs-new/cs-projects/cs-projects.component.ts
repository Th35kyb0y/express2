import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectPopupComponent } from 'src/app/model-popups/cs/create-project-popup/create-project-popup.component';
import { ProjectDetailsComponent } from 'src/app/model-popups/cs/project-details/project-details.component';
import { ProjectFollowUpAddComponent } from 'src/app/model-popups/cs/project-follow-up-add/project-follow-up-add.component';
import { ProjectFollowUpHistoryComponent } from 'src/app/model-popups/cs/project-follow-up-history/project-follow-up-history.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cs-projects',
  templateUrl: './cs-projects.component.html',
  styleUrls: ['./cs-projects.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class CsProjectsComponent implements OnInit {
  list: any = [];
	data:any = [];
  constructor( private router:Router,public ApiService: ApiService ,	private modalService: NgbModal,){
    
  }

  ngOnInit(): void {
    this.getCreatedProject();
  }
 

  getCreatedProject() {
    let obj = {
      EmpCode: this.ApiService.getCSEmpCode()
    }
    this.ApiService.httpost(obj, "/UserMaster/GetCSCreatedProject").subscribe(
      (response: any) => {

        if (response.isSuccess) {
          this.list = response.data;
          this.data = response.data;
        }


      },
      (err) => {
      }
    );
  }

  getProjectDetails(item:any){
    const modalRef = this.modalService.open(ProjectDetailsComponent, {
      size: "xl",
      centered: true,
      fullscreen: false,
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

      if (receivedEntry) {
        this.getCreatedProject();
      }

    })
    modalRef.componentInstance.projectId = item.projectId;
//projectId
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  addProjectFollowUp(item: any) {
    const modalRef = this.modalService.open(ProjectFollowUpAddComponent, {
      size: "xl",
      centered: true,
      fullscreen: false,
      
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

      if (receivedEntry) {
        this.getCreatedProject();
      }

    })

    modalRef.componentInstance.ProjectId = item.projectId;
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  applyFilter() {
    this.list = this.data.filter((item:any) =>
    item.name
      //item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    }

	followUpHistory(item: any) {
		const modalRef = this.modalService.open(ProjectFollowUpHistoryComponent, {
		  size: "xl",
		  centered: true,
		  fullscreen: false,
		  
		});
		
		modalRef.componentInstance.ProjectId = item.projectId;
		modalRef.componentInstance.ProjectName = item.projectName;
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
	
		  if (receivedEntry) {
			this.getCreatedProject();
		  }
	
		})
	
		modalRef.result.then(
		  (result) => {
			console.log('Modal closed with:', result);
		  },
		  (reason) => {
			console.log('Modal dismissed with:', reason);
		  }
		);
	  }

    createGroup(){
      const modalRef = this.modalService.open(CreateProjectPopupComponent, {
        size: "xl",
        centered: true,
        fullscreen: false,
      });
      modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
  
        if (receivedEntry) {
          this.getCreatedProject();
        }
  
      })
  
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with:', result);
        },
        (reason) => {
          console.log('Modal dismissed with:', reason);
        }
      );
    }

}
