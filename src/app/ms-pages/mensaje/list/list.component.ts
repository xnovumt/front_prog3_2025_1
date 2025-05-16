// message/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje.model';
import { MensajeService } from 'src/app/services/mensajeService/mensaje.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-Mensaje',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMensajeComponent implements OnInit {

  mensajes: Mensaje[] = []; // Array to store Mensajes

  // Inject the MensajeService and Router (if needed)
  constructor(private MensajeService: MensajeService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of Mensajes
    this.MensajeService.list().subscribe(data => {
      this.mensajes = data; // Assign data to the Mensajes array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Mensaje model)
  edit(id: number) {
    console.log('Editing Mensaje ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/Mensaje/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Mensaje ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.MensajeService.delete(id).subscribe(() => {
    //   console.log('Message deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}