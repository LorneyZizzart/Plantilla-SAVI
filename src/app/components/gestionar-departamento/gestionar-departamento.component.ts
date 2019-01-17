import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from "../../interfaces/departamento.interface";
import { AppOrganizacionService } from '../../services/app-organizacion.service';
import { Persona } from '../../interfaces/persona.interface';



@Component({
  selector: 'app-gestionar-departamento',
  templateUrl: './gestionar-departamento.component.html',
  styleUrls: ['./gestionar-departamento.component.css']
})
export class GestionarDepartamentoComponent implements OnInit {

  MessageSuccess:Boolean = false;
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;
  //DEPARTAMENTO
  departamentos:Departamento[];
  departamento:Departamento = {
    nombreDepartamento:""
  }

  editDepartamento:Departamento = {
    nombreDepartamento:""
  }
  //HISTORIAL DEPARTAMENTO
  maxidDept:Departamento[];
  historialDepartamentos:Departamento[];
  historialDepartamento:Departamento = {
    idDepartamento:"",
    limiteEstudiante:"",
    costoHora:""
  }

  editHistorialDepartamento:Departamento = {
    idDepartamento:"",
    limiteEstudiante:"",
    costoHora:"",
    estadoDepartamento:""
  }
  //ORGANIZACION DEPARTAMENTO
  //Sera donde recibiremos el id maximo
  idMax:string = "";
  listDepSJ:Departamento[];
  listJefesDepto:Persona[];
  organizacionDepartamento:Departamento = {
    idDepartamento:"",
    idPersona:""
  }
  constructor( private _appDepartamentoService: AppDepartamentoService,
                private _appDeptOrgService: AppOrganizacionService ) {
    this.getDepartamentos();
  }

  ngOnInit() {
    this.getListDeptoSJ();
    this.getListJefesDeptarmento();
  }

  ngOnDestroy(): void {

  }

  //ALERT SUCCESS
  mensajeSuccess() {
    if (!this.MessageSuccess) {
      this.getDepartamentos();
      this.MessageSuccess = true;
      setTimeout(() => {
        this.MessageSuccess = false;
      }, 10000);
    }
  }

  messageEnableDesable(value:string){
    if (value == 'inactivo') {
      this.MessageEnable = true;
      setTimeout(() => {
        this.MessageEnable = false;
      }, 8000);
    }else if (value == 'activo') {
      this.MessageDesable = true;
      setTimeout(() => {
        this.MessageDesable = false;
      }, 8000);
    }
  }
  //GEATION DEPARTAMENTOS
  getDepartamentos(){
    this._appDepartamentoService.getDepartamentos()
    .subscribe((departamentos:Departamento[]) => {this.departamentos = departamentos});
    console.log(this.departamentos);

  }


  getMaxIdDep(){
    this._appDepartamentoService.getHistorialDepartamento()
      .subscribe((maxidDept:Departamento[]) => {this.maxidDept = maxidDept});

      
  }

  saveDepartamento(){
    // this._appDepartamentoService.postDepartamento(this.departamento)
    // .subscribe((departamento:Departamento[]) => {console.log(departamento)});
    console.log(this.departamento);
  }

  editarDepartamento(){
    let idDepartamento = "1";
    console.log(this.editarDepartamento);
    this._appDepartamentoService.putDepartamento(this.editDepartamento, idDepartamento)
      .subscribe((data : Departamento[]) => {console.log(data)});

      setTimeout(() => {
        this.getDepartamentos();
      }, 2000);
  }

  deleteDepartameto(){
    
  }

  //GESTION HISTORIAL DEPARTAMENTOS

  getHistorialDepartamentos(){
  }

  saveHistorialDepartamento(){
    // for(let id of this.maxidDept){
    //   this.idMax = id.idDepartamento;
    // }
    // //falla del ultimo id
    // this.historialDepartamento.idDepartamento = this.idMax;
    // this._appDepartamentoService.postHistorialDepartamento(this.historialDepartamento)
    //   .subscribe((departamento:Departamento[]) => {console.log(departamento)});

      console.log(this.historialDepartamento);
    
  }

  //GESTIONAR ORGANIZACION DEPARTAMENTO
  //Metodo para obtener los departamentos sin Jefes de Dep -> PERO aun falta perfeccionar
  getListDeptoSJ(){
   this._appDeptOrgService.getOrgDepartamentoSJ()
   .subscribe((departamentos:Departamento[]) => { this.listDepSJ = departamentos});
  }

  getListJefesDeptarmento(){
    this._appDeptOrgService.getJefesDepartamento()
      .subscribe((personas:Persona[]) => {this.listJefesDepto = personas});
  }

  saveOrganizacion(){
  // this._appDeptOrgService.postOrganizacionDepartamento(this.organizacionDepartamento)
  //   .subscribe((departamento:Departamento[])=>{console.log(departamento)});
    console.log(this.organizacionDepartamento)
  }

}