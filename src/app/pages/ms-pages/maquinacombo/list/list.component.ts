// combomachinery/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { MaquinaCombo } from 'src/app/models/maquina-combo.model';
import { MaquinaComboService } from 'src/app/services/maquinaComboService/maquina-combo.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-combo-machinery',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMaquinaComboComponent implements OnInit {

  maquinacombos: MaquinaCombo[] = []; // Array to store combo-machinery links

  // Inject the MaquinaComboService and Router (if needed)
  constructor(private MaquinaComboService: MaquinaComboService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.MaquinaComboService.list().subscribe(data => {
      this.maquinacombos = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your MaquinaCombo model)
  edit(id: number) {
    console.log('Editing Combo-Machinery Link ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/MaquinaCombo/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Combo-Machinery Link ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.MaquinaComboService.delete(id).subscribe(() => {
    //   console.log('Combo-Machinery Link deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}