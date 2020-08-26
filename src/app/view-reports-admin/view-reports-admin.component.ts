import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view-reports-admin',
  templateUrl: './view-reports-admin.component.html',
  styleUrls: ['./view-reports-admin.component.scss']
})
export class ViewReportsAdminComponent implements OnInit {
  list: object;
  list_len: number;
  displayList: Array<any>=[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayList=[];
    this.http.get('http://localhost:5000/report').toPromise()
    .then(rs =>  {this.list = rs; this.list_len = Object.keys(this.list).length;
    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
     }
    }
    )
  }

  searchReportby(){
    this.displayList=[]
    var field = $("#field").val();
    var term = $("#txt1").val();
    console.log("f:" + field);
    console.log("t:" + term);
    this.http.get('http://localhost:5000//report?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;

    for (var i = 0;  i < this.list_len; i++){
      this.displayList.push(this.list[i]);
    }
    console.log(this.displayList)

  });

}
}
