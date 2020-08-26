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
    this.route.params.subscribe(t => {let build_id = t.idBuild;
      this.http.get('http://localhost:5000/build/'+ build_id).toPromise().then(s=>console.log(s));})
  }

}
