import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-voluntario-list',
  templateUrl: './voluntario-list.component.html',
  styleUrls: ['./voluntario-list.component.css']
})
export class VoluntarioListComponent implements OnInit {

  Volunteer: any = [];
  p: any;

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadVoluntarios();
  }

  // Get employees list
  loadVoluntarios() {
    return this.restApi.getVoluntarios().subscribe((data: any) => {
      console.log('data : ', data);
      this.Volunteer = data;
    });
  }

  // Delete employee
  deleteVoluntario(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteVoluntario(id).subscribe(data => {
        this.loadVoluntarios();
      });
    }
  }


}
