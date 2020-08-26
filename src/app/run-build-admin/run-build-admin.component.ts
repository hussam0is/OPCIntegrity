import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-run-build-admin',
  templateUrl: './run-build-admin.component.html',
  styleUrls: ['./run-build-admin.component.scss']
})
export class RunBuildAdminComponent implements OnInit {
  groupNmuber:string;
  testId: String; 
  Group: String;
  testTitle: string;
  category: string;
  testCase: string;
  testSummary: string;
  list: object;
  list_len: number;
  search_list: object;
  chunk_id: number;
  displayList: Array<any>=[];
  groupList: object;


  
    constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayList=[];
    this.http.get('http://localhost:5000/test').toPromise().then(rs =>  {this.list = rs; this.list_len = Object.keys(this.list).length;

    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
     }
    }
    )
    var field = $("#select").val();
    this.http.get('http://localhost:5000/test?').toPromise().then(s=> {
      this.groupList = s;
    for(var i=0; i<Object.keys(s).length; i++){
      var select = document.getElementById("select");
      var option = document.createElement('option');
      option.text = option.value = s[i];
      select.appendChild(option);
      (<HTMLInputElement>document.getElementById("group_num")).value  = s[i];
    }
    });
  }

  searchBuildby(){ 
    this.displayList=[]
    var order_by = $("#order_by").val();
    // var term = $("#txt1").val();
    this.http.get('http://localhost:5000//build/89?order_by' + order_by).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
  });
  
   }
  
  searchTestby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt1").val();
    this.http.get('http://localhost:5000//test?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
  });
  
  }
  // addthisRow(test_id_txt){

  // }

  }

