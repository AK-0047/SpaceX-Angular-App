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

  applyFilter(year: string): void {
    this.loading = true;
    this.spacexService.getLaunchesByYear(year).subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error filtering by year', err);
        this.loading = false;
      }
    });
  }  
}
