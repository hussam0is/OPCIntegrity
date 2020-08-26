import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {updateTest , deleteTest } from '../node/index'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit {
  testID: string;
  category: string;
  group: string;
  testCase: string;
  testTitle: string;
  symbol: string;
  testSummary: string;
  testSteps: string;
  testData:DataView;
  expectedResult: string;
  notes: string;

  constructor(private http: HttpClient, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(t => {let test_id = t.idTest;
    this.http.get('http://localhost:5000/test/'+  test_id).toPromise().then(s=> {
    (<HTMLInputElement>document.getElementById("test_id")).value  = s['test_id'];
    (<HTMLInputElement>document.getElementById("category")).value  = s['category'];
    (<HTMLInputElement>document.getElementById("group")).value  = s['group'];
    (<HTMLInputElement>document.getElementById("testCase")).value  = s['test_case'];
    (<HTMLInputElement>document.getElementById("testTitle")).value  = s['test_title'];
    (<HTMLInputElement>document.getElementById("pic")).value  = s['symbol'];
    (<HTMLInputElement>document.getElementById("testSummary")).value  = s['test_summary'];
    (<HTMLInputElement>document.getElementById("testSteps")).value  = s['test_steps'];
    (<HTMLInputElement>document.getElementById("testData")).value  = s['test_data'];
    (<HTMLInputElement>document.getElementById("expectedResult")).value  = s['expected_result'];
    (<HTMLInputElement>document.getElementById("notes")).value  = s['notes'];
    });})
  }

  editTest(){ 
    let test_id = (<HTMLInputElement>document.getElementById("test_id")).value;
    this.http.put('http://localhost:5000/test/' + test_id ,{
      category:   (<HTMLInputElement>document.getElementById("category")).value,
      group:  (<HTMLInputElement>document.getElementById("group")).value,
      test_case :  (<HTMLInputElement>document.getElementById("testCase")).value,
      test_title:  (<HTMLInputElement>document.getElementById("testTitle")).value,
      symbol:  (<HTMLInputElement>document.getElementById("pic")).value,
      test_summary:  (<HTMLInputElement>document.getElementById("testSummary")).value,
      test_steps:  (<HTMLInputElement>document.getElementById("testSteps")).value,
      test_data:  (<HTMLInputElement>document.getElementById("testData")).value,
      expected_result:  (<HTMLInputElement>document.getElementById("expectedResult")).value,
      notes:  (<HTMLInputElement>document.getElementById("notes")).value,}).toPromise()
      .then(s =>  console.log(s));
  }
  
  deleteTest(){
    let test_id = (<HTMLInputElement>document.getElementById("test_id")).value;
    this.http.delete('http://localhost:5000//test/ '+ test_id).toPromise().then();
  }
}
