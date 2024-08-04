import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';

@Component({
  selector: 'app-mobile-product-filter',
  templateUrl: './mobile-product-filter.component.html',
  styleUrls: ['./mobile-product-filter.component.scss']
})
export class MobileProductFilterComponent implements OnInit{
  @Input('collectionType') collectionType: any=[];
  @Input('collection') collection: any=[];
  @Input('applicationareas') applicationareas: any=[];
  @Input('fromApplication') fromApplication: boolean=false;
	private collectionF: any[] = [];
	private collectionApplicationAreaF: any[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService:ApiService) {
 
    }
 
    ngOnInit(): void {
      sessionStorage.setItem("collectionF Agent", JSON.stringify(this.collection));
    }
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
      //this.passEntry.emit('refresh');
    }

    Apply(){
      
      if(this.collectionF.length==0 && this.collectionApplicationAreaF.length==0){
        alert("Please select any one filter")
      }
      let f = {
        c:this.collectionF,
        a :this.collectionApplicationAreaF
      }
      this.passEntry.emit(f);
      this.activeModal.dismiss('');
    
    }
    getLeftFilterCollectionsIfTypeSelected(collectionIds: string) {
      if (!collectionIds) {
        return;
      }
      let Q = '&collectionIds=' + collectionIds
      //this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilter)
      this.apiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilterIfTypeSelected)
        .subscribe(
          (response: any) => {
            if (response.data.length > 0) {
  
              let dt = response.data;
              if (this.collection.length > 0) {
                this.setCollectionIfFilters(dt);
              } else {
                setTimeout(() => {
                  this.setCollectionIfFilters(dt);
                }, 2000);
              }
  
            }
          },
          (err) => {
          }
        );
  
  
    }
    setCollectionIfFilters(dt: any) {
      let collectionF: any = [];
      this.collectionType.forEach((element:any) => {
  
        let ff = this.collectionF.filter((x => x == element.collectionId))
        if (ff.length > 0) {
          collectionF.push(ff[0]);
        }
      });
      sessionStorage.setItem("collectionF List", JSON.stringify(this.collectionF));
      let cc = sessionStorage.getItem("collectionF List");
      if (cc != null) {
        let bb = JSON.parse(cc);
        bb.forEach((e: any) => {
          let ff = dt.filter((x: any) => x.collectionId == e)
          if (ff.length > 0) {
            collectionF.push(ff[0].collectionId);
            if (ff[0].children.length > 0) {
              ff[0].children.forEach((e: any) => {
                collectionF.push(e.collectionId);
  
              });
            }
          }
        });
      }
      this.collectionF = [];
      this.collectionF = this.collectionF.concat(collectionF)
      this.collection.forEach((element:any) => {
        element.noOfProduct = 0;
        element.children = [];
      });
      dt.forEach((element: any) => {
        const filteredData = this.collection.filter((parent: any) =>
          parent.children.some((child: any) => child.collectionId === element.collectionId)
          || parent.collectionId == element.collectionId
        );
        if (filteredData.length > 0) {
          const index = this.collection.findIndex
            ((parent: any) =>
              parent.children.some((child: any) => child.collectionId === element.collectionId)
              || parent.collectionId == element.collectionId
            );
          if (index != -1) {
            element.isSelected = true;
  
            this.collection[index] = element;
          }
  
        }
      });
  
    }
    filterCollections(e: any, id: number, name: string,cat:any,type:string) {
       
      
      if (e.target.checked) {
        this.collectionF.push(id);
        try{
          if(cat.children.length>0){
            cat.children.forEach((e:any) => {
              this.collectionF.push(e.collectionId);
            });	
          }
        }catch(e){}
        this.collectionType.forEach((element:any) => {
          if (element.collectionId == id) {
            element.isSelected = true;
          }
        });
  
        this.collection.forEach((element:any) => {
          if (element.collectionId == id) {
            element.isSelected = true;
          }
        });
  
  
      }
      else {
        this.collectionType.forEach((element:any) => {
          if (element.collectionId == id) {
            element.isSelected = false;
            const index: number = this.collectionF.indexOf(element.collectionId);
            if (index !== -1) {
              this.collectionF.splice(index, 1);
            }
  
          }
        });
        this.collection.forEach((element:any) => {
          if (element.collectionId == id) {
            element.isSelected = false;
            const index: number = this.collectionF.indexOf(element.collectionId);
            if (index !== -1) {
              this.collectionF.splice(index, 1);
            }
  
          }
        });
        try{

          if(cat.children.length>0){
            cat.children.forEach((e:any) => {
              const index: number = this.collectionF.indexOf(e.collectionId);
              if (index !== -1) {
                this.collectionF.splice(index, 1);
              }
            });	
          }
  
        }catch(e){}
        if(type=='Type'){
          let getcl = sessionStorage.getItem("collectionF Agent");
          if(getcl!=null){
            
            let cc =  JSON.parse(getcl);
            cc.forEach((parent:any) => {
              let filteredData =  this.collectionF.filter(
                (x=>x==parent.children.some((child: any) => child.collectionId) 
                || parent.collectionId == x
              ))
              if(filteredData.length>0){
                if(parent.collectionId == filteredData[0]){	
                  if (parent.children.length > 0) {
                    parent.children.forEach((e: any) => {
                      this.collectionF.push(e.collectionId);
                    });
                  }
                }else{
                  this.collectionF.push(parent.collectionId)
                }
              }
            }
            );
          }
  
          let ff = this.collectionType.filter(((x:any)=>x.isSelected==true))
          if(ff.length==0){
            this.collection =  ff;
           
          }
          
        }
      }
      this.getLeftFilterCollectionsIfTypeSelected(this.collectionF.join(','))
      if (this.collectionApplicationAreaF.length > 0) {
        this.collectionApplicationAreaF = [];
        this.applicationareas.forEach((x:any) => {
          x.isSelected = false;
        })
        //this.getLeftFilterApplicationCollections(this._collectionId);
      }
  
    }

    filterAppArea(e: any, id: number, applicationAreaId: any) {
      console.log("filterAppArea")
      if (e.target.checked) {
        this.collectionApplicationAreaF.push(applicationAreaId);
        this.applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
          x.isSelected = true;
        });
  
      } else {
        this.applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
          x.isSelected = false;
        });
        const index: number = this.collectionApplicationAreaF.indexOf(applicationAreaId);
        if (index !== -1) {
          this.collectionApplicationAreaF.splice(index, 1);
        }
      }
  
      //this.collectionF = [];
  
      this.collection.forEach((element:any) => {
        element.isSelected = false;
      });
  
      if (this.collectionF.length > 0) {
        this.collectionF = [];
        this.collection.forEach((x:any) => {
          x.isSelected = false;
        })
       // this.getLeftFilterCollections(this._collectionIds);
      }
  
     // this.filterProductList();
    }
    
}
