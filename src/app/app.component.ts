import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Post {
  content: string;
  title: string; 
  id?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  link = 'https://ng-guide-d3833-default-rtdb.firebaseio.com/'
  loadedPosts: Post[] = [];
  subscription: Subscription;
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData); // {title: 'qwer', content: '1'}

    this.subscription =  this.http.post<{ name: string}>(`${this.link}posts.json`, postData)
    .subscribe(responseData => {
      console.log(responseData); //{name: "-Mx_8nE_2GjdHUjuuVb5"}
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.subscription =  this.http.get<{ [key: string]: Post }>(`${this.link}posts.json`)
    .pipe(map((responseData) => {
       const postsArray: Post[] = [];
       for(const key in responseData) {

        if(responseData.hasOwnProperty(key)){
         postsArray.push({...responseData[key], id: key});
        }
        
       }
       return postsArray;
    }))
    .subscribe((posts: Post[])=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
