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

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    // this.http.post('https://ng-guide-d3833-default-rtdb.firebaseio.com/')
    // this.http.post('https://ng-guide-d3833-default-rtdb.firebaseio.com/posts.json', postData)
    this.subscription =  this.http.post(`${this.link}posts.json`, postData)
    .subscribe(responseData => {
      console.log(responseData); //{name: "-Mx_8nE_2GjdHUjuuVb5"}
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
