import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userId: String;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  searchUserby(term:string){
 this.http.get('http://localhost:5000//user' +  term).toPromise()
 .then(res => {this.userId, this.firstName , this.lastName, this.email, this.password})
}
}