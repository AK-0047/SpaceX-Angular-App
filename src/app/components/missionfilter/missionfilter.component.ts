import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  @Output() filterByYear = new EventEmitter<string>();

  selectedYear: string = '';
  years: string[] = [];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = 2006; y <= currentYear; y++) {
      this.years.push(y.toString());
    }
  }

  onFilter() {
    if (this.selectedYear) {
      this.filterByYear.emit(this.selectedYear);
    }
  }
}
