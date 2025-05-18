// procedure/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Procedimiento } from 'src/app/models/procedimiento.model';
import { ProcedimientoService } from 'src/app/services/procedimientoService/procedimiento.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-Procedimiento',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProcedimientoComponent implements OnInit {

  procedimientos: Procedimiento[] = []; // Renombré la propiedad para que sea consistente con el HTML y esté en minúsculas

  // Inject the service and Router (if needed)
  constructor(private procedimientoService: ProcedimientoService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.procedimientoService.list().subscribe(data => {
      this.procedimientos = data; // Asigna los datos a la propiedad renombrada
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Procedimiento ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Procedimiento ID:', id);
    // Implement call to the delete service method
  }
}