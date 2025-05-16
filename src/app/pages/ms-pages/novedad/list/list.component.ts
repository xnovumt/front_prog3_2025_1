// novelty/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadService } from 'src/app/services/novedadService/novedad.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-novedad',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListNovedadComponent implements OnInit {

  novedades: Novedad[] = []; // Array to store novedades

  // Inject the service and Router (if needed)
  constructor(private NovedadService: NovedadService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.NovedadService.list().subscribe(data => {
      this.novedades = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Novedad ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Novedad ID:', id);
    // Implement call to the delete service method
  }
}