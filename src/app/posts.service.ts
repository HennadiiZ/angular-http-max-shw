import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription, throwError } from "rxjs";
import { Post } from "./post.interface";
import { map, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class PostsService{

    link = 'https://ng-guide-d3833-default-rtdb.firebaseio.com/'
    subscription: Subscription;
    error = new Subject<string>();
    constructor( private http: HttpClient ){}

  createAndStorePost(title: string, content: string){
    const postData: Post = {title, content};
    this.subscription =  this.http.post<{ name: string}>(`${this.link}posts.json`, postData)
    .subscribe(responseData => {
      console.log(responseData); 
    }, error => {
        this.error.next(error.message)
    });
  }


  fetchPosts() {

    // the same 1: 
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append('print', 'pretty');
    // searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(`${this.link}posts.json`,
    // the same 2:
    //return this.http.get<{ [key: string]: Post }>(`${this.link}posts.json?print=pretty`,
    {
       headers: new HttpHeaders({ "custom-header": "Content-Type"}),
       // the same 3:
       params: new HttpParams().set('print', 'pretty')
       // params: searchParams // from 1st example
    }
    )
    .pipe(map((responseData) => {
       const postsArray: Post[] = [];
       for(const key in responseData) {
            if(responseData.hasOwnProperty(key)){
             postsArray.push({...responseData[key], id: key});
            }
       }
       return postsArray;
    }),
    catchError((errorRes) => {
        // Send to analytics server 
        return throwError(errorRes);
    })
    );
  }

  clearPosts(){
    return  this.http.delete<{ [key: string]: Post }>(`${this.link}posts.json`)
  }
    
}