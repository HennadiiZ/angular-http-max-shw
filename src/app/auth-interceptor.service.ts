import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any> , next: HttpHandler){
        console.log("Request is on its way",  req);
        // const midifiedRequest = req.clone({url: 'some-new-url'});
        // const midifiedRequest = req.clone({headers: req.headers.append});
        console.log('req.url',  req.url)
        const midifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
        console.log('midifiedRequest', midifiedRequest)
        //const midifiedRequest = req.clone({params: req.params});
        return next.handle(midifiedRequest);
        // return next.handle(req);
    }
}