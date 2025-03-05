import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule , HighchartsChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  highcharts = Highcharts; // Reference to Highcharts
  chartOptions: Highcharts.Options = { // ✅ Explicitly set the type
    chart: { type: 'pie' }, // ✅ Pie chart
    title: { text: 'Category Wise Expense' },
    series: [{
      type: 'pie', // ✅ Explicitly specify 'pie' as a valid type
      name: 'Values',
      data: [
        { name: 'Personal', y: 78.0 },
        { name: 'ACH', y: 200778.0 },
        { name: 'Petrol', y: 13600.0 },
        { name: 'Bill', y: 234227.36 },
        { name: 'Sride', y: 1968.86 },
        { name: 'Grocery', y: 18049.17 }
      ]
    }] as Highcharts.SeriesOptionsType[] // ✅ Ensure correct typing
  };

}
