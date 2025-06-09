import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { Servicio } from 'src/app/models/servicio.model';
import { CombosService } from 'src/app/services/comboService/combos.service';
import { ServicioService } from 'src/app/services/servicioService/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  combo: Combo;
  
  // Array para el selector
  servicios: Servicio[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private combosService: CombosService,
    private servicioService: ServicioService,
    private router: Router
  ) {
    this.combo = {
      id: 0,
      servicio_id: undefined
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

    // Cargar servicios para el selector
    this.loadServicios();

    if (this.activateRoute.snapshot.params.id) {
      this.combo.id = this.activateRoute.snapshot.params.id;
      this.getCombo(this.combo.id);
    }
  }

  // Método para cargar servicios
  loadServicios() {
    this.servicioService.list().subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios);
      },
      error: (error) => {
        console.error('Error cargando servicios:', error);
      }
    });
  }

  getCombo(id: number) {
    this.combosService.view(id).subscribe({
      next: (combo) => {
        this.combo = combo;
        console.log('Combo fetched successfully:', this.combo);
      },
      error: (error) => {
        console.error('Error fetching combo:', error);
      }
    });
  }

  back() {
    this.router.navigate(['combos/list']);
  }

  create() {
    this.combosService.create(this.combo).subscribe({
      next: (combo) => {
        console.log('Combo created successfully:', combo);
        Swal.fire({
          title: 'Creado!',
          text: 'Combo creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/combos/list']);
        });
      },
      error: (error) => {
        console.error('Error creating combo:', error);
        Swal.fire('Error', 'No se pudo crear el combo.', 'error');
      }
    });
  }

  update() {
    this.combosService.update(this.combo).subscribe({
      next: (combo) => {
        console.log('Combo updated successfully:', combo);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Combo actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/combos/list']);
        });
      },
      error: (error) => {
        console.error('Error updating combo:', error);
        Swal.fire('Error', 'No se pudo actualizar el combo.', 'error');
      }
    });
  }
}
