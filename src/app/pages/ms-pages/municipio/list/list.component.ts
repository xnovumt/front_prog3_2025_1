import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { MunicipioService } from 'src/app/services/municipioService/municipio.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-list-municipio',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListMunicipioComponent implements OnInit {

    municipios: Municipio[] = []; // Array to store municipios

    constructor(private municipioService: MunicipioService, private router: Router) { }

    ngOnInit(): void {
        // Primero sincronizar, luego listar
        this.sincronizarYListar();
    }

    sincronizarYListar() {
        console.log('🔄 Sincronizando primero...');
        this.municipioService.sincronizar().subscribe({
            next: (response) => {
                console.log('✅ Sincronización exitosa, ahora listando...');
                this.cargarLista();
            },
            error: (error) => {
                console.error('❌ Error en sincronización, cargando lista existente...');
                this.cargarLista(); // Cargar lo que hay aunque falle la sincronización
            }
        });
    }

    cargarLista() {
        this.municipioService.list().subscribe({
            next: (response) => {
                this.municipios = response.data;
                console.log('✅ Lista cargada:', this.municipios);
            },
            error: (error) => {
                console.error('❌ Error cargando lista:', error);
            }
        });
    }

    sincronizar() {
        console.log('🔄 Sincronizando municipios...');
        this.municipioService.sincronizar().subscribe({
            next: (response) => {
                console.log('✅ Sincronización exitosa:', response);
                Swal.fire('Éxito', 'Municipios sincronizados correctamente', 'success');
                // Recargar la lista
                this.ngOnInit();
            },
            error: (error) => {
                console.error('❌ Error en sincronización:', error);
                Swal.fire('Error', 'No se pudo sincronizar', 'error');
            }
        });
    }
}
