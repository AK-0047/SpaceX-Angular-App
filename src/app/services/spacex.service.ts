import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  public baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.baseUrl);
  }

  getLaunchesByYear(year: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getLaunchById(id: number): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/${id}`);
  }

  getCustomLaunches(queryUrl: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(queryUrl);
  }  
}
