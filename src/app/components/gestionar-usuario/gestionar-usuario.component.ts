import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Persona } from "../../interfaces/persona.interface";
import { AppUserService } from "../../services/app-user.service";
import { AppPersonaService } from "../../services/app-persona.service";

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.css']
})
export class GestionarUsuarioComponent implements OnInit {

  //FormBuilder
  public formPersona:FormGroup;
  //pRUEBA bORRAR
  idPersona:string = "";
  idRol:string = "";
  password:string = "";
  passwordTwo:string = "";
  //ALERTS
  MessageSuccess:Boolean = false;
  MessageEnable:Boolean = false;
  MessageDesable:Boolean = false;
  userPersona: Persona[];
  usuario:User[];
  personas:Persona[];
  //Para ver la informacion por estudiante
  infoNombreCompleto:string = "";
  infoCarrera: string = "";
  infoSemestre: string = "";
  infoDireccion: string = "";
  infoNacionalidad: string = "";
  infoCI: string = "";
  infoCelular: string = "";
  infoFechaNacimiento: string = "";
  infoUser:string = "";
  infoPassword:string = "";

  estudiante:Persona[] = [];

  private persona: Persona = {
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    nacionalidad: "",
    fechaNacimiento: "",
    direccion: "",
    ci: "",
    celular: ""
  }

  private editpersona: Persona = {
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    nacionalidad: "",
    fechaNacimiento: "",
    direccion: "",
    ci: "",
    celular: ""
  }

  private user: User = {
    idRol: "",
    usuario: "",
    password: "",
    estado: "0"
  };

  constructor( private _appUserService: AppUserService,
              private _appPersonaService: AppPersonaService,
              private _formBuilder: FormBuilder) {
    this.getUsers();
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.getUsers();
    this.getPersonas();
    this.saveUser();
    this.editUsers();
    this.savePersona();
    this.editPersonas();
  }

  comparacionPassword():Boolean{
    if (this.passwordTwo != this.password || this.passwordTwo == null && this.password != null) {
      return false;
    }else{return true;}
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario:NgForm){
    formulario.reset({
    });
  }
//ALERT SUCCESS
mensajeSuccess(){
  if (!this.MessageSuccess) {
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

//Gestionar Usuarios
  getUsers() {
    this._appUserService.getUsers().subscribe((users: Persona[]) => this.userPersona = users);
    console.log(this.userPersona);
  }

  // getUser(){
  //   this._appUserService.getUser('1').subscribe((usuario: User[]) => this.usuario = usuario);
  //   console.log(this.usuario);
  // }
  buscarEstudiante(idPersona:string){

    for (let estudiante of this.userPersona) {
      if(estudiante.idPersona == idPersona){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido;          
        }else{
          this.infoNombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        }
        this.infoCarrera = estudiante.carrera;
        this.infoSemestre = estudiante.semestre;
        this.infoDireccion = estudiante.direccion;
        this.infoNacionalidad = estudiante.nacionalidad;
        this.infoCI = estudiante.ci;
        this.infoCelular = estudiante.celular;
        this.infoFechaNacimiento = estudiante.fechaNacimiento;
        this.infoUser = estudiante.usuario;
        this.infoPassword = estudiante.password;
      }
    }
  }

  //Buscar al estudiante para editar
  buscarEstudianteEditar(idPersona:string){
    for(let estudiante of this.userPersona){
      if (estudiante.idPersona == idPersona) {
        this.formPersona = this._formBuilder.group({
          editPrimerNombre : estudiante.primerNombre,
          editSegundoNombre : estudiante.segundoNombre,
          editPrimerApellido : estudiante.primerApellido,
          editSegundoApellido : estudiante.segundoApellido,
          editCarrera : estudiante.carrera,
          editSemestre : estudiante.semestre,
          editNacionalidad : estudiante.nacionalidad,
          editFechaNacimiento : estudiante.fechaNacimiento,
          editDireccion : estudiante.direccion,
          editCi : estudiante.ci,
          editCelular : estudiante.celular
        })
      }
    }
  }

  saveUser() {
    this.user.idPersona = this.idPersona;
    this.user.idRol = this.idRol;
    this.user.password = this.passwordTwo;
    console.log(this.user);
    this._appUserService.postUser(this.user)
    .subscribe((data :User[]) => {console.log(data)});
    //.subscribe(data => {data}, error => console.log(error));
  }

  editUsers(){
    this.user.idRol = this.idRol;
    this.user.password = this.passwordTwo;
    console.log(this.user);
    this._appUserService.putUser(this.user, this.idPersona)
    .subscribe((data :User[]) => {console.log(data)});
  }

  editEstadoUser(idRol, usuario, password, estado, idPersona){
    this.user.idRol = idRol;
    this.user.usuario = usuario;
    this.user.password = password;
    this.user.estado = estado;
    console.log(this.user);
    this._appUserService.putUser(this.user, idPersona)
      .subscribe((data: User[]) => { console.log(data) });

    setTimeout( () => {
          this.getUsers();
    }, 2000);
  }

  //Gestionar Personas
  getPersonas() {
    this._appPersonaService.getPersonas().subscribe((personas:Persona[]) => this.personas = personas);
    console.log(this.personas);
  }

  savePersona() {
    console.log(this.persona);
    this._appPersonaService.postPersona(this.persona)
    .subscribe((data :Persona[]) => {console.log(data)});
  }

  editPersonas(){
    console.log(this.editpersona);
    this._appPersonaService.putPersona(this.editpersona, this.idPersona)
    .subscribe((data :Persona[]) => {console.log(data)});
  }

}