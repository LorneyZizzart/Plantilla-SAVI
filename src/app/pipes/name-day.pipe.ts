import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameDay'
})
export class NameDayPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
      let date = new Date(value);
    
      var fechaNum = date.getDate()+1;
      var mes_name = date.getMonth();  
      if(fechaNum >= 32){
        fechaNum = 1;
      }  
      // console.log(dias[date.getDay()] + " " + fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear());
    // console.log(dias[fecha.getDay()] + " " + fechaNum + " de " + meses[mes_name] + " de " +  fecha.getFullYear());
    //   Miercoles 30 de Enero de 2

    return (dias[date.getDay()]).toLowerCase() + ", " + fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear();
  }

}
