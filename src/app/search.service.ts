import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { ɵAnimationGroupPlayer, query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8000';
  private searchApiPath = '/api/v1/search/';
  private questionApiPath = '/api/v1/questions/';
  private answersApiPath = '/api/v1/questions/questionId/answers'

  private httpOptions: any;
  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+window.localStorage.getItem('token')
      })
    }
   }

   public search(paramsObject){
    let searchUrl = this.baseUrl + this.searchApiPath; 
    let queryParams = '';

    for(let item in paramsObject){
      if(paramsObject[item]){
        if(queryParams){
          queryParams += '&' + item + '=' + paramsObject[item];
        }
        else{
          queryParams += '?' + item + '=' + paramsObject[item];
        }
      }
    }
    searchUrl = searchUrl+queryParams;
    return this.http.get(searchUrl, this.httpOptions)
   }

   public getQuestionDetails(questionId){
    let searchUrl = this.baseUrl + this.questionApiPath + questionId; 
    return this.http.get(searchUrl, this.httpOptions)
   }

   public getAnswers(questionId){
    let searchUrl = this.baseUrl + this.answersApiPath.replace('questionId', questionId);

    return this.http.get(searchUrl, this.httpOptions)
   }

}
