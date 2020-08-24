import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {addUserToDB} from '../node/index'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }
  addUser(){
      this.http.post('http://localhost:5000/user',{
      user_id: this.userId,
      first_name: this.firstName,
      last_name: this.lastName,
      email_address: this.email,
      password: this.password,
      user_type:  this.userType}).toPromise().then(s=>console.log(s));
  }
}
