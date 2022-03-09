import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any> , next: HttpHandler){
        //console.log("Request is on its way",  req);

        //console.log('req.url',  req.url)
        const midifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
        //console.log('midifiedRequest', midifiedRequest)

        // return next.handle(midifiedRequest); // it gives an Observable
        return next.handle(midifiedRequest).pipe(tap(event =>{
              
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('Response is here:', event.body);
            }
        }))

    }
}