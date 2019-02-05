import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { GestionarUsuarioComponent } from './components/gestionar-usuario/gestionar-usuario.component';
import { GestionarAcreedorComponent } from './components/gestionar-acreedor/gestionar-acreedor.component';
import { GestionarAreaComponent } from './components/gestionar-area/gestionar-area.component';
import { GestionarBecaComponent } from './components/gestionar-beca/gestionar-beca.component';
import { GestionarConvenioComponent } from './components/gestionar-convenio/gestionar-convenio.component';
import { GestionarDepartamentoComponent } from './components/gestionar-departamento/gestionar-departamento.component';
import { GestionarDescuentoComponent } from './components/gestionar-descuento/gestionar-descuento.component';
import { GestionarInformeEstudianteComponent } from './components/gestionar-informe-estudiante/gestionar-informe-estudiante.component';
import { GestionarInformeFinanzasComponent } from './components/gestionar-informe-finanzas/gestionar-informe-finanzas.component';
import { GestionarInformeFinanzasAprobadoComponent } from './components/gestionar-informe-finanzas-aprobado/gestionar-informe-finanzas-aprobado.component';
import { GestionarInformeFinanzasArchivadoComponent } from './components/gestionar-informe-finanzas-archivado/gestionar-informe-finanzas-archivado.component';
import { GestionarInformeJefeComponent } from './components/gestionar-informe-jefe/gestionar-informe-jefe.component';
import { GestionarInformeJefeArhivadoComponent } from './components/gestionar-informe-jefe-arhivado/gestionar-informe-jefe-arhivado.component';
import { GestionarOrganizacionComponent } from './components/gestionar-organizacion/gestionar-organizacion.component';
import { GestionarRolComponent } from './components/gestionar-rol/gestionar-rol.component';
import { GestionarTurnoComponent } from './components/gestionar-turno/gestionar-turno.component';
import { GestionarInformeHoyComponent } from './components/gestionar-informe-hoy/gestionar-informe-hoy.component';
import { GestionarInformeAyerComponent } from "./components/gestionar-informe-ayer/gestionar-informe-ayer.component";
import { GestionarInformeWeekComponent } from './components/gestionar-informe-week/gestionar-informe-week.component';
import { GestionarInformeMonthComponent } from './components/gestionar-informe-month/gestionar-informe-month.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'acreedor', component: GestionarAcreedorComponent },
  { path: 'area', component: GestionarAreaComponent },
  { path: 'beca', component: GestionarBecaComponent },
  { path: 'convenio', component: GestionarConvenioComponent },
  { path: 'departamento', component: GestionarDepartamentoComponent },
  { path: 'descuento', component: GestionarDescuentoComponent },
  { path: 'informeEstudiante', component: GestionarInformeEstudianteComponent },
  { path: 'informeFinanzas', component: GestionarInformeFinanzasComponent },
  { path: 'informeFinanzasAprobado', component: GestionarInformeFinanzasAprobadoComponent },
  { path: 'informeFinanzasArchivado', component: GestionarInformeFinanzasArchivadoComponent },
  { path: 'informeJefe', component: GestionarInformeJefeComponent },
  { path: 'informeJefeArchivado', component: GestionarInformeJefeArhivadoComponent },
  { path: 'organizacion', component: GestionarOrganizacionComponent },
  { path: 'informeHoy', component: GestionarInformeHoyComponent },
  { path: 'informeAyer', component: GestionarInformeAyerComponent },
  { path: 'informeWeek', component: GestionarInformeWeekComponent },
  { path: 'informeMonth', component: GestionarInformeMonthComponent },
  //Falta este modulo registroHora
  { path: 'registroHora', component: GestionarUsuarioComponent },
  { path: 'rol', component: GestionarRolComponent },
  { path: 'turno', component: GestionarTurnoComponent },
  { path: 'user', component: GestionarUsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
