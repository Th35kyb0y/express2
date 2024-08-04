import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private apiServices :ApiService) { }

  ngOnInit(): void {
    this.getTermAndConditionData()
  }

  FAQList:any[]=[]


  getTermAndConditionData() {
    const query=''
    this.apiServices.httpget(query,'ContactUS/getFAQData').subscribe({
      next: (res: any) => {
        console.log("TTTTT", res)
        if (res.statusCode == 200) {
          this.FAQList = res?.data

        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error")
      }
    })
  }



}
