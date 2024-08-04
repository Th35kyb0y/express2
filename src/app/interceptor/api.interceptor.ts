import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  apiCallCount = 0;

  constructor() { }

  getLoaderId(){
    const lId = document.getElementById("cf-loader");
    if(lId){
      return lId;
    }
    return null;
  }

  showloader() {
    this.getLoaderId()?.classList.remove('hide');
  }

  hideloader() {
    --this.apiCallCount;
    console.log('ApiInterceptor done ', this.apiCallCount)
    if (this.apiCallCount == 0) {
      this.getLoaderId()?.classList.add('hide');
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    ++this.apiCallCount;
    this.showloader();
    console.log('ApiInterceptor called ', this.apiCallCount)
    return next.handle(request).pipe(finalize(() => this.hideloader()));
  }
}
