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
  addUser(){
    this.http.post('http://localhost:5000/test',{
      category:   (<HTMLInputElement>document.getElementById("category")).value,
      group:  (<HTMLInputElement>document.getElementById("group")).value,
      test_case:  (<HTMLInputElement>document.getElementById("testCase")).value,
      test_title:  (<HTMLInputElement>document.getElementById("testTitle")).value,
      symbol:  (<HTMLInputElement>document.getElementById("symbol")).value,
      test_summary:  (<HTMLInputElement>document.getElementById("testSummary")).value,
      test_steps:  (<HTMLInputElement>document.getElementById("testSteps")).value,
      test_data:  (<HTMLInputElement>document.getElementById("testData")).value,
      expected_result:  (<HTMLInputElement>document.getElementById("expectedResult")).value,
      notes:  (<HTMLInputElement>document.getElementById("notes")).value,}).toPromise()
      .then(s =>  console.log(s));
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
