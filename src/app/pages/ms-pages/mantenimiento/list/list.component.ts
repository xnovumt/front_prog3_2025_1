// maintenance/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { MantenimientoService } from 'src/app/services/mantenimientoService/mantenimiento.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-Mantenimiento',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMantenimientoComponent implements OnInit {

  mantenimientos: Mantenimiento[] = []; // Array to store Mantenimientos

  // Inject the MantenimientoService and Router (if needed)
  constructor(private MantenimientoService: MantenimientoService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of Mantenimientos
    this.MantenimientoService.list().subscribe(data => {
      this.mantenimientos = data; // Assign data to the Mantenimientos array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Mantenimiento model)
  edit(id: number) {
    console.log('Editing Mantenimiento ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/Mantenimiento/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Mantenimiento ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.MantenimientoService.delete(id).subscribe(() => {
    //   console.log('Mantenimiento deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}