import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../interfaces/user.interface";
import { Persona } from "../interfaces/persona.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

   user = {};

  listaUserURL: string = "http://localhost:3000/user";

    constructor(private _http:HttpClient) {   }
    //Gestionar User
    //Get Users
  getUsers(): Observable<Persona[]>{

    return this._http.get<Persona[]>(this.listaUserURL).pipe(map(res => res));
    }

  getUser(key$:string):Observable<User[]>{
      let url = `${this.listaUserURL}/${key$}`;
      return this._http.get<User[]>(url);
    }

  postUser(user:User):Observable<User[]>{
      let body = JSON.stringify(user);
      let headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      return this._http.post<User[]>(this.listaUserURL, body, { headers })
      //.pipe(map( res => {return res}));
      .pipe ();
    }

  deleteUser(key$:string){
    let url = `${this.listaUserURL}/${key$}`;
    return this._http.delete(url).pipe(map(res => res));
  }

  putUser(user:User, key$:string):Observable<User[]>{
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.listaUserURL}/${key$}`;
    return this._http.put<User[]>(url, body, {headers})
    .pipe();
  }
}