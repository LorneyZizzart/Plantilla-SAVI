import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppRegistroHoraService } from '../../services/app-registroHora.service';
import { RegistroHora } from '../../interfaces/registroHora.interface';
import { AppDepartamentoService } from '../../services/app-departamento.service';
import { Departamento } from '../../interfaces/departamento.interface';
import { Persona } from '../../interfaces/persona.interface';
import { AppTipoPersonaService } from '../../services/app-tipoPersona.service';
import { InformeEstudiante } from '../../interfaces/informe-estudiante.interface';
import { AppInformeEstudianteService } from '../../services/app-informe-estudiante.service';
import { Convenio } from 'src/app/interfaces/convenio.interface';

@Component({
  selector: 'app-gestionar-informe-hoy',
  templateUrl: './gestionar-informe-hoy.component.html',
  styleUrls: ['./gestionar-informe-hoy.component.css']
})
export class GestionarInformeHoyComponent implements OnInit {
  
  //Variable global para almacenar el id del departamento
  IdDepartamento:string = "1"
  fechaHoy:any;
  //FOOTER
  numStudent:number = 0;
  numHour:any = '00:00';
  totalSaldo:any = 0;
  //info del departamento
  departamento:Departamento [];
  //Registro de hoy
  informesRegistrosNow:RegistroHora[];
  //list of hours the students
  listHours:any[] = ['00:00'];
  listSaldo:any[] = ['0'];
  //Lista de estudiantes del departameto
  estudiantes:Convenio[];
  //Estudiante del departamentos
  estudianteDep:Persona[];
  //Objeto para registrar asistencia del estudiante
  registro:RegistroHora = {};
  idConvenio:string;
  //Info del Departamento
  idRegistro:string;
  codigoDepartamento:string;
  nombreJefe:string;
  estadoDepartamento;
  fechaRegistroHistorialDep:string;
  limiteEstudiante:string;
  nombreDepartamento:string;
  cantidadEstudiantes:string = "3"; //falta aun sumar and restar
  cupos:string = "5"; //falta aun sumar and restar
  costoHora:string;
  //Message of exit the student
  messageExit:boolean = false;
  //Message de registro de asistencia
  messageDelete:boolean = false;
  messageSuccess:boolean = false;
  messageFail:boolean = false;
  //para guardar el informe de estudiante
  informeEstudiante:InformeEstudiante = {}
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
  fotocopiaCI;
  solicitudWork;
  fechaInicio;
  fechaFinal;
  areas:any[] = [];
  observacionesRegistroHora:string;
  //Confirmacion
  idRegistroHora:string;
  fecha:string;
  //title de observacion
  titleObservation:string;
  btnConfirmacion:string;

  constructor(private _appRegistroHoraService:AppRegistroHoraService,
              private _appDepartamentoService:AppDepartamentoService,
              private _appTipoPersonaService:AppTipoPersonaService,
              private _appInformeEstudianteService:AppInformeEstudianteService ) { 
  }

  ngOnInit() {
    this.fechaHoy = new Date();
    this.getDepartament(this.IdDepartamento);
    this.getInformeRegisterNow(this.IdDepartamento);
    this.getEstudiantesDept(this.IdDepartamento);
    this.getEstudiantes(this.IdDepartamento);
  }

  //resetear el FORMULARIO no estamos usando
  resetForm(formulario: NgForm) {
    formulario.reset({
    });
  }

  calculadoraSaldo(hora, saldo){
    var hour = hora.split(":");
    var auxSaldo = parseFloat(saldo);
    var totalSald;
    
    for (let i = 0; i <= 60; i++) {
      if(hour[1] == i){
        auxSaldo = auxSaldo/60 * i
        break;
      }
    }
    var balance = hour[0] * saldo;
    var saldo1 = parseFloat(balance.toString());
    var saldo2 = parseFloat((auxSaldo.toFixed(2)).toString());
    totalSald = saldo1 + saldo2;    
    return totalSald.toFixed(2);
  }

