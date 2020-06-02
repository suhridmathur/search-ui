import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;
  public token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
   }

   public login(user){
     this.http.post('http://localhost:8000/api/v1/login/', JSON.stringify(user), this.httpOptions).subscribe(
       data=>{
         window.localStorage.setItem('token', data['token']);
         this.router.navigate(['/list'])
       },
       err=>{
         alert(err['statusText'])
       }
     );
   }
}
