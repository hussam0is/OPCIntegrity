import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

// const localUrl = 'assets/data/smartphone.json';
@Injectable()
export class ApiService
{
  constructor(private httpclient: HttpClient) { }
  getcomments(): Observable<any>{
      return this.httpclient.get('');
  }

}
