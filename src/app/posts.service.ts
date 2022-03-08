import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "./post.interface";
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class PostsService{

    link = 'https://ng-guide-d3833-default-rtdb.firebaseio.com/'
    subscription: Subscription;
    constructor( private http: HttpClient ){}

  createAndStorePost(title: string, content: string){

    const postData: Post = {title, content};

    this.subscription =  this.http.post<{ name: string}>(`${this.link}posts.json`, postData)
    .subscribe(responseData => {
      console.log(responseData); 
    });
  }


  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(`${this.link}posts.json`)
    .pipe(map((responseData) => {
       const postsArray: Post[] = [];
       for(const key in responseData) {
            if(responseData.hasOwnProperty(key)){
             postsArray.push({...responseData[key], id: key});
            }
       }
       return postsArray;
    }));
  }
    
}