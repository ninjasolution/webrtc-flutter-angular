import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Video } from '../models/Video.model';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(public http: HttpClient) { }

  fileUpload(formData: any) {
    return this.http.post(`${environment.BASE_URL}/api/video/upload`, formData);
  }

  getVideoList(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/video/all`);
  }
}
