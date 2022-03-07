import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  link = 'https://ng-guide-d3833-default-rtdb.firebaseio.com/'
  loadedPosts = [];
  subscription: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);

    this.subscription =  this.http.post(`${this.link}posts.json`, postData)
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
    this.subscription =  this.http.get(`${this.link}posts.json`)
    .subscribe(posts=>{
      console.log(posts);  //<--- all posts are here : {-Mx_6z74J0tAKhr-frO5: {…}, -Mx_7NFZQC8faH844WXZ: {…}, -Mx_8Ls-DUr85ZHa-mz9: {…}, -Mx_8nE_2GjdHUjuuVb5: {…}, -Mx_9EKyHAKFWZwkR9xo: {…}}
    });
  }
}
