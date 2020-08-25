
import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {addEnvironmentToDB} from '../node/index'
import { from } from 'rxjs';


@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.scss']
})
export class AddEnvironmentComponent {
  environment_name: string;
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
   }
  addEnvironment(){
    this.http.post('http://localhost:5000/environment',{
      environment_name:this.environment_name}).toPromise().then(s=>console.log(s));
  }

  
  
}
