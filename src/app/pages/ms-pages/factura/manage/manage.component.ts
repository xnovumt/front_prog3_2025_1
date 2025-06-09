import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from 'src/app/models/factura.model';
import { Cuotas } from 'src/app/models/cuotas.model';
import { FacturaService } from 'src/app/services/facturaService/factura.service';
import { CuotasService } from 'src/app/services/cuotasService/cuotas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-factura',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageFacturaComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3-> Update
  factura: Factura;
  
  // Array para el selector
  cuotas: Cuotas[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private cuotasService: CuotasService,
    private router: Router
  ) {
    this.factura = { 
      id: 0,
      detalle: '',
      id_cuota: undefined
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

    // Cargar cuotas para el selector
    this.loadCuotas();

    if (this.activateRoute.snapshot.params.id) {
      this.factura.id = this.activateRoute.snapshot.params.id;
      this.getFactura(this.factura.id);
    }
  }

  // Método para cargar cuotas
  loadCuotas() {
    this.cuotasService.list().subscribe({
      next: (data) => {
        this.cuotas = data;
        console.log('Cuotas cargadas:', this.cuotas);
      },
      error: (error) => {
        console.error('Error cargando cuotas:', error);
      }
    });
  }

  getFactura(id: number) {
    this.facturaService.view(id).subscribe({
      next: (factura) => {
        this.factura = factura;
        console.log('Factura fetched successfully:', this.factura);
      },
      error: (error) => {
        console.error('Error fetching factura:', error);
        Swal.fire('Error', 'No se pudo obtener la factura.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['facturas/list']);
  }

  create() {
    if (!this.validateFactura()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }
    this.facturaService.create(this.factura).subscribe({
      next: (factura) => {
        console.log('Factura created successfully:', factura);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/facturas/list']);
        });
      },
      error: (error) => {
        console.error('Error creating factura:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    if (!this.validateFactura()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }
    this.facturaService.update(this.factura).subscribe({
      next: (factura) => {
        console.log('Factura updated successfully:', factura);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/facturas/list']);
        });
      },
      error: (error) => {
        console.error('Error updating factura:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/facturas/list']);
          },
          error: (error) => {
            console.error('Error al eliminar la factura:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  private validateFactura(): boolean {
    return !!this.factura.detalle && !!this.factura.id_cuota;
  }
}
