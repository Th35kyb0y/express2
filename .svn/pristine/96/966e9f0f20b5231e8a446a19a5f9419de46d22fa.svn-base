// import { Component, OnInit } from '@angular/core';
import { Component, Inject,OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';

import { PlenumDetailsModalComponent } from '../plenum-details-modal/plenum-details-modal.component';
import { DuctDetailsModalComponent } from '../duct-details-modal/duct-details-modal.component';
@Component({
  selector: 'app-hood-details-modal',
  templateUrl: './hood-details-modal.component.html',
  styleUrls: ['./hood-details-modal.component.css']
})
export class HoodDetailsModalComponent implements OnInit {
data:any[]=[]
  constructor() {
    console.log(this.data , ".///")
   }

  ngOnInit() {
  
  }
  viewPlenum(i:any){
console.log(this.data[i])
// let plenums = this.data[i].plenums
// const dialogRef = this.dialog.open(PlenumDetailsModalComponent, {
//   width: '80%',
//   data: plenums
// });
  }
  viewDuct(i:any){
    let data =this.data[i].ductTable
    // const dialogRef = this.dialog.open(DuctDetailsModalComponent, {
    //   width: '80%',
    //   data: data
    // });
  }
}
