import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poliza } from 'src/app/models/poliza.model';
import { Maquina } from 'src/app/models/maquina.model';
import { Operario } from 'src/app/models/operario.model';
import { Seguro } from 'src/app/models/seguro.model';
import { PolizaService } from 'src/app/services/polizaService/poliza.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import { OperarioService } from 'src/app/services/operarioService/operario.service';
import { SeguroService } from 'src/app/services/seguroService/seguro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  poliza: Poliza;

  // Arrays para los selectores
  maquinas: Maquina[] = [];
  operarios: Operario[] = [];
  seguros: Seguro[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private somePoliza: PolizaService,
    private maquinaService: MaquinaService,
    private operarioService: OperarioService,
    private seguroService: SeguroService,
    private router: Router
  ) {
    this.poliza = {
      id: 0,
      maquinaria_id: undefined,
      operario_id: undefined,
      seguro_id: undefined,
      fecha_inicio: undefined,
      fecha_fin: undefined,
      tipo_poliza: '' // Cambiar de undefined a string vacío
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    // Cargar listas para los selectores
    this.loadMaquinas();
    this.loadOperarios();
    this.loadSeguros();

    if (this.activateRoute.snapshot.params.id) {
      this.poliza.id = this.activateRoute.snapshot.params.id;
      this.getPoliza(this.poliza.id);
    }
  }

  // Método para cargar máquinas
  loadMaquinas() {
    this.maquinaService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.maquinas = response.data;
        } else if (Array.isArray(response)) {
          this.maquinas = response;
        } else {
          console.error('Estructura de respuesta inesperada para máquinas:', response);
          this.maquinas = [];
        }
        console.log('Máquinas cargadas:', this.maquinas);
      },
      error: (error) => {
        console.error('Error cargando máquinas:', error);
        this.maquinas = [];
      }
    });
  }

  // Método para cargar operarios
  loadOperarios() {
    this.operarioService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.operarios = response.data;
        } else if (Array.isArray(response)) {
          this.operarios = response;
        } else {
          console.error('Estructura de respuesta inesperada para operarios:', response);
          this.operarios = [];
        }
        console.log('Operarios cargados:', this.operarios);
      },
      error: (error) => {
        console.error('Error cargando operarios:', error);
        this.operarios = [];
      }
    });
  }

  // Método para cargar seguros
  loadSeguros() {
    this.seguroService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.seguros = response.data;
        } else if (Array.isArray(response)) {
          this.seguros = response;
        } else {
          console.error('Estructura de respuesta inesperada para seguros:', response);
          this.seguros = [];
        }
        console.log('Seguros cargados:', this.seguros);
      },
      error: (error) => {
        console.error('Error cargando seguros:', error);
        this.seguros = [];
      }
    });
  }

  getPoliza(id: number) {
    this.somePoliza.view(id).subscribe({
      next: (poliza) => {
        this.poliza = poliza;
        console.log('Poliza obtenida exitosamente:', this.poliza);
      },
      error: (error) => {
        console.error('Error al obtener poliza:', error);
        Swal.fire('Error', 'No se pudo obtener la póliza.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['polizas/list']);
  }

  create() {
    if (!this.validatePoliza()) {
      Swal.fire('Error', this.getValidationMessage(), 'error');
      return;
    }

    // Debug: Verificar estado actual del objeto poliza
    console.log('Estado actual de poliza antes de crear payload:', {
      operario_id: this.poliza.operario_id,
      maquinaria_id: this.poliza.maquinaria_id,
      tipo_poliza: this.poliza.tipo_poliza
    });

    // Determinar qué tipo de póliza es y construir el payload apropiado
    let polizaData: any = {};

    // Campos comunes
    polizaData.seguro_id = this.poliza.seguro_id;
    polizaData.fecha_inicio = this.poliza.fecha_inicio;
    polizaData.fecha_fin = this.poliza.fecha_fin;
    polizaData.tipo_poliza = this.poliza.tipo_poliza;

    // Agregar SOLO el campo correspondiente
    if (this.poliza.operario_id && !this.poliza.maquinaria_id) {
      polizaData.operario_id = this.poliza.operario_id;
      console.log('Creando póliza para OPERARIO');
    } else if (this.poliza.maquinaria_id && !this.poliza.operario_id) {
      polizaData.maquinaria_id = this.poliza.maquinaria_id;
      console.log('Creando póliza para MAQUINARIA');
    } else {
      console.error('Error en validación exclusiva:', {
        operario_id: this.poliza.operario_id,
        maquinaria_id: this.poliza.maquinaria_id
      });
      Swal.fire('Error', 'Error en la selección de operario/máquina.', 'error');
      return;
    }

    // Verificar que el payload NO contenga ambos campos
    const hasOperarioInPayload = polizaData.hasOwnProperty('operario_id');
    const hasMaquinaInPayload = polizaData.hasOwnProperty('maquinaria_id');

    console.log('Verificación del payload:', {
      'Contiene operario_id': hasOperarioInPayload,
      'Contiene maquinaria_id': hasMaquinaInPayload,
      'Payload completo': polizaData
    });

    if (hasOperarioInPayload && hasMaquinaInPayload) {
      console.error('ERROR: El payload contiene ambos campos!');
      Swal.fire('Error', 'Error interno: payload contiene ambos campos.', 'error');
      return;
    }

    this.somePoliza.create(polizaData).subscribe({
      next: (poliza) => {
        console.log('Poliza creada exitosamente:', poliza);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/polizas/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear poliza:', error);
        console.error('Respuesta del servidor:', error.error);
        Swal.fire('Error', 'No se pudo crear la póliza.', 'error');
      }
    });
  }

  update() {
    if (!this.validatePoliza()) {
      Swal.fire('Error', this.getValidationMessage(), 'error');
      return;
    }

    // Debug: Verificar estado actual del objeto poliza
    console.log('Estado actual de poliza antes de crear payload:', {
      id: this.poliza.id,
      operario_id: this.poliza.operario_id,
      maquinaria_id: this.poliza.maquinaria_id,
      tipo_poliza: this.poliza.tipo_poliza
    });

    // Determinar qué tipo de póliza es y construir el payload apropiado
    let polizaData: any = {};

    // Campos comunes (INCLUIR el ID en el payload)
    polizaData.id = this.poliza.id;
    polizaData.seguro_id = this.poliza.seguro_id;
    polizaData.fecha_inicio = this.poliza.fecha_inicio;
    polizaData.fecha_fin = this.poliza.fecha_fin;
    polizaData.tipo_poliza = this.poliza.tipo_poliza;

    // Agregar SOLO el campo correspondiente
    if (this.poliza.operario_id && !this.poliza.maquinaria_id) {
      polizaData.operario_id = this.poliza.operario_id;
      console.log('Actualizando póliza para OPERARIO');
    } else if (this.poliza.maquinaria_id && !this.poliza.operario_id) {
      polizaData.maquinaria_id = this.poliza.maquinaria_id;
      console.log('Actualizando póliza para MAQUINARIA');
    } else {
      console.error('Error en validación exclusiva:', {
        operario_id: this.poliza.operario_id,
        maquinaria_id: this.poliza.maquinaria_id
      });
      Swal.fire('Error', 'Error en la selección de operario/máquina.', 'error');
      return;
    }

    // Verificar que el payload NO contenga ambos campos
    const hasOperarioInPayload = polizaData.hasOwnProperty('operario_id');
    const hasMaquinaInPayload = polizaData.hasOwnProperty('maquinaria_id');

    console.log('Verificación del payload para update:', {
      'ID de póliza': this.poliza.id,
      'Contiene operario_id': hasOperarioInPayload,
      'Contiene maquinaria_id': hasMaquinaInPayload,
      'Payload completo': polizaData
    });

    if (hasOperarioInPayload && hasMaquinaInPayload) {
      console.error('ERROR: El payload contiene ambos campos!');
      Swal.fire('Error', 'Error interno: payload contiene ambos campos.', 'error');
      return;
    }

    // Enviar solo el objeto completo (no ID por separado)
    this.somePoliza.update(polizaData).subscribe({
      next: (poliza) => {
        console.log('Poliza actualizada exitosamente:', poliza);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/polizas/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar poliza:', error);
        console.error('Respuesta del servidor:', error.error);
        Swal.fire('Error', 'No se pudo actualizar la póliza.', 'error');
      }
    });
  }

  delete(id: number) {
    console.log("Delete poliza with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.somePoliza.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/polizas/list']);
          },
          error: (error) => {
            console.error('Error al eliminar poliza:', error);
            Swal.fire('Error', 'No se pudo eliminar la póliza.', 'error');
          }
        });
      }
    });
  }

  // Agregar las opciones de tipo de póliza según el contexto
  getTipoPolizaOptions() {
    if (this.poliza.operario_id) {
      // Opciones para operarios
      return [
        { value: 'ARL', label: 'ARL (Administradora de Riesgos Laborales)' },
        { value: 'SEGURO_VIDA', label: 'Seguro de Vida' },
        { value: 'SEGURO_ACCIDENTES', label: 'Seguro de Accidentes' }
      ];
    } else if (this.poliza.maquinaria_id) {
      // Opciones para maquinaria
      return [
        { value: 'TODO_RIESGO', label: 'Todo Riesgo' },
        { value: 'RESPONSABILIDAD_CIVIL', label: 'Responsabilidad Civil' },
        { value: 'DANOS_TERCEROS', label: 'Daños a Terceros' }
      ];
    } else {
      // Sin selección, mostrar todas las opciones con separadores
      return [
        { value: '', label: '--- Opciones para Operarios ---', disabled: true },
        { value: 'ARL', label: 'ARL (Administradora de Riesgos Laborales)' },
        { value: 'SEGURO_VIDA', label: 'Seguro de Vida' },
        { value: 'SEGURO_ACCIDENTES', label: 'Seguro de Accidentes' },
        { value: '', label: '--- Opciones para Maquinaria ---', disabled: true },
        { value: 'TODO_RIESGO', label: 'Todo Riesgo' },
        { value: 'RESPONSABILIDAD_CIVIL', label: 'Responsabilidad Civil' },
        { value: 'DANOS_TERCEROS', label: 'Daños a Terceros' }
      ];
    }
  }

  // Actualizar los métodos de cambio para limpiar tipo_poliza
  onOperarioChange() {
    console.log('onOperarioChange llamado, valor:', this.poliza.operario_id);

    if (this.poliza.operario_id) {
      // Forzar limpieza explícita
      this.poliza.maquinaria_id = null as any;
      this.poliza.tipo_poliza = '';

      console.log('Después de limpiar máquina:', {
        operario_id: this.poliza.operario_id,
        maquinaria_id: this.poliza.maquinaria_id,
        tipo_poliza: this.poliza.tipo_poliza
      });
    }
  }

  onMaquinaChange() {
    console.log('onMaquinaChange llamado, valor:', this.poliza.maquinaria_id);

    if (this.poliza.maquinaria_id) {
      // Forzar limpieza explícita
      this.poliza.operario_id = null as any;
      this.poliza.tipo_poliza = '';

      console.log('Después de limpiar operario:', {
        operario_id: this.poliza.operario_id,
        maquinaria_id: this.poliza.maquinaria_id,
        tipo_poliza: this.poliza.tipo_poliza
      });
    }
  }

  // Validación
  private validatePoliza(): boolean {
    // Verificar que tenga seguro, fechas
    const basicValidation = !!this.poliza.seguro_id &&
      !!this.poliza.fecha_inicio &&
      !!this.poliza.fecha_fin;

    // Verificar que tenga EXACTAMENTE uno: operario O máquina (pero no ambos ni ninguno)
    const hasOperario = !!this.poliza.operario_id;
    const hasMaquina = !!this.poliza.maquinaria_id;
    const exclusiveSelection = (hasOperario && !hasMaquina) || (!hasOperario && hasMaquina);

    // Verificar que el tipo de póliza sea válido según la selección
    let validTipoPoliza = false;
    if (hasOperario && !hasMaquina) {
      // Para operarios
      validTipoPoliza = ['ARL', 'SEGURO_VIDA', 'SEGURO_ACCIDENTES'].includes(this.poliza.tipo_poliza as string);
    } else if (!hasOperario && hasMaquina) {
      // Para maquinaria
      validTipoPoliza = ['TODO_RIESGO', 'RESPONSABILIDAD_CIVIL', 'DANOS_TERCEROS'].includes(this.poliza.tipo_poliza as string);
    }

    return basicValidation && exclusiveSelection && validTipoPoliza;
  }

  // Método helper para mostrar mensaje de validación específico
  private getValidationMessage(): string {
    const hasOperario = !!this.poliza.operario_id;
    const hasMaquina = !!this.poliza.maquinaria_id;

    if (!this.poliza.seguro_id) return 'Debe seleccionar un seguro.';
    if (!this.poliza.fecha_inicio) return 'Debe ingresar la fecha de inicio.';
    if (!this.poliza.fecha_fin) return 'Debe ingresar la fecha de fin.';

    if (!hasOperario && !hasMaquina) {
      return 'Debe seleccionar un operario O una máquina (no puede estar vacío).';
    }
    if (hasOperario && hasMaquina) {
      return 'La póliza solo puede cubrir un operario O una máquina (no ambos).';
    }

    if (!this.poliza.tipo_poliza) {
      if (hasOperario) {
        return 'Debe seleccionar un tipo de póliza válido para operarios.';
      } else {
        return 'Debe seleccionar un tipo de póliza válido para maquinaria.';
      }
    }

    // Validar que el tipo sea correcto según la selección
    if (hasOperario && !['ARL', 'SEGURO_VIDA', 'SEGURO_ACCIDENTES'].includes(this.poliza.tipo_poliza as string)) {
      return 'El tipo de póliza seleccionado no es válido para operarios.';
    }
    if (hasMaquina && !['TODO_RIESGO', 'RESPONSABILIDAD_CIVIL', 'DANOS_TERCEROS'].includes(this.poliza.tipo_poliza as string)) {
      return 'El tipo de póliza seleccionado no es válido para maquinaria.';
    }

    return 'Por favor, complete todos los campos obligatorios.';
  }
}
