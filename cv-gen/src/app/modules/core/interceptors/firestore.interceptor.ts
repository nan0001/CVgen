import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

//As Firebase was used, there is no need in interceptors
//because all services to work with requests are provided by firestore library

//This is an example interceptor, but it doesn't catch firestore requests
//It catches only translation assets requests (en.json and ru.json)

@Injectable()
export class FirestoreInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('App-name', 'Cv Gen'),
    });

    return next.handle(requestWithHeader);
  }
}
