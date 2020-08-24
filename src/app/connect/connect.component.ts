import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  email: string;
  password: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  logIn(){
  //   if ( this.email === (this.http.get('http://localhost:5000/user' + this.email))  && this.password == (this.http.get('http://localhost:5000/user' + this.password))
  // }
}
}