  horasTranscurrido(day1, hora1, day2, hora2){
    var inicioMinutos = parseInt(hora1.substr(3,2));
    var inicioHoras = parseInt(hora1.substr(0,2));
    var finMinutos = parseInt(hora2.substr(3,2));
    var finHoras = parseInt(hora2.substr(0,2));
    var horastotal;
    
    var transcurridoMinutos;

    if(day1 < day2){
      var hora = inicioHoras - 24;
      horastotal = (-hora) + finHoras;      
    }else if (day1 == day2){
      horastotal = finHoras - inicioHoras;
    }

    if(inicioMinutos > finMinutos){
      transcurridoMinutos = inicioMinutos - finMinutos;
    }else{
      transcurridoMinutos = finMinutos - inicioMinutos; 
    }

    var transcurridoHoras = horastotal; 
    var horas = transcurridoHoras.toString();
    var minutos = transcurridoMinutos.toString();

    if (horas.length < 2) {
      horas = "0"+horas;
    }
    
    if (minutos.length < 2) {
      minutos = "0"+minutos;
    }
    return horas+":"+minutos;  

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
    var horatotal=new Date()
    horatotal.setHours(horatotale[0]);
    horatotal.setMinutes(horatotale[1]);
    horatotal.setSeconds(horatotale[2]);
    var hour = horatotal.getHours();
    var min = horatotal.getMinutes();
    
    if (hour < 10 && min < 10){
      return "0"+hour+":"+"0"+min;
    }else if (hour < 10 && min >= 10){
      return "0"+hour+":"+min;
    }else if (hour >= 10 && min < 10){
      return hour+":"+"0"+min;
    }else if (hour >= 10 && min >= 10){
      return hour+":"+min;
    }
  }

  sumarHorasTotal(hora1, hora2) {
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
    if(horatotale[0] < 10){
      horatotale[0] = "0"+horatotale[0];
    }
    if(horatotale[1] < 10){
      horatotale[1] = "0"+horatotale[1];
    }
    return horatotale[0]+":"+horatotale[1];
  }

  getInformeRegisterNow(idDepartamento:string){
    this._appRegistroHoraService.getInformeRegisterNow(idDepartamento)
    .subscribe((registro : RegistroHora[]) => {
      this.informesRegistrosNow = registro;
      this.listHours = ['00:00'];
      this.listSaldo= ['0'];
      this.numStudent = 0;
      this.numHour= '00:00';
      this.totalSaldo = 0;
      this.totalDatos(); 
    });
  }

  totalDatos(){
    var horaInicio, horaFinal, auxHE, auxME, auxHS, auxMS, processHours = null;
    var numMoney;
    for(let registro of this.informesRegistrosNow){
      this.numStudent++;
      if(registro.horaSalida != null){
        if(registro.horaEntrada >= '0' && registro.horaEntrada < '10'){
          auxHE = "0" + registro.horaEntrada.toString();
        }
        else{auxHE = registro.horaEntrada.toString();}
        if(registro.minutoEntrada >= '0' && registro.minutoEntrada < '10'){
          auxME = "0" + registro.minutoEntrada.toString();
        }else{auxME = registro.minutoEntrada.toString();}
        horaInicio = auxHE + ":" + auxME;
        if(registro.horaSalida >= '0' && registro.horaSalida < '10'){
          auxHS = "0" + registro.horaSalida;
        }else{auxHS = registro.horaSalida;}
        if(registro.minutoSalida >= '0' && registro.minutoSalida < '10'){
          auxMS = "0" + registro.minutoSalida;
        }else{auxMS = registro.minutoSalida;}
        horaFinal = auxHS + ":" + auxMS;
        processHours = this.horasTranscurrido(registro.dayEntrada, horaInicio, registro.daySalida, horaFinal);
        this.numHour = this.sumarHorasTotal(this.numHour, processHours);
        numMoney = this.calculadoraSaldo(processHours, this.costoHora);
        this.totalSaldo = parseFloat(numMoney) + parseFloat(this.totalSaldo);
        this.listSaldo.push(numMoney);
        this.listHours.push(processHours);
      }else{
        this.listSaldo.push('0');
        this.listHours.push('00:00');
      }
    }
    this.totalSaldo = parseFloat(this.totalSaldo).toFixed(2);    
  }
  //PARA OBTENER LOS DATOS DEL DEPARTAMENTO LUEGO SE PARA AL METODO infoDepartamento
  getDepartament(idDepartamento:string){
    this._appDepartamentoService.getDepartamento(idDepartamento)
    .subscribe((departamento : Departamento[]) => {this.departamento = departamento});
    setTimeout(() => {
      this.infoDepartamento(idDepartamento);
    }, 2000);
  }
  //Lista de los estudiantes para registrar hora de ingreso
  getEstudiantesDept(idDepartamento:string){
    this._appTipoPersonaService.getListStudentDepto(idDepartamento)
    .subscribe((estudiantes :Persona[]) => {this.estudianteDep = estudiantes});
  }
  //Obtener los estudiantes del departamento para informacion;
  getEstudiantes(idDepartamento:string){
    this._appTipoPersonaService.getInfoEstudiantes(idDepartamento)
    .subscribe((estudiantes : Persona[]) => {this.estudiantes = estudiantes});
  }

