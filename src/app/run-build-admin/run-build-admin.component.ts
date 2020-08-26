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
  envList: object;


  
    constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  
  searchTestby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt").val();
    this.http.get('http://localhost:5000//test?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
    var table = document.getElementById("runBuildTable");
    var table_titles = ["test_id", "test_title", "test_case", "category", "test_summary","group"];
    
    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
  });
  
  }
  searchBuildby(){  }//////hussam function for build number
  }

