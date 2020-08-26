import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {
  ReportKind: string;
  group:string;
  status:string;
  build_id:string;
  list: object;
  list_len: number;
  search_list: object;
  chunk_id: number;
  displayList: Array<any>=[{},{},{},{}]

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  searchReportedby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt").val();
    this.http.get('http://localhost:5000//report?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
      var table = document.getElementById("ReportsTable");
     var table_titles = ["build_id", " group", " status",  "kind"];
    
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

    for (var i = 0;  i < 10; i++){
      this.displayList.push(final[0][i]);
    }
    console.log(this.displayList)

  });
  }
  
  getIdInRow(){ }
}
