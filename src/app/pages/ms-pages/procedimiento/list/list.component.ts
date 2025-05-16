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

  Procedimientos: Procedimiento[] = []; // Array to store Procedimientos

  // Inject the service and Router (if needed)
  constructor(private ProcedimientoService: ProcedimientoService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.ProcedimientoService.list().subscribe(data => {
      this.Procedimientos = data; // Assign data to the array property
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