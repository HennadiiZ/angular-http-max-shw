import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription, throwError } from "rxjs";
import { Post } from "./post.interface";
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class PostsService{

    link = 'https://ng-guide-d3833-default-rtdb.firebaseio.com/'
    subscription: Subscription;
    error = new Subject<string>();
    constructor( private http: HttpClient ){}

  createAndStorePost(title: string, content: string){
    const postData: Post = {title, content};
    this.subscription =  this.http
    .post<{ name: string}>(
        `${this.link}posts.json`, 
        postData,
        { 
            // observe: 'body' // by default
            observe: 'response'
        }
    )
    .subscribe(responseData => {
      console.log(responseData); 
      console.log(responseData.body); 
    }, error => {
        this.error.next(error.message)
    });
  }


  fetchPosts() {

    return this.http.get<{ [key: string]: Post }>(`${this.link}posts.json`,
    {
       headers: new HttpHeaders({ "custom-header": "Content-Type"}),
       params: new HttpParams().set('print', 'pretty')
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
    return  this.http.delete<{ [key: string]: Post }>(`${this.link}posts.json`,
    { 
        // observe: 'body' // by default
        // observe: 'response'
        observe: 'events'
    }
    )
    .pipe(
        tap(event=>{
        console.log(event); // HttpResponse {headers: HttpHeaders, status: 200, statusText: 'OK', url: 'https://ng-guide-d3833-default-rtdb.firebaseio.com/posts.json', ok: true, …}
        
        if(event.type === HttpEventType.Sent){
            console.log(event);
        }

        if(event.type === HttpEventType.Response){
            console.log(event.body);
        }
    })
    ) 
  }
    
}