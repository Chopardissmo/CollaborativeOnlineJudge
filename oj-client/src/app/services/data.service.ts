import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private _http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    // return this._http.get<Problem[]>(`${apiUrl}problems`);
    this._http.get<Problem[]>(`${apiUrl}problems`)
              .toPromise()
              .then((res) => {
                console.log(res);
                this.problemSource.next(res);
              })
              .catch(this.handleError);

    return this.problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    const _url = `${apiUrl}problems/${id}`;
    // return this._http.get<Problem>(_url);
    return this._http.get<Problem>(_url)
               .toPromise()
               .then((res) => {
                  return res;
               })
               .catch(this.handleError);
  }

  // // method 2
  // getProblem(id: number): Observable<Problem> {
  //   const _url = `${apiUrl}problems/${id}`;
  //   return this._http.get<Problem>(_url);
  // }

  addProblem(problem: Problem): Promise<Problem> {
    return this._http.post<Problem>(`${apiUrl}problems`, problem, httpOptions)
               .toPromise()
               .then((res) => {
                 // refresh the problems list
                 this.getProblems();
                 return res;
               })
               .catch(this.handleError);
  }

  // error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.body || error);
  }
}
