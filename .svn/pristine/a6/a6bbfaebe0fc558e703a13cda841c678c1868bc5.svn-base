import { Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class MetatagsService {

  constructor(private meta: Meta,private titleService: Title) { }

  AddMetatagDescription(content:string){
    
    const tag = this.meta.getTag('name="description"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'description', content: content });
    }, 100);
  

    
  }
  UpdateMetatagDescription(content:string){
    this.meta.updateTag({ name: 'description', content: content });
  }
  AddMetatagKeywords(content:string){
    const tag = this.meta.getTag('name="keywords"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'keywords', content: content });
    }, 100);
    
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  AddMetatagtitle(content:string){
    const tag = this.meta.getTag('name="title"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'title', content: content });
    }, 100);
    
  }
  
  AddMetatagog_title(content:string){
    const tag = this.meta.getTag('name="og:title"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'og:title', content: content });
    }, 100);
    
  }

    
  AddMetatagog_url(content:string){
    const tag = this.meta.getTag('name="og:url"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'og:url', content: content });
    }, 100);
    
  }

  UpdateMetatagKeywords(content:string){
    this.meta.updateTag({ name: 'keywords', content: content });
  }

  AddMetatagAuthor(content:string){
    const tag = this.meta.getTag('name="author"');
    if (tag) {
      this.meta.removeTagElement(tag);
    }
    setTimeout(() => {
      this.meta.addTag({ name: 'author', content: content });
    }, 100);
   
  }
  UpdateMetatagAuthor(content:string){
    this.meta.updateTag({ name: 'author', content: content });
  }

  AddMetatags(description:string,keywords:string,author:string){
    this.meta.addTags([
		{ name: 'keywords', content: keywords },
		{ name: 'author', content: author }
	  ]);
  }
  AddMeteKeyworkd(keywords:string){
    this.meta.addTags([
		{ name: 'keywords', content: keywords },
	  ]);
  }
 
}
