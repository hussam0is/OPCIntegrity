import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {deleteUser , updateUser } from '../node/index'
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';


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
  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(t => {let user_id = t.id;
    this.http.get('http://localhost:5000/user/'+ user_id).toPromise().then(s=> {
    (<HTMLInputElement>document.getElementById("us_id")).value  = s['user_id'];
    (<HTMLInputElement>document.getElementById("firstName")).value  = s['first_name'];
    (<HTMLInputElement>document.getElementById("lastName")).value  = s['last_name'];
    (<HTMLInputElement>document.getElementById("email")).value  = s['email_address'];
    (<HTMLInputElement>document.getElementById("password")).value  = s['password'];
    (<HTMLInputElement>document.getElementById("userType")).value  = s['user_type'];
    });})
  }


  editUser(){ 
    let user_id = (<HTMLInputElement>document.getElementById("us_id")).value;
    this.http.put('http://localhost:5000/user/' + user_id ,{
      first_name:   (<HTMLInputElement>document.getElementById("firstName")).value,
      last_name:  (<HTMLInputElement>document.getElementById("lastName")).value,
      email_address:  (<HTMLInputElement>document.getElementById("email")).value,
      password:  (<HTMLInputElement>document.getElementById("password")).value,
      user_type:  (<HTMLInputElement>document.getElementById("userType")).value}).toPromise()
      .then();
  }

  deleteUser(){
    let user_id = (<HTMLInputElement>document.getElementById("us_id")).value;
    this.http.delete('http://localhost:5000//user/'+ user_id).toPromise().then();
  }
}
