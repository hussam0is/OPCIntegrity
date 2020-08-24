import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.scss']
})
export class ManageReportsComponent implements OnInit {
  kindId: string;
  ReportTitle: string;
  reportKind: string;
  DefaultReporters:string;
  ReportTimer:number;
  



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/reports_kind/kind_id').toPromise().then(res =>console.log(res) )
  }
  saveReport(){

    // this.http.get('http://localhost:5000/reports_kind ${this.').toPromise();
    this.http.put('http://localhost:5000/reports_kind/kind_id',{
      title:this.ReportTitle,
      kind_name: this.reportKind,
      default_reporters: this.DefaultReporters,
      send_every_days: this.ReportTimer}).toPromise().then(s=>console.log(s));
  }

}
