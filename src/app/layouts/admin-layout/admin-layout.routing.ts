import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { usuarioProfileComponent } from '../../pages/usuario-profile/usuario-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'tablero', component: DashboardComponent, canActivate: [AuthenticatedGuard] },
  { path: 'perfil-usuario', component: usuarioProfileComponent, canActivate: [AuthenticatedGuard] },
  { path: 'tablas', component: TablesComponent, canActivate: [AuthenticatedGuard] },
  { path: 'iconos', component: IconsComponent, canActivate: [AuthenticatedGuard] },
  { path: 'mapas', component: MapsComponent, canActivate: [AuthenticatedGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'facturas', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/factura/factura.module').then(m => m.FacturaModule) }, { path: 'chats', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/chats/chats.module').then(m => m.ChatsModule) },
  { path: 'maquina-combo', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/maquinacombo/maquinacombo.module').then(m => m.MaquinaComboModule) },
  { path: 'combos', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/combos/combos.module').then(m => m.CombosModule) },
  { path: 'obra', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/obra/obra.module').then(m => m.ObraModule) },
  { path: 'gobernante-departamento', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/gobernantedepartamento/gobernantedepartamento.module').then(m => m.GobernanteDepartamentoModule) },
  { path: 'evidencias', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/evidencia/evidencia.module').then(m => m.EvidenciaModule) },
  { path: 'gps', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/gps/gps.module').then(m => m.GpsModule) }, { path: 'seguros', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/seguro/seguro.module').then(m => m.SeguroModule) },
  { path: 'maquina', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/maquina/maquina.module').then(m => m.MaquinaModule) },
  { path: 'especialidad-maquinaria', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/especialidadmaquinaria/especialidadmaquinaria.module').then(m => m.EspecialidadMaquinariaModule) }, { path: 'mantenimientos', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
  { path: 'procedimiento-mantenimiento', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/procedimientomantenimiento/procedimientomantenimiento.module').then(m => m.ProcedimientoMantenimientoModule) },
  { path: 'mensajes', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/mensaje/mensaje.module').then(m => m.MensajeModule) },
  { path: 'obra-municipio', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/obramunicipio/obramunicipio.module').then(m => m.ObraMunicipioModule) },
  { path: 'gobernante-municipio', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/gobernantemunicipio/gobernantemunicipio.module').then(m => m.GobernanteMunicipioModule) },
  { path: 'novedades', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/novedad/novedad.module').then(m => m.NovedadModule) },
  { path: 'operario', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/operario/operario.module').then(m => m.OperarioModule) },
  { path: 'polizas', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/poliza/poliza.module').then(m => m.PolizaModule) },
  { path: 'procedimientos', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/procedimiento/procedimiento.module').then(m => m.ProcedimientoModule) },
  { path: 'cuotas', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/cuotas/cuotas.module').then(m => m.CuotasModule) },
  { path: 'gobernantes', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/gobernante/gobernante.module').then(m => m.GobernanteModule) },
  { path: 'servicio', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/servicio/servicio.module').then(m => m.ServicioModule) },
  { path: 'turnos', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/turno/turno.module').then(m => m.TurnoModule) },
  { path: 'especialidad-operarios', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/operarioespecialidad/operarioespecialidad.module').then(m => m.OperarioEspecialidadModule) },
  { path: 'especialidades', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
  { path: 'tiposervicio', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/tiposervicio/tiposervicio.module').then(m => m.TipoServicioModule) },
  { path: 'municipios', canActivate: [AuthenticatedGuard], loadChildren: () => import('src/app/pages/ms-pages/municipio/municipio.module').then(m => m.MunicipioModule) }
];
