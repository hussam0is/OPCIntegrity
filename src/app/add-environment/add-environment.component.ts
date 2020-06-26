<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.scss']
})
export class AddEnvironmentComponent implements OnInit {
  environment_name: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  addEnvironment(){
    console.log(this.environment_name);
    this.http.post('addEnvironment',{
      name:this.environment_name}).toPromise().then(s=>console.log(s));
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.scss']
})
export class AddEnvironmentComponent implements OnInit {
  environment_name: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  addEnvironment(){
    console.log(this.environment_name);
    this.http.post('addEnvironment',{
      name:this.environment_name}).toPromise().then(s=>console.log(s));
  }
}
>>>>>>> f2eaad2e21b76266e6e18347759fa2f9b529458a
