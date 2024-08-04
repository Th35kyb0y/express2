import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private apiKey = 'AIzaSyB1GzAzjjZdPzv6l8LvMGW1EFW-ByPakB8';  // Replace with your API key
  private blogId = '6900022344125588344';  // Replace with your blog ID
  private apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/posts`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.apiKey}`);
  }

  getPostDetails(postId: string): Observable<any> {
    const postUrl = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/posts/${postId}?key=${this.apiKey}`;
    return this.http.get(postUrl);
  }
}
