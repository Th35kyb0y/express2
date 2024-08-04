import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { CategoryRequest } from 'src/app/models/category/category';
// import { CategoryService } from 'src/app/services/product/category.service';
// import { UserSessionService } from 'src/app/services/user/user-session.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() catId: number = 0;
  @Input() productName: string = "";
  @Input() pageList: any[] = [];

  public catName = ""
  constructor(private _router: Router,
    // private _categoryService: CategoryService,
    // private _userSession: UserSessionService,
     private _location: Location) {
    // if (!this._userSession.isAuthenticated) {
    //   this._router.navigate(['/Login']);
    // }
  }

  ngOnInit(): void {
    if (this.catId != 0) {
      //this.getCategories(this.catId);
    }
  }

  // private getCategories(catId: number) {
  //   this._categoryService.getCategoryDetail(catId).subscribe((res) => {
  //     if (res != null) {
  //       this.catName = res.name;
  //     }
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }

  goBack(){
    this._location.back();
  }

}
