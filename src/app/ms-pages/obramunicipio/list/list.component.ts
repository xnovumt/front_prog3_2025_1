// ObraMunicipio/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { ObraMunicipio } from 'src/app/models/obra-municipio.model';
import { ObraMunicipioService } from 'src/app/services/obraMunicipioService/obra-municipio.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-municipality-construction',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListObraMunicipioComponent implements OnInit {

  obramunicipios: ObraMunicipio[] = []; // Array to store links

  // Inject the service and Router (if needed)
  constructor(private ObraMunicipioService: ObraMunicipioService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.ObraMunicipioService.list().subscribe(data => {
      this.obramunicipios = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Municipality-Construction Link ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Municipality-Construction Link ID:', id);
    // Implement call to the delete service method
  }
}