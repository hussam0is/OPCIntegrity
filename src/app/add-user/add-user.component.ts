import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    const response = this.http.post('http://localhost:3000/addUser',{
      id: this.userId,
      first: this.firstName,
      last: this.lastName,
      email: this.email,
      pass: this.password,
      type:  this.userType},{ responseType: 'text'}).toPromise().then(s=>console.log(s));
  }
}
