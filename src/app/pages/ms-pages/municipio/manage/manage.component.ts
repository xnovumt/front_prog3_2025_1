import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { MunicipioService } from 'src/app/services/municipioService/municipio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-manage-municipio',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageMunicipioComponent implements OnInit {

    mode: number; // 1->View, 2->Create, 3->Update
    municipio: Municipio;

    constructor(private activateRoute: ActivatedRoute,
        private municipioService: MunicipioService,
        private router: Router) {
        this.municipio = { id: '', nombre: '', departamento_id: 0 }; // Initialize all required properties
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
        if (this.activateRoute.snapshot.params.id) {
            this.municipio.id = this.activateRoute.snapshot.params.id; // Ensure id is treated as a string
            this.getMunicipio(this.municipio.id);
        }
    }

    getMunicipio(id: string): void { // Ensure id is a string
        if (!id) {
            console.error('El ID proporcionado es inválido o undefined:', id);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El ID proporcionado no es válido.'
            });
            return;
        }
        this.municipioService.view(id).subscribe({
            next: (municipio) => {
                this.municipio = municipio;
                console.log('Municipio fetched successfully:', this.municipio);
            },
            error: (error) => {
                console.error('Error fetching municipio:', error);
            }
        });
    }
}