import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, RouterModule, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];
  loading = true;

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching launches', err);
        this.loading = false;
      }
    });
  }

  applyAdvancedFilter(filter: { year: string; launchSuccess: string; landSuccess: string }) {
    this.loading = true;
    let queryParams: string[] = [];
  
    if (filter.year) queryParams.push(`launch_year=${filter.year}`);
    if (filter.launchSuccess) queryParams.push(`launch_success=${filter.launchSuccess}`);
    if (filter.landSuccess) queryParams.push(`land_success=${filter.landSuccess}`);
  
    const query = [
      filter.launchSuccess ? `launch_success=${filter.launchSuccess}` : '',
      filter.landSuccess ? `land_success=${filter.landSuccess}` : '',
      filter.year ? `launch_year=${filter.year}` : ''
    ]
      .filter(q => q)
      .join('&');
    
    const url = `${this.spacexService.baseUrl}?${query}`;
    console.log('API URL:', url);

    this.spacexService.getCustomLaunches(url).subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error filtering launches:', err);
        this.launches = [];
        this.loading = false;
      }
    });    
  }
  
  resetAllFilters(): void {
    this.loading = true;
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching all launches:', err);
        this.launches = [];
        this.loading = false;
      }
    });
  }  
}
