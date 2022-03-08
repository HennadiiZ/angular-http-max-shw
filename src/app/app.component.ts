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
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.subscription = this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message; // by default an error has a message
      console.log(this.error);
      console.log(this.error.message);
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.subscription = this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
        this.error = error.message; // by default an error has a message
    });

    this.error = null;
  }

  onClearPosts() {
    // Send Http request
    this.subscription = this.postsService.clearPosts().subscribe(posts=>{
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
