import { Component } from '@angular/core';
import {ApiService} from './api.service';
import {Comments} from './classes/comments';

@Component({
  selector: 'app-root',
  template: `
<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _apiService: ApiService){
  }

  listcomments:Comments[];

  ngOnInit() {
    this._apiService.getcomments().subscribe(
      data =>
      {
        this.listcomments = data;
      }
    )

  }

}
