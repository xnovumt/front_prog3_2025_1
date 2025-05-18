// gps/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { GPS } from 'src/app/models/gps.model';
import { GPSService } from 'src/app/services/gpsService/gps.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-gps',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGpsComponent implements OnInit {

  gpsPoints: GPS[] = []; // Array to store GPS points

  constructor(private gpsService: GPSService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of GPS points
    this.gpsService.list().subscribe(data => {
      this.gpsPoints = data; // Assign data to the gpsPoints array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Gps model)
  edit(id: number) {
    console.log('Editing GPS Point ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/gps/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting GPS Point ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.gpsService.delete(id).subscribe(() => {
    //   console.log('GPS Point deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}