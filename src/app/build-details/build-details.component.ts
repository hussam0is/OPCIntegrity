import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {deleteUser , updateUser } from '../node/index'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit {
  build_id : string;
    build_name : string;
    group : string;
    jenkins_job_number : string;
    status : string;
    result :string;
    running_environment : string;
    start_time : string;
    run_duration :string;
    reporters_ids : string;
    zoho_issue_link : string;
    build_tests : string;
    date: string;

    constructor(private http: HttpClient, private route:ActivatedRoute) { }


  ngOnInit(): void {
        this.route.params.subscribe(t => {let build_id = t.id;
        this.http.get('http://localhost:5000/build/'+ build_id+'?order_by=test_id').toPromise().then(s=> {
        console.log("ss:" + s);
        (<HTMLInputElement>document.getElementById("build_id")).value  = s['build_id'];
        (<HTMLInputElement>document.getElementById("jenkinsJN")).value  = s['jenkins_job_number'];
        (<HTMLInputElement>document.getElementById("status")).value  = s['status'];
        (<HTMLInputElement>document.getElementById("result")).value  = s['result'];
        (<HTMLInputElement>document.getElementById("environment")).value  = s['running_environment'];
        (<HTMLInputElement>document.getElementById("group")).value  = s['group'];
        (<HTMLInputElement>document.getElementById("date")).value  = s['start_time'];
        (<HTMLInputElement>document.getElementById("start_time")).value  = s['start_time'];
        (<HTMLInputElement>document.getElementById("run_duration")).value  = s['run_duration'];
        (<HTMLInputElement>document.getElementById("reported_to")).value  = s['reporters_ids'];
        (<HTMLInputElement>document.getElementById("zoho")).value  = s['zoho_issue_link'];
        });})
  }

}
