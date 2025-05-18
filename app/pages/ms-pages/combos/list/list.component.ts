// combos/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Combo } from 'src/app/models/combo.model';
import { CombosService } from 'src/app/services/comboService/combos.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-combo',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComboComponent implements OnInit {

  combos: Combo[] = []; // Array to store combos

  // Inject the CombosService and Router (if needed)
  constructor(private combosService: CombosService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of combos
    this.combosService.list().subscribe(data => {
      this.combos = data; // Assign data to the combos array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Combo model)
  edit(id: number) {
    console.log('Editing Combo ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/combos/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Combo ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.combosService.delete(id).subscribe(() => {
    //   console.log('Combo deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}