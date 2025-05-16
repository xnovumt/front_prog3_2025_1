// construction/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Obra } from 'src/app/models/obra.model';
import { ObraService } from 'src/app/services/obraService/obra.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-obra',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListObraComponent implements OnInit {

  obras: Obra[] = []; // Array to store Obras

  // Inject the ObraService and Router (if needed)
  constructor(private ObraService: ObraService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of Obras
    this.ObraService.list().subscribe(data => {
      this.obras = data; // Assign data to the Obras array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Obra model)
  edit(id: number) {
    console.log('Editing Obra ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/Obra/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Obra ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.ObraService.delete(id).subscribe(() => {
    //   console.log('Construction deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}