  informacionEstudiante(idRegistroHora, idEstudiante){
    this.areas = [];
    for(let estudiante of this.estudiantes){
      if(estudiante.idPersona == idEstudiante){
        if (estudiante.segundoNombre == null && estudiante.segundoApellido != null ) {
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido+ " " + estudiante.primerNombre ;
        } else if (estudiante.segundoNombre == null && estudiante.segundoApellido == null){
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre; 
        }else if (estudiante.segundoNombre != null && estudiante.segundoApellido == null){ 
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
        }else{
          this.nombreCompleto = estudiante.primerApellido + " " + estudiante.segundoApellido + " " + estudiante.primerNombre + " " + estudiante.segundoNombre;
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
          this.areas.push(estudiante.nombreArea);
      }
    }
    for(let registro of this.informesRegistrosNow){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;
      }
    }
  }

  infoDepartamento(idDepartamento:string){
    for(let departamento of this.departamento){
      if(departamento.idDepartamento == idDepartamento){
        if (departamento.segundoNombre == null && departamento.segundoApellido != null ) {
          this.nombreJefe = departamento.primerNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        } else if (departamento.segundoNombre == null && departamento.segundoApellido == null){
          this.nombreJefe = departamento.primerNombre + " " + departamento.primerApellido; 
        }else if (departamento.segundoNombre != null && departamento.segundoApellido == null){ 
          this.nombreJefe = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido;   
        }else{
          this.nombreJefe = departamento.primerNombre + " " + departamento.segundoNombre + " " + departamento.primerApellido + " " + departamento.segundoApellido;
        }
          this.codigoDepartamento = departamento.idDepartamento;
          this.nombreDepartamento = departamento.nombreDepartamento;
          this.estadoDepartamento = departamento.estadoDepartamento;
          this.fechaRegistroHistorialDep = departamento.fechaRegistroHistorialDep;
          this.limiteEstudiante = departamento.limiteEstudiante;
          this.costoHora = departamento.costoHora;
      }
    }
  }

  registrarAsistencia(){
    if(this.idConvenio != undefined || this.idConvenio != null){
      this.registro.idConvenio = this.idConvenio;
      this._appRegistroHoraService.postRegistroHora(this.registro)
      .subscribe((data: RegistroHora[]) => {console.log(data)});
      this.messageSuccess = true;
      setTimeout(() => {
        this.getInformeRegisterNow(this.IdDepartamento);
      }, 2000);
      setTimeout(() => {
        this.messageSuccess = false;
      }, 5000);
    }else{
      this.messageFail = true;
      setTimeout(() => {
        this.messageFail = false;
      }, 5000);
    }    

  }

