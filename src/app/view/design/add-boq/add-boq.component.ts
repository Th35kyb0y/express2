import { Component, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBoqEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-boq',
  templateUrl: './add-boq.component.html',
  styleUrls: ['./add-boq.component.scss']
})
export class AddBOQComponent {
  private modalService = inject(NgbModal);
  category1List:any;
  category1:Number=0;
  category2List:any;
  category2:Number=0;
  category3List:any;
  category3:Number=0;
  productList: any;
  objAddBoqEntity: AddBoqEntity;
  productId: number=0;
  prospectCode: any;
  IID: number=0;
  objBoqList:AddBoqEntity[]=[];


  constructor(private ApiService: ApiService,private route: ActivatedRoute,private _router: Router) {

    this.objAddBoqEntity = new AddBoqEntity();
    this.route.params.subscribe(params => {
      this.productId = Number(params['productId']);
      this.prospectCode= params['proposalCode'];
      this.IID= Number(params['IID']);
      this.getBOQList();
    });
  }

  ngOnInit(): void {
    this.getProductList("Category1");
  }

  addBOQ(content: TemplateRef<any>) {

    //this.dataRetrieved = true;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size: 'xl' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  getProductList(Flag:string) {
    this.ApiService.httpgetMaster("&Flag="+Flag+"&Category1Id="+this.category1+"&Category2Id="+this.category2+"&Category3Id="+this.category3+"", "/Proposal/getProductList").subscribe(
      (response: any) => {
        console.log(response.data);
        if(Flag=="Category1")
        {
          this.category1List=response.data;
        }
        else if(Flag=="Category2")
        {
          this.category2List=response.data;
        }
        else if(Flag=="Category3")
        {
          this.category3List=response.data;
        }
        else if(Flag=="ProductList")
        {
          this.productList=response.data;
        }
      },
      (err) => {
      }
    );
  }

  AddProduct(items: any) {
    
    this.objAddBoqEntity.productCode = items.code;
    this.objAddBoqEntity.productName = items.name;
    this.objAddBoqEntity.productDesc = items.description;
    this.objAddBoqEntity.unit = items.uom;
    this.objAddBoqEntity.productPrice = items.price==0?items.unitPrice:items.price;
    this.objAddBoqEntity.gst=items.gst;
    this.objAddBoqEntity.productType=items.productType;
    this.objAddBoqEntity.productImage=items.imageLink;
  }

  saveBOQ()
  {
    this.objAddBoqEntity.flag='Insert';
    this.objAddBoqEntity.status='Pending';
    this.objAddBoqEntity.prospectCode=this.prospectCode;
    this.objAddBoqEntity.iid=this.IID;
    this.objAddBoqEntity.productId=this.productId;
    this.objAddBoqEntity.createdBy=this.ApiService.getDEEmpCode();

    console.log(this.objAddBoqEntity)

    this.ApiService.httpost(this.objAddBoqEntity,'/Proposal/saveUpdateDeleteBOQ')
    .subscribe((res:any)=>{
      console.log(res);
      this.getBOQList();

    },(error=>{

    }))
  }

  getBOQList()
  {
    this.ApiService.httpgetMaster("&ProposalCode="+this.prospectCode+"&ProductId="+this.productId+"&IID="+this.IID+"", "/Proposal/getBOQList").subscribe(
      (response: any) => {
        console.log(response.data);
        this.objBoqList=response.data;
      },
      (err) => {
      }
    );
  }

  ProductDelete(items:any) {
    if (confirm('Are you sure, Do you want to delete this product?')) {
      this.objAddBoqEntity = new AddBoqEntity();
      this.objAddBoqEntity = items;
      this.objAddBoqEntity.flag = 'Delete';
      this.ApiService.httpost(this.objAddBoqEntity,'/Proposal/saveUpdateDeleteBOQ')
      .subscribe((res:any)=>{
        if(res.statusCode==200)
        {
          console.log(res);
          this.objAddBoqEntity = new AddBoqEntity();
          this.getBOQList();
        }

  
      },(error=>{
  
      }))

    }
  }


  submitTODTH()
  {
    this.ApiService.httpgetMaster("&Flag=BOQDone&ProspectCode=" + this.prospectCode+"&CreatedBy="+this.ApiService.getDEEmpCode()+"&PID="+this.productId+"&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        console.log(response.data);
        alert(response.data[0].messageBox)
        this._router.navigate(['/design']);
      },
      (err) => {
      }
    );
  }

}
