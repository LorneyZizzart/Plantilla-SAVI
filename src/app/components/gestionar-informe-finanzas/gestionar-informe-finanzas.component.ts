import { Component, OnInit } from '@angular/core';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { InformeFinanzas } from '../../interfaces/informe-finanzas.interface';
import { AppInformeFinanzasService } from '../../services/app-informe-finanzas.service';


@Component({
  selector: 'app-gestionar-informe-finanzas',
  templateUrl: './gestionar-informe-finanzas.component.html',
  styleUrls: ['./gestionar-informe-finanzas.component.css']
})
export class GestionarInformeFinanzasComponent implements OnInit {
  //iDUSUARIO
  IdUsuario:string = "4";
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //Lista de los estudiantes del total horas/saldos
  listInformeEstudiante:InformeEstudiante[];
  //Info Estudiante
  nombreCompleto:string;
  nacionalidad: string;
  direccion: string;
  ci: string;
  celular: string;
  fechaNacimiento: string;
  estadoPersona: boolean;
  carrera:string
  semestre:string
  beca:string;
  estadoConvenio:string;
  nombreDepartamento:string;
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  // aprobar informe estudiante x finanzas
  informeEstudiante:InformeEstudiante = {};
  //save informe finanzas
  informeFinanzas:InformeFinanzas = {};
  //messagge aprobacion and not 
  MessageInformeAprobado:boolean=false;
  MessageInformeNoAprobado:boolean=false;

  constructor( private _appInformeEstudianteService:AppInformeEstudianteService,
              private _appInformeFinanzasService:AppInformeFinanzasService) { }

  ngOnInit() {
    this.getInfomeEstudiante();
  }

  sumarHoras(hora1, hora2) {
    var horas1=hora1.split(":");
    var horas2=hora2.split(":");
    var horatotale = new Array();
    for(let a=0;a<3;a++){
    horas1[a]=(isNaN(parseInt(horas1[a])))?0:parseInt(horas1[a])
    horas2[a]=(isNaN(parseInt(horas2[a])))?0:parseInt(horas2[a])
    horatotale[a]=(horas1[a]+horas2[a]); // Suma o resta 
    }
    if(horatotale[1] > 60){
      horatotale[1] = horatotale[1] - 60;
      horatotale[0] = horatotale[0] + 1;
    }
    return horatotale[0]+":"+horatotale[1];
  }

  totalDatos(){
    for(let registro of this.listInformeEstudiante){
      this.numStudent++;
      this.numHour = this.sumarHoras(this.numHour, registro.totalHoras);
      this.totalSaldo = parseFloat(this.totalSaldo) + parseFloat(registro.totalSaldo);
    }
  }

  //informe Estudiante
  getInfomeEstudiante(){
    this._appInformeEstudianteService.getInformeEstudianteAll()
    .subscribe((informe : InformeEstudiante[]) => {this.listInformeEstudiante = informe})
    setTimeout(() => {
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos();
    }, 2000);
  }

  informacionEstudiante(idEstudiante){
    for(let estudiante of this.listInformeEstudiante){
      if(estudiante.idPersona == idEstudiante){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.primerApellido; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido;   
        }else{
          this.nombreCompleto = estudiante.primerNombre + " " + estudiante.segundoNombre + " " + estudiante.primerApellido + " " + estudiante.segundoApellido;
        }
          this.nacionalidad = estudiante.nacionalidad;
          this.direccion = estudiante.direccion;
          this.celular = estudiante.celular;
          this.ci = estudiante.ci;
          this.fechaNacimiento = estudiante.fechaNacimiento;
          this.estadoPersona = estudiante.estadoPersona;
          this.carrera = estudiante.carrera;
          this.semestre = estudiante.semestre;
          this.nombreDepartamento = estudiante.departamento;
          this.beca = estudiante.beca;
          this.estadoConvenio = estudiante.estadoConvenio;
          this.fechaInicio = estudiante.fechaInicio;
          this.fechaFinal = estudiante.fechaFinal;
          this.fotocopiaCI = estudiante.fotocopiaCarnet;
          this.solicitudWork = estudiante.solicitudTrabajo;
      }
    }
  }

  registrarInformeFinanzas(idInformeEstudiante:string){
    this.informeFinanzas.idUsuario = this.IdUsuario;
    this.informeFinanzas.idInformeEstudiante = idInformeEstudiante;
    this._appInformeFinanzasService.postInformeFinanzas(this.informeFinanzas)
    .subscribe((informe : InformeFinanzas []) => {console.log(informe)});
    this.MessageInformeAprobado=true;
    setTimeout(() => {
      this.MessageInformeAprobado=false;
    }, 6000);
  }
  //no se utiliza este metodo en este componente
  eliminarInformeFinanzas(idInformeEstudiante:string){
    this._appInformeFinanzasService.deleteInformeFinanzas(idInformeEstudiante)
    .subscribe((data: InformeFinanzas[]) => {console.log(data)});
    this.MessageInformeNoAprobado=true;
    setTimeout(() => {
      this.MessageInformeNoAprobado=false;
    }, 6000);
  }

  aprobarInformeEstudiante(idInformeEstudiante:string, opcion:string){
    this.informeEstudiante.aprobadoFinanzas = opcion;
    this._appInformeEstudianteService.putInformeEstudianteAprobarFinanzas(idInformeEstudiante, this.informeEstudiante)
    .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});

    if(opcion == "1"){
      setTimeout(() => {
        this.registrarInformeFinanzas(idInformeEstudiante);
      }, 1000);
    }else{
      setTimeout(() => {
        this.eliminarInformeFinanzas(idInformeEstudiante);
      }, 1000);
    }
    setTimeout(() => {
      this.getInfomeEstudiante();
    }, 2000);
  }

}
