import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ArrayType } from '@angular/compiler';
import * as $ from 'jquery/dist/jquery.min.js';

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
  KindsList: object;
  list: object;
  list_len: number;

  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/reports_kind').toPromise().then(s=> {
      this.KindsList = s;
      console.log("res:"+s);
    for(var i=0; i<Object.keys(s).length; i++){
      var select = document.getElementById("select");
      var option = document.createElement('option');
      option.text = option.value = s[i]['kind_name'];
      select.appendChild(option);
      (<HTMLInputElement>document.getElementById("kind_name")).value  = s[i];
    }
  })
  }

  fillReportData(){
    var e = document.getElementById("select") as HTMLSelectElement;;
    var kind_name = e.options[e.selectedIndex].value;
    console.log("here: "+kind_name);

    this.http.get('http://localhost:5000/reports_kind/'+  kind_name).toPromise().then(s=> {
      console.log(s);

      console.log(s['title']);
      console.log(s['send_every_days']);
      (<HTMLInputElement>document.getElementById("title")).value  = s['title'];
      (<HTMLInputElement>document.getElementById("days")).value  = s['send_every_days'];
      });

  }

  searchUserby(){
    var field = $("#SearchUserby").val();
    var term = $("#txt1").val();
    this.http.get('http://localhost:5000/user?field='+ field + '&search_text=' + term).toPromise()
    .then(res =>  {this.list = res; this.list_len = Object.keys(this.list).length;
      for(var i=0; i< this.list_len; i++){
        var select = document.getElementById("users");
        var option = document.createElement('option');
        option.text = option.value = this.list[i]['first_name'] + " " + this.list[i]['last_name'];
        select.appendChild(option);
      }

  });

}


saveReportKind()
{ 
  var e = document.getElementById("select") as HTMLSelectElement;;
  var kind_name = e.options[e.selectedIndex].value; 
  this.http.put('http://localhost:5000/reports_kind/' + kind_name ,{
    title:    (<HTMLInputElement>document.getElementById("title")).value,
    send_every_days:  ((<HTMLInputElement>document.getElementById("days")).value)
  }).toPromise()
    .then(s =>  console.log(s));
}

}
