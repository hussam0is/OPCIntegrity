import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {addTestToDB} from '../node/index'

@Component({
  selector: 'app-add-new-test',
  templateUrl: './add-new-test.component.html',
  styleUrls: ['./add-new-test.component.scss']
})
export class AddNewTestComponent implements OnInit {
  category: string;
  group: string;
  testCase: string;
  testTitle: string;
  symbol: string;
  testSummary: string;
  testSteps: string;
  testData: string;
  expectedResult: string;
  notes: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addTest(){
    this.http.post('http://localhost:5000/test',{
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

}
