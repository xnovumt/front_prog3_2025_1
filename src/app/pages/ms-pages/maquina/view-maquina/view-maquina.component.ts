import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.model';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importa DomSanitizer y SafeResourceUrl

@Component({
  selector: 'app-view-maquina',
  templateUrl: './view-maquina.component.html',
  styleUrls: ['./view-maquina.component.scss']
})
export class ViewMaquinaComponent implements OnInit {
  machineId: number = 0;
  maquina: Maquina | undefined;
  loading: boolean = true;
  errorMessage: string = '';
  mapUrl: SafeResourceUrl = ''; // <---- Esta línea es la que falta o está incorrecta

  constructor(
    private route: ActivatedRoute,
    private maquinaService: MaquinaService,
    private router: Router,
    private sanitizer: DomSanitizer // Inyecta DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.machineId = +params['id'];
      this.loadMachineDetails(this.machineId);
    });
  }

  loadMachineDetails(id: number): void {
    this.loading = true;
    this.maquinaService.view(id).subscribe(
      (data) => {
        this.maquina = data;
        this.loading = false;
        // Define la URL del mapa directamente con la ubicación
        const ubicacion = 'La Maquina Burger Manizales, Calle 61 # 23a - 08 manizales, Terraza (Contiguo a Unitecnica, Piso 3, La estrella, Manizales, Caldas, Colombia';
        const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.178638521779!2d-75.5874126852378!3d5.05977899668375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47a41948415475%3A0xdd1309595078905!2sLa%20Maquina%20Burger%20Manizales!5e0!3m2!1ses-419!2sco!4v1717218943942!5m2!1ses-419!2sco`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
      },
      (error) => {
        this.errorMessage = 'Error al cargar los detalles de la máquina.';
        console.error(this.errorMessage, error);
        this.loading = false;
      }
    );
  }

  navigateToEdit(): void {
    this.router.navigate(['/maquinas/update', this.machineId]);
  }

  navigateToList(): void {
    this.router.navigate(['/maquinas/list']);
  }
}