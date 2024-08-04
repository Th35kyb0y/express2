import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-faq',
  templateUrl: './user-faq.component.html',
  styleUrls: ['./user-faq.component.scss']
})
export class UserFaqComponent {

  constructor(private apiServices :ApiService) { }

  ngOnInit(): void {
    this.getCategoryFAQData()
    this.getTermAndConditionData()
  }

  FAQList:any[]=[]


  getTermAndConditionData() {
    debugger
    const query=''
    this.apiServices.httpget(query,'/ContactUS/getFAQData').subscribe({
      next: (res: any) => {
        console.log("TTTTT  getTermAndConditionData getTermAndConditionData", res)
        if (res.statusCode == 200) {
          this.FAQList = res?.data

        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error",err)
      }
    })
  }





CategoryFAQList:any
CategoryFAQA:any

        getCategoryFAQData() {
          this.apiServices.httpget('','/ContactUS/getCategoryFAQData').subscribe({
            next: (res: any) => {
              console.log("TTTTT getCategoryFAQData getCategoryFAQData", res)
              if (res.statusCode == 200) {
                this.CategoryFAQList = res?.data

              } else {
                console.log("Something Wrong")
              }
            },
            error: (err: any) => {
              console.log("Server Error",err)
            }
          })
        }




        isAccordionOpen: boolean[] = [];

        toggleAccordion(index: number) {
          this.isAccordionOpen[index] = !this.isAccordionOpen[index];
        }
}
