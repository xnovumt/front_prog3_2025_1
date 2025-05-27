import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { MunicipioService } from 'src/app/services/municipioService/municipio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-municipio',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListMunicipioComponent implements OnInit {

    municipios: Municipio[] = []; // Array to store municipios

    constructor(private municipioService: MunicipioService, private router: Router) { }

    ngOnInit(): void {
        this.municipioService.list().subscribe({
            next: (response) => {
                this.municipios = response.data; // Extract the array from the 'data' property
                console.log('Datos recibidos de municipios:', this.municipios); // Debugging log
            },
            error: (error) => {
                console.error('Error al obtener los municipios:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los municipios. Por favor, intente nuevamente más tarde.'
                });
            }
        });
    }
}
