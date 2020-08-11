import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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

    constructor(private http: HttpClient) { }


  ngOnInit(): void {
  }

}
