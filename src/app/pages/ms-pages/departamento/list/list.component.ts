import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamentoService/departamento.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-departamento',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListDepartamentoComponent implements OnInit {

    departamentos: Departamento[] = [];

    constructor(private departamentoService: DepartamentoService, private router: Router) { }

    ngOnInit(): void {
        // Primero sincronizar, luego listar
        this.sincronizarYListar();
    }

    sincronizarYListar() {
        console.log('🔄 Sincronizando departamentos...');
        this.departamentoService.sincronizar().subscribe({
            next: (response) => {
                console.log('✅ Sincronización de departamentos exitosa, ahora listando...');
                this.cargarLista();
            },
            error: (error) => {
                console.error('❌ Error en sincronización de departamentos, cargando lista existente...');
                this.cargarLista(); // Cargar lo que hay aunque falle la sincronización
            }
        });
    }

    cargarLista() {
        this.departamentoService.list().subscribe({
            next: (response) => {
                this.departamentos = response.data;
                console.log('✅ Lista de departamentos cargada:', this.departamentos);
            },
            error: (error) => {
                console.error('❌ Error cargando lista de departamentos:', error);
            }
        });
    }

    sincronizar() {
        console.log('🔄 Sincronizando departamentos manualmente...');
        this.departamentoService.sincronizar().subscribe({
            next: (response) => {
                console.log('✅ Sincronización manual de departamentos exitosa:', response);
                Swal.fire('Éxito', 'Departamentos sincronizados correctamente', 'success');
                // Recargar la lista
                this.cargarLista();
            },
            error: (error) => {
                console.error('❌ Error en sincronización manual de departamentos:', error);
                Swal.fire('Error', 'No se pudo sincronizar departamentos', 'error');
            }
        });
    }
}