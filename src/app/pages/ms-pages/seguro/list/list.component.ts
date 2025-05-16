// insurance/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Seguro } from 'src/app/models/seguro.model';
import { SeguroService } from 'src/app/services/seguroService/seguro.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-Seguro',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSeguroComponent implements OnInit {

  seguros: Seguro[] = []; // Array to store Seguros

  // Inject the SeguroService and Router (if needed)
  constructor(private SeguroService: SeguroService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of Seguros
    this.SeguroService.list().subscribe(data => {
      this.seguros = data; // Assign data to the Seguros array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Seguro model)
  edit(id: number) {
    console.log('Editing Seguro ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/Seguro/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Seguro ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.insuranceService.delete(id).subscribe(() => {
    //   console.log('Insurance deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}