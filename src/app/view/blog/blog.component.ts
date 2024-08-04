import { Component } from '@angular/core';
import { GoogleApiService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  posts: any[] = [];
  constructor(private googleApiService:GoogleApiService
    
      ) { }
    

    
      ngOnInit(): void {
        this.googleApiService.getAllPosts().subscribe((response: any) => {
          this.posts=response.items;

          this.posts.forEach((post: any) => {
            // Ensure post.url uses HTTPS
            if (post.url.startsWith('http://')) {
              post.url = post.url.replace('http://', 'https://');
            }
          });
          console.log(response.items)
          console.log(this.posts);
        });
}
}
