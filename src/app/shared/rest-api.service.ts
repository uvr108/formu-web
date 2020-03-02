import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Voluntario } from '../shared/voluntario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HttpClient API get() method => Fetch employees list
  getVoluntarios(): Observable<Voluntario> {
    return this.http.get<Voluntario>(this.apiURL + '/voluntarios')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch employee
  getVoluntario(id): Observable<Voluntario> {
    return this.http.get<Voluntario>(this.apiURL + '/voluntarios/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API post() method => Create employee
  createVoluntario(voluntario): Observable<Voluntario> {
    return this.http.post<Voluntario>(this.apiURL + '/voluntarios', JSON.stringify(voluntario), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update employee
  updateVoluntario(id, voluntario): Observable<Voluntario> {
    return this.http.put<Voluntario>(this.apiURL + '/voluntarios/' + id, JSON.stringify(voluntario), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteVoluntario(id){
    return this.http.delete<Voluntario>(this.apiURL + '/voluntarios/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }


}
