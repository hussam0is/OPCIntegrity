import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ArrayType } from '@angular/compiler';

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
  ReportersNames: Array<string>=[];
  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(t => {let report_id = t.id;
      this.http.get('http://localhost:5000/report/'+ report_id).toPromise().then(s=> {
        console.log(s);
      (<HTMLInputElement>document.getElementById("report_id")).value = s['report_id'];
      (<HTMLInputElement>document.getElementById("kind")).value = s['kind'];
      (<HTMLInputElement>document.getElementById("title")).value = s['title'];
      (<HTMLInputElement>document.getElementById("date")).value = s['date'];
      (<HTMLInputElement>document.getElementById("content")).value = s['content'];
      
      //convert reporter's id's to names
      console.log("repo_ids:" + s['reporters_ids']);
      for(var i=0; i< Object.keys(s['reporters_ids']).length; i++){
        console.log("repo_id:" + s['reporters_ids'][i]);
        this.http.get('http://localhost:5000/user/'+ s['reporters_ids'][i]).toPromise().then(r=> {
          var full_name = String(r['first_name'] + " " + r['last_name']);
          console.log("full: "+full_name);
          this.ReportersNames.push(full_name);
        })
      }
      console.log("ReportersNames:"+  this.ReportersNames.values());

      // add reporter's names to ui
      for(var i=0; i< Object.keys(s['reporters_ids']).length; i++){
        var select = document.getElementById("users");
        var option = document.createElement('option');
        option.text = option.value = this.ReportersNames[i];
        select.appendChild(option);
      }
      


      });})
}
}