import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  ReportId: string;
  ReportKind: string;
  ReportTitle:string;
  ReportTo: string;
  ReportDate: string;
  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(t => {let report_id = t.idReport;
      this.http.get('http://localhost:5000/reports/' + report_id).toPromise().then(s=>console.log(s));})
    // let report_id = this.ReportId
    // this.http.get('http://localhost:5000/reports/' + report_id).toPromise().then(s =>console.log(s) )
  

}
}