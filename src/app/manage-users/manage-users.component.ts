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
  displayList: Array<any>=[];
  envList: object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayList=[];
    this.http.get('http://localhost:5000/user').toPromise().then(rs =>  {this.list = rs; this.list_len = Object.keys(this.list).length;
    // console.log(rs);
    // var table = document.getElementById("usersTable");
    // var table_titles = ["user_id", "first_name", "last_name", "email_address", "password", "user_type"];
   
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

  searchUserby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt1").val();
    this.http.get('http://localhost:5000//user?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;

    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
  });
  }
}
