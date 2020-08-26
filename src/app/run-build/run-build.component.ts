import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-run-build',
  templateUrl: './run-build.component.html',
  styleUrls: ['./run-build.component.scss']
})
export class RunBuildComponent implements OnInit {
  

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
  
  
    
      constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
    }
    searchBuildby(){  }
    searchTestby(){
      var field = $("#field").val();
      var term = $("#txt").val();
      this.http.get('http://localhost:5000//test?field='+ field + '&search_text=' + term).toPromise()
      .then(res =>  {this.list = res; console.log(this.list); console.log(Object.keys(this.list).length); this.list_len = Object.keys(this.list).length;
      var table = document.getElementById("runBuildTable");
      var table_titles = ["test_id", "test_title", "test_case", "category", "test_summary","group"];
      
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
}