  registrarSalida(idRegistro:string, fecha){
    this.eliminarInformeEstudiante(fecha, idRegistro); 
    this._appRegistroHoraService.putRegistroSalida(idRegistro, this.registro)
    .subscribe((data : RegistroHora []) => {console.log(data)});
    this.messageExit = true;
    setTimeout(() => {
      this.messageExit = false;
    }, 5000);
    setTimeout(() => {      
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }

  registrarAprobacion(idEstudiante, idRegistro:string, aprobado:string, fecha:string, idRegistroHora:string){
    this.idRegistro = idRegistro;
    this.fecha = fecha;
    this.idRegistroHora = idRegistroHora;
    this.registro.aprobadoRegistroHora = aprobado;
    this.btnConfirmacion = 'aprovacion';
    if(aprobado == '1'){
      this.titleObservation = 'Argumentos de aprobación';
    }else{
      this.titleObservation = 'Argumentos de desaprobación';      
    }
    for(let registro of this.informesRegistrosNow){
      if(registro.idPersona == idEstudiante && registro.idRegistroHora == idRegistroHora){
        this.observacionesRegistroHora = registro.observacionRegistroHora;    
      }
    }
  }

  confirmarAprovacion(){
    if(this.observacionesRegistroHora != null && this.registro.observacionRegistroHora != null){
      this.registro.observacionRegistroHora = this.registro.observacionRegistroHora +' / ' + this.observacionesRegistroHora;
    }else if(this.observacionesRegistroHora != null && this.registro.observacionRegistroHora == null){
      this.registro.observacionRegistroHora = this.observacionesRegistroHora;
    }else if(this.observacionesRegistroHora == null && this.registro.observacionRegistroHora != null){
      this.registro.observacionRegistroHora = this.registro.observacionRegistroHora;
    }
    this._appRegistroHoraService.putRegsitroAprovacion(this.idRegistro, this.registro)
    .subscribe((data : RegistroHora[]) => {console.log(data)});

    if(this.registro.aprobadoRegistroHora == '1'){
      setTimeout(() => {
      this.saveInformeEstudiante(this.idRegistro);        
      }, 1000);
    }else{
      setTimeout(() => {
        this.eliminarInformeEstudiante(this.fecha, this.idRegistroHora);     
        }, 1000);
    }

    setTimeout(() => {
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }

  eliminarAsistencia(idRegistro:string){
   this.idRegistro = idRegistro;
   this.titleObservation = 'Argumentos de eliminación';
   this.btnConfirmacion = 'delete';
  }

  confirmacionDelete(){
    this._appRegistroHoraService.deleteRegistroHora(this.idRegistro, this.registro)
    .subscribe((data : RegistroHora[]) => {console.log(data)});
    this.messageDelete = true;
    setTimeout(() => {
      this.messageDelete = false;
    }, 5000);
    setTimeout(() => {
      this.getInformeRegisterNow(this.IdDepartamento);
    }, 2000);
  }
  //GESTION DE INFORME ESTUDIANTE
  saveInformeEstudiante(idRegistroHora:string){
    var i = 0;
    for(var informe of this.informesRegistrosNow){
      i++;
      if(informe.idRegistroHora == idRegistroHora){       
          this.informeEstudiante.idRegistroHora = informe.idRegistroHora;
          this.informeEstudiante.fecha = informe.fechaEntrada;
          this.informeEstudiante.totalHoras = this.listHours[i];
          this.informeEstudiante.totalSaldo = this.listSaldo[i];
        
          this._appInformeEstudianteService.postInformeEstudiante(this.informeEstudiante)
          .subscribe((informe : InformeEstudiante[]) => {console.log(informe)});
                
      }
    }  
  }

  eliminarInformeEstudiante(fecha:string, idRegistroHora:string){
    this._appInformeEstudianteService.deleteInformeEstudiante(fecha, idRegistroHora)
    .subscribe((data : InformeEstudiante[]) => {console.log(data)});
  }

}
