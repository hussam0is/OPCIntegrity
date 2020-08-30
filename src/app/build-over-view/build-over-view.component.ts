import {Component, OnInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as $ from 'jquery/dist/jquery.min.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
//import {runBuild} from '../../../jenkinsServer/jobTriggers'
//var Jh: any = require('../../../jenkinsServer/JenkinsHandling');
//var jobTriggers: any = require('../../../jenkinsServer/jobTriggers');

@Component({
    selector: 'app-build-over-view',
    templateUrl: './build-over-view.component.html',
    styleUrls: ['./build-over-view.component.scss']
})
export class BuildOverViewComponent implements OnInit {
    groupNum: number
    environmentName: string

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    runBuild() {
        this.http.post('/api/runBuild', {
            "envName": (<HTMLInputElement>document.getElementById("Report1")).value,
            "groupNum": (<HTMLInputElement>document.getElementById("groupNumber")).value
        }, {responseType: 'text'}).toPromise()
            .then(s => console.log(s)).then(()=> console.log((<HTMLInputElement>document.getElementById("groupNumber")).value));

        // ADD BUILD DATA TO THE DATABASE

    }
}
