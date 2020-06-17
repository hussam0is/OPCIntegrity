import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
  testData: string;
  expectedResult: string;
  notes: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  editTest(){ // ${this.testID} check if work
    this.http.put('editTest/:${this.testID}',{
      category: this.category,
      group: this.group,
      testCase: this.testCase,
      testTitle: this.testTitle,
      symbol: this.symbol,
      testSummary:  this.testSummary,
      testSteps: this.testSteps,
      testData: this.testData,
      expectedResult: this.expectedResult,
      notes: this.notes}).toPromise().then(s=>console.log(s));
  }
  deleteTest(){
    this.http.delete('deleteTest/:${this.testID}').toPromise().then(s=>console.log(s));
  }
}
