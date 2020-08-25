import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {updateTest , deleteTest } from '../node/index'
import { ActionSequence } from 'protractor';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    let test_id = this. testID;
    this.http.get('http://localhost:5000/test'+ test_id).toPromise()
  }

  editTest(){ 
    this.http.put('http://localhost:5000/test/test_id',{
      category: this.category,
      group: this.group,
      test_case: this.testCase,
      test_title: this.testTitle,
      symbol: this.symbol,
      test_summary:  this.testSummary,
      test_steps: this.testSteps,
      test_data: this.testData,
      expected_result: this.expectedResult,
      notes: this.notes}).toPromise().then(s=>console.log(s));
  }
  deleteTest(){
    this.http.delete('http://localhost:5000/test/test_id '+ this. testID).toPromise().then(s=>console.log(s));
  }
}
