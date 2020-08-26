import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.scss']
})
export class AllTestsComponent implements OnInit {
  testId: String; 
  Group: String;
  testTitle: string;
  SuccessRates: string;
  category: string;
  testCase: string;
  testSummary: string;
  expectedResult: string;
  notes: string;
  list: object;
  list_len: number;
  search_list: object;
  chunk_id: number;
  displayList: Array<any>=[];


  
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.displayList=[];
      this.http.get('http://localhost:5000/test').toPromise().then(rs =>  {this.list = rs; this.list_len = Object.keys(this.list).length;
      console.log(rs);
      // var table = document.getElementById("allTestTable");
      // var table_titles = ["test_id", "test_case", "test_title", "category", "test_summary", "test_rates","group","notes"];
     
      for (var i = 0;  i < this.list_len; i++){
        this.displayList.push(this.list[i]);
      }
    }
  )
  }

searchTestby(){
  this.displayList=[]
  var field = $("#field").val();
  var term = $("#txt1").val();
  this.http.get('http://localhost:5000/test?field='+ field + '&search_text=' + term).toPromise()
  .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
  // var table = document.getElementById("allTestTable");
  // var table_titles = ["test_id", "test_case", "test_title", "category", "test_summary", "test_rates","group","notes"];
  
  for (var i = 0;  i < this.list_len; i++){
    this.displayList.push(this.list[i]);
  }
});
}
}


  