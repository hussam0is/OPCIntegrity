import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  email: string;
  password: string;
  require: any;

  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  logIn(){
    
    document.getElementById('g').innerHTML = '<input  type="submit" routerLink="/homeAdmin" name="go" id="go" value="Log in" (click)="logIn()" >'

    this.http.post('http://localhost:5000/connect',{
      email_address:   (<HTMLInputElement>document.getElementById("email")).value,
      password:  (<HTMLInputElement>document.getElementById("password")).value}).toPromise()
      .then(s =>  {console.log(s);
        //user exists
      if(s['error'] == 'false'){
          //check if admin or user
          if(s['data']['user_type'] == 'admin'){
            //rout to home admin
            // var router = require('routes-js').create();
            // router.redirect('/homeAdmin');
            document.getElementById('log-in').innerHTML = '<input  type="submit" routerLink="/homeAdmin" name="go" id="go" value="Log in" (click)="logIn()" >'
            
          }
          else{
            //rout to home
          }
      }
      if (s['error'] == 'true'){
        alert("Invalid username or password");
      }
   });
 }
}
