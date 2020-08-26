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
    this.route.params.subscribe(t => {let report_id = t.id;
      this.http.get('http://localhost:5000/report/'+ report_id).toPromise().then(s=> {
        console.log(s);
      (<HTMLInputElement>document.getElementById("report_id")).value = s['report_id'];
      (<HTMLInputElement>document.getElementById("kind")).value = s['kind'];
      (<HTMLInputElement>document.getElementById("title")).value = s['title'];
      (<HTMLInputElement>document.getElementById("date")).value = s['date'];
      (<HTMLInputElement>document.getElementById("content")).value = s['content'];
      //convert id's to names
      //    Object.keys(this.list).length
      console.log("repo_ids:" + s['reporters_ids']);

      for(var i=0; i< Object.keys(s['reporters_ids']).length; i++){
        var select = document.getElementById("users");
        var option = document.createElement('option');
        option.text = option.value = s['reporters_ids'][i];
        select.appendChild(option);
        console.log("s['reporters_ids'][i]");
        // (<HTMLInputElement>document.getElementById("user_name")).value  = s['reporters_ids'][i];
        // (<HTMLInputElement>document.getElementById("users")).value = s['reporters_ids'][i];
      }
      


      });})
}
}