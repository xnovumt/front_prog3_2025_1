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
  theFormGroup: FormGroup; // Form Police
  trySend: boolean;
  operarios: Operario[];
  maquinas: Maquina[];

  constructor(private activateRoute: ActivatedRoute,
    private someTurno: TurnoService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private operarioService: OperarioService,
    private maquinaService: MaquinaService
  ) {
    this.turno = { id: 0 };
    this.trySend = false;
    this.operarios = [];
    this.maquinas = [];
    this.theFormGroup = this.configFormGroup();
  }

  loadOperarios() {
    this.operarioService.list().subscribe(data => {
      this.operarios = data;
    });
  }

  loadMaquinas() {
    this.maquinaService.list().subscribe(data => {
      this.maquinas = data;
    });
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.disable();
      this.getTurno(this.activateRoute.snapshot.params.id);
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      this.loadOperarios();
      this.loadMaquinas();
      this.theFormGroup.reset({ id: { value: 0, disabled: true } });
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getTurno(this.activateRoute.snapshot.params.id); // Obtener turno primero
      this.loadOperarios();
      this.loadMaquinas();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.turno.id = this.activateRoute.snapshot.params.id;
    }
  }

  getTurno(id: number) {
    this.someTurno.view(id).subscribe({
      next: (turno) => {
        this.turno = turno;
        this.theFormGroup.patchValue(turno);
        console.log('Turno fetched successfully:', this.turno);
      },
      error: (error) => {
        console.error('Error fetching turno:', error);
      }
    });
  }

  back() {
    this.router.navigate(['turnos/list']);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.someTurno.create(this.theFormGroup.value).subscribe({
        next: (turno) => {
          console.log('turno created successfully:', turno);
          Swal.fire({
            title: 'Creado!',
            text: 'Registro creado correctamente.',
            icon: 'success',
          });
          this.router.navigate(['/turnos/list']);
        },
        error: (error) => {
          console.error('Error creating turno:', error);
        }
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.someTurno.update(this.theFormGroup.value).subscribe({
        next: (turno) => {
          console.log('turno updated successfully:', turno);
          Swal.fire({
            title: 'Actualizado!',
            text: 'Registro actualizado correctamente.',
            icon: 'success',
          });
          this.router.navigate(['/turnos/list']);
        },
        error: (error) => {
          console.error('Error updating turno:', error);
        }
      });
    }
  }

  delete(id: number) {
    console.log("Delete turno with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someTurno.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          });
      }
    });
  }

  configFormGroup() {
    return this.theFormBuilder.group({
      fecha: ['', Validators.required],
      operario_id: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Asegura que solo sean números
      maquina_id: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],   // Asegura que solo sean números
      novedades: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]     // Asegura que solo sean números
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}