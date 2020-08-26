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
          first_name:   (<HTMLInputElement>document.getElementById("firstName")).value,
          last_name:  (<HTMLInputElement>document.getElementById("lastName")).value,
          email_address:  (<HTMLInputElement>document.getElementById("email")).value,
          password:  (<HTMLInputElement>document.getElementById("password")).value,
          user_type:  (<HTMLInputElement>document.getElementById("userType")).value}).toPromise()
          .then(s =>  console.log(s));
  }
}
