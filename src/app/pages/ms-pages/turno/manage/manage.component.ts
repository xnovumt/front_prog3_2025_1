import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import Swal from 'sweetalert2';
import { OperarioService } from 'src/app/services/operarioService/operario.service';
import { Operario } from 'src/app/models/operario.model';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import { Maquina } from 'src/app/models/maquina.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3-> Update
  turno: Turno;
  theFormGroup: FormGroup;
  trySend: boolean;

  // Arrays para los selectores
  operarios: Operario[] = [];
  maquinas: Maquina[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someTurno: TurnoService,
    private operarioService: OperarioService,
    private maquinaService: MaquinaService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.turno = { id: 0 };
    this.theFormGroup = this.configFormGroup();
    this.trySend = false;
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
    this.loadOperarios();
    this.loadMaquinas();

    if (this.activateRoute.snapshot.params.id) {
      this.turno.id = this.activateRoute.snapshot.params.id;
      this.getTurno(this.turno.id);
    }
  }

  // Cargar operarios
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

  // Cargar máquinas
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

  getTurno(id: number) {
    this.someTurno.view(id).subscribe({
      next: (turno) => {
        this.turno = turno;
        // Actualizar el FormGroup con los datos obtenidos
        this.theFormGroup.patchValue({
          id: turno.id,
          fecha_hora: turno.fecha_hora,
          operario_id: turno.operario_id,
          maquina_id: turno.maquina_id
        });
        console.log('Turno obtenido exitosamente:', this.turno);
      },
      error: (error) => {
        console.error('Error al obtener turno:', error);
        Swal.fire('Error', 'No se pudo obtener el turno.', 'error');
      }
    });
  }

  // Método para formatear fecha para el backend (formato exacto que necesita)
  private formatDateTimeForBackend(dateTimeValue: string): string {
    if (!dateTimeValue) return '';
    
    console.log('Valor original del input:', dateTimeValue);
    // Input da: "2025-06-12T20:06"
    // Backend necesita: "2025-06-12 20:06:00"
    
    // Reemplazar T por espacio y agregar segundos
    let formatted = dateTimeValue.replace('T', ' ') + ':00';
    
    console.log('Fecha formateada para backend:', formatted);
    return formatted;
  }

  // Método para formatear fecha desde el backend para el formulario
  private formatDateTimeFromBackend(dateTimeValue: string): string {
    if (!dateTimeValue) return '';
    
    console.log('Formateando fecha desde backend:', dateTimeValue);
    
    try {
      // Backend envía: "2025-06-12 20:06:00"
      // Input necesita: "2025-06-12T20:06"
      
      let formatted = dateTimeValue;
      
      // Si tiene segundos, quitarlos
      if (formatted.includes(':') && formatted.split(':').length === 3) {
        formatted = formatted.substring(0, formatted.lastIndexOf(':'));
      }
      
      // Reemplazar espacio con T
      formatted = formatted.replace(' ', 'T');
      
      console.log('Fecha formateada para input:', formatted);
      return formatted;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  }

  // Método create simplificado (ya no necesitamos probar múltiples formatos)
  create() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    const formData = this.theFormGroup.value;
    console.log('Datos del formulario:', formData);
    
    // Validar que la fecha no esté vacía
    if (!formData.fecha_hora) {
      Swal.fire('Error', 'Debe seleccionar una fecha y hora.', 'error');
      return;
    }
    
    // Formatear la fecha al formato que espera el backend
    const formattedDateTime = this.formatDateTimeForBackend(formData.fecha_hora);
    
    const turnoData = {
      fecha_hora: formattedDateTime,
      operario_id: parseInt(formData.operario_id),
      maquina_id: parseInt(formData.maquina_id)
    };

    console.log('Payload enviado al backend:', turnoData);
    
    this.someTurno.create(turnoData).subscribe({
      next: (turno) => {
        console.log('Turno creado exitosamente:', turno);
        Swal.fire({
          title: '¡Creado!',
          text: 'Turno creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/turnos/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear turno:', error);
        console.error('Respuesta del servidor:', error.error);
        let errorMessage = 'No se pudo crear el turno.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }

  // Método update simplificado
  update() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    const formData = this.theFormGroup.value;
    console.log('Datos del formulario para update:', formData);
    
    // Validar que la fecha no esté vacía
    if (!formData.fecha_hora) {
      Swal.fire('Error', 'Debe seleccionar una fecha y hora.', 'error');
      return;
    }
    
    // Validar que el ID del turno exista
    if (!this.turno.id) {
      Swal.fire('Error', 'No se puede actualizar: ID del turno no válido.', 'error');
      return;
    }
    
    // Formatear la fecha al formato que espera el backend
    const formattedDateTime = this.formatDateTimeForBackend(formData.fecha_hora);
    
    const turnoData = {
      id: this.turno.id,
      fecha_hora: formattedDateTime,
      operario_id: parseInt(formData.operario_id),
      maquina_id: parseInt(formData.maquina_id)
    };

    console.log('Payload enviado al backend (update):', turnoData);

    this.someTurno.update(turnoData).subscribe({
      next: (turno) => {
        console.log('Turno actualizado exitosamente:', turno);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Turno actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/turnos/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar turno:', error);
        console.error('Respuesta del servidor:', error.error);
        let errorMessage = 'No se pudo actualizar el turno.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }

  back() {
    this.router.navigate(['/turnos/list']);
  }

  configFormGroup(): FormGroup {
    return this.theFormBuilder.group({
      id: [{ value: 0, disabled: true }],
      fecha_hora: ['', [Validators.required]], // Campo datetime requerido
      operario_id: ['', [Validators.required]],
      maquina_id: ['', [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}