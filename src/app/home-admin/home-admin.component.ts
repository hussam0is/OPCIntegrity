import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  build_id:string;
  group:string;
  status:string;
  result:string;
  date:string;
  start_time:string;
  list: object;
  list_len: number;
  displayList: Array<any>=[];
  envList: object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayList=[];
    this.http.get('http://localhost:5000/build').toPromise()
    .then(rs =>  {this.list = rs; this.list_len = Object.keys(this.list).length;
    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
     }
    }
    )
  this.http.get('http://localhost:5000/environment').toPromise().then(s=> {
    this.envList = s;
  for(var i=0; i<Object.keys(s).length; i++){
    var select = document.getElementById("select");
    var option = document.createElement('option');
    option.text = option.value = s[i];
    select.appendChild(option);
    (<HTMLInputElement>document.getElementById("env_name")).value  = s[i];
  }
  });
  }
  searchBuildby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt1").val();
    console.log("f:" + field);
    console.log("t:" + term);
    this.http.get('http://localhost:5000//build?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;

    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
  });

}}
