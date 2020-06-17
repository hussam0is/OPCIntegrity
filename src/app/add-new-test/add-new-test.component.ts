import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    this.http.post('addTest',{
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

}
