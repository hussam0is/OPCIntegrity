import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.scss']
})
export class TestHistoryComponent implements OnInit {
    testId: String; 
    Group: String;
    testTitle: string;
    SuccessRates: string;

    constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(t => {let test_id= t.idTestHis;
      this.http.get('http://localhost:5000/test_history'+ test_id).toPromise().then(s=>console.log(s));})
  
  }
 
}
