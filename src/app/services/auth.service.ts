import { Injectable } from '@angular/core';
import { isNullOrUndefined } from "util";
import { User } from '../interfaces/user.interface';
import { Departamento } from '../interfaces/departamento.interface';
import { Convenio } from '../interfaces/convenio.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUser(user:User):Boolean{
    if(user){
      let usuario = JSON.stringify(user);
      localStorage.setItem("currentUser", usuario);
      return true;
    }return false;
  }

  getCurrentUser():User{
    let usuario = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(usuario)) {
      let user: User = JSON.parse(usuario);
      return user;
    } else {
      return null;
    }
  }
  //para navbar del dashboard
  setDatosPersonales(persona:User):Boolean{
    if(persona){
      let people =JSON.stringify(persona);
      localStorage.setItem("dataPeople", people);
      return true;
    }else{return false}
  }

  getDatosPersonales():User{
    let persona = localStorage.getItem("dataPeople");
    if(!isNullOrUndefined(persona)){
      let people: User = JSON.parse(persona);
      return people;
    } else {
      return null;
    }
  }

  setConvenio(convenio:Convenio):Boolean{
    if(convenio){
      localStorage.removeItem("agreement")
      let agreement =JSON.stringify(convenio);
      localStorage.setItem("agreement", agreement);
      return true;
    }else{return false}
  }

  getConvenio():Convenio{
    let agreement = localStorage.getItem("agreement");
    if(!isNullOrUndefined(agreement)){
      let agreements: Convenio = JSON.parse(agreement);
      return agreements;
    } else {
      return null;
    }
  }

  setDatosDepartamento(departamentos:Departamento):Boolean{
    if(departamentos){
      localStorage.removeItem("departament")
      let departament =JSON.stringify(departamentos);
      localStorage.setItem("departament", departament);
      return true;
    }else{return false}
  }

  getDatosDepartamento():Departamento{
    let departament = localStorage.getItem("departament");
    if(!isNullOrUndefined(departament)){
      let departaments: Departamento = JSON.parse(departament);
      return departaments;
    } else {
      return null;
    }
  }

  logoutUser(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("dataPeople")
    localStorage.removeItem("departament")
  }
}
