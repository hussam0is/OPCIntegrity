import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userId: String;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  list: object;
  list_len: number;
  search_list: object;
  chunk_id: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  searchUserby(){
    var field = $("#field").val();
    var term = $("#txt1").val();
    this.http.get('http://localhost:5000//user?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; console.log(this.list); console.log(Object.keys(this.list).length); this.list_len = Object.keys(this.list).length;
    var table = document.getElementById("usersTable");
    var table_titles = ["user_id", "first_name", "last_name", "email_address", "password", "user_type"];
    
    //split to chunks of 10
    var values = Object.values(this.list);
    var counter = 0;
    var portion = {};
    var final = [];
    for (var key in this.list) {
      if (counter !== 0 && counter % 10 === 0) {
        final.push(portion);
        portion = {};
      }
      portion[key] = values[counter];
      counter++;
    }
    final.push(portion);
    this.search_list = final;
    this.chunk_id = 0;

    //add first chunk to table
    for (var i = 0; i < this.list_len && i < 10; i++) {
      var d = table.getElementsByTagName("tr")[i+1];
      for (var j = 0; j < 6; j++){
        d.getElementsByTagName("td")[j].innerHTML = this.list[i][(table_titles[j])]; 
     }
    }
  });
  }

  nextChunk(){
    // var table = document.getElementById("usersTable");
    // var table_titles = ["user_id", "first_name", "last_name", "email_address", "password", "user_type"];
    // var chunk = this.chunk_id++;
    // //add next chunk to table
    // for (var i = 0; i < this.list_len && i < 10; i++) {
    //   var d = table.getElementsByTagName("tr")[i+1];
    //   for (var j = 0; j < 6; j++){
    //      d.getElementsByTagName("td")[j].innerHTML = this.list[i][(table_titles[j])]; 
    //   }
    // }
  }
}
