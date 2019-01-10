import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from "../interfaces/persona.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppTipoPersonaService {

  listaTipoPersonaURL: string = "http://localhost:3000/tipoPersona";

  constructor(private _http: HttpClient) { }

  getTipoPersona(value:string): Observable<Persona[]> {
    let url = `${this.listaTipoPersonaURL}/${value}`;
    return this._http.get<Persona[]>(url).pipe(map(res => res));
  }

  getMaxIdPersona() {
    return this._http.get(this.listaTipoPersonaURL).pipe(map(res => res));
  }

  postEstudiante(estudiante:Persona): Observable<Persona[]> {
    let body = JSON.stringify(estudiante);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<Persona[]>(this.listaTipoPersonaURL, body, { headers })
      //.pipe(map( res => {return res}));
      .pipe();
  }
}