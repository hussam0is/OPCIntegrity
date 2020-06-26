import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  editUser(){ // ${this.testID} check if work
    this.http.put('editUser/:${this.userId}',{
      id: this.userId,
      first: this.firstName,
      last: this.lastName,
      email: this.email,
      pass: this.password,
      type:  this.userType}).toPromise().then(s=>console.log(s));
  }
  deleteUser(){
    this.http.delete('deleteUser/:${this.userId}').toPromise().then(s=>console.log(s));
  }

}
