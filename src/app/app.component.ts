import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.interface';
import { PostsService } from './posts.service';

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

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    //this.fetchPosts();
    this.postsService.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    //this.fetchPosts();
    this.postsService.fetchPosts();
    //this.loadedPosts = this.postsService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  //   this.subscription =  this.http.get<{ [key: string]: Post }>(`${this.link}posts.json`)
  //   .pipe(map((responseData) => {
  //      const postsArray: Post[] = [];
  //      for(const key in responseData) {

  //       if(responseData.hasOwnProperty(key)){
  //        postsArray.push({...responseData[key], id: key});
  //       }
        
  //      }
  //      return postsArray;
  //   }))
  //   .subscribe((posts: Post[])=>{
  //     this.isFetching = false;
  //     this.loadedPosts = posts;
  //   });
  // }
}
