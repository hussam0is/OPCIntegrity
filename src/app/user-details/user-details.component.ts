import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {deleteUser , updateUser } from '../node/index'

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
    let user_id = this.userId;
    this.http.get('http://localhost:5000/user'+ user_id).toPromise().then(s=>console.log(s));


  }
  editUser(){ 

    this.http.put('http://localhost:5000/user/user_id',{
      user_id: this.userId,
      first_name: this.firstName,
      last_name: this.lastName,
      email_address: this.email,
      password: this.password,
      user_type:  this.userType}).toPromise().then(s=>console.log(s));
  }
  deleteUser(){
    let user_id = this.userId;
    this.http.delete('http://localhost:5000//user'+ user_id).toPromise().then(s=>console.log(s));
  }

}
