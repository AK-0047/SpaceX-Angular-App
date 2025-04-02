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
    @Output() filterChanged = new EventEmitter<any>();
    @Output() resetFilters = new EventEmitter<void>();

    selectedYear: string = '';
    launchSuccess: string = '';
    landSuccess: string = '';

    years: string[] = [];
    boolOptions: { label: string; value: string }[] = [
      { label: 'Successful', value: 'true' },
      { label: 'Failed', value: 'false' }
    ];
    ngOnInit(): void {
      const currentYear = new Date().getFullYear();
      for (let y = 2006; y <= currentYear; y++) {
        this.years.push(y.toString());
      }
    }

    onFilter(): void {
      this.filterChanged.emit({
        year: this.selectedYear,
        launchSuccess: this.launchSuccess,
        landSuccess: this.landSuccess
      });
    }

    onReset(): void {
      this.selectedYear = '';
      this.launchSuccess = '';
      this.landSuccess = '';
      this.resetFilters.emit();
    }    
}
