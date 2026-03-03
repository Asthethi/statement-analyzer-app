import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import DrilldownModule from 'highcharts/modules/drilldown';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatementUploadDialogComponent } from '../statement-upload-dialog/statement-upload-dialog.component';
import { TransactionResponse } from '../../../services/models/transaction-response';
import { ChartConfig, ChartData } from '../../modals/chart-data.model';
import { StatementControllerService } from '../../../services/services';
import { SpinnerService } from '../../../shared/spinner.service';
import { finalize, delay } from 'rxjs';


// ✅ Ensure Drilldown module is loaded
if (typeof DrilldownModule === 'function') {
  DrilldownModule(Highcharts);
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, HighchartsChartModule, StatementUploadDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private bankService: StatementControllerService,
    private spinner: SpinnerService
  ) { }


  allTransactions: TransactionResponse[] = [];
  uploadedTransactionsFile: File | any;
  totalExpenseCategoryWise: { [key: string]: number } = {};
  monthwiseExpenseReport = {};

  chartData: ChartData[] = [];
  chartConfig: ChartConfig = { title: '', data: this.chartData, type: '' };

  isDialogOpen: boolean = false;
  isFileUploaded : boolean = false;
  isFilterModalVisible: boolean = false;

  highcharts = Highcharts;
  categoryWisePieChartOptions: Highcharts.Options = {};
  monthWiseBarChartOptions: Highcharts.Options = {};

  ngOnInit() {
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  handleFileUpload(file: any) {

    this.spinner.show();   // 🔹 display the spinner

    this.uploadedTransactionsFile = file;
    const fileType = this.getFileType(this.uploadedTransactionsFile.type);
    console.log(fileType);
    this.bankService.getTransactions({bankName : 'HDFC', body: { document: file, fileType:  fileType} })
    .pipe(
      finalize(() => this.spinner.hide())   // 🔹 Automatically hide
    )
      .subscribe({
        next: (value) => {
          this.allTransactions = value;
          this.getCategoryWiseTotalExpense(); // Fetch all expenses category wise
          this.getMonthWiseExpenseReport();

          this.isFileUploaded = true;

        },
        error: (err) => {
          alert(err);
        },
        complete: () => {
          this.isDialogOpen = false;
        }
      })

  }
  getFileType(type: any) {
    if(type === "text/plain") {
      return 'TEXT';
    } else {
      return 'PDF';
    }
  }

  getMonthWiseExpenseReport() {

    this.spinner.show();

    this.bankService.getMonthWiseExpenseReport({bankName : 'HDFC', body: { document: this.uploadedTransactionsFile } })
    
    .pipe(
      finalize(() => this.spinner.hide())   // 🔹 Automatically hide
    )

    .subscribe({
      next: (value) => {
        this.monthwiseExpenseReport = value;
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {
        // Set chartConfigData and drawPie chart
        this.chartData = [];

        Object.entries(this.monthwiseExpenseReport).forEach(([month, data]) => {
          const monthData = data as { expense: number; details: { name: string; y: number }[] };

          // 🔹 Add main category data with drilldown ID
          this.chartData.push(new ChartData(month, monthData.expense, month));

        });

        const drilldownData: { id: string; data: [string, number][] }[] = [];

        Object.entries(this.monthwiseExpenseReport).forEach(([month, data]) => {
          const monthData = data as {
            expense: number;
            details: Record<string, number>; // ✅ More readable type
          };

          drilldownData.push({
            id: month,
            data: Object.entries(monthData.details) as [string, number][]
          });
        });

        // ✅ Correctly map drilldownData to Highcharts.SeriesOptionsType
        const highchartsDrilldownSeries: Highcharts.SeriesOptionsType[] = drilldownData.map(item => ({
          id: item.id, // ✅ Matches drilldown ID in main series
          data: item.data
        }) as Highcharts.SeriesOptionsType);

        this.chartConfig.data = this.chartData;
        this.chartConfig.title = 'Month Wise Expense Report';
        this.chartConfig.type = 'column';
        this.drawBarChart(this.chartConfig, highchartsDrilldownSeries);

      }
    })
  }

  onFilteClick(event: Event) {
    event.stopPropagation(); // Prevent event from propagating to document click
    this.isFilterModalVisible = !this.isFilterModalVisible;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.filter-panel')) {
      this.isFilterModalVisible = false;
    }
  }

  /*Below Api fetchces all the expenses categories wise*/
  private getCategoryWiseTotalExpense() {

    this.spinner.show();

    if (this.uploadedTransactionsFile) {
      this.bankService.getCategoryWiseTotalExpense({bankName : 'HDFC', body: { document: this.uploadedTransactionsFile } })
      
      .pipe(
        finalize(() => this.spinner.hide())   // 🔹 Automatically hide
      )

      .subscribe({
        next: (value) => {
          this.totalExpenseCategoryWise = value;
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          // Set chartConfigData and drawPie chart
          this.chartData = [];
          this.chartData = Object.entries(this.totalExpenseCategoryWise).map(([key, value]) => new ChartData(key, value));
          this.chartConfig.data = this.chartData;
          this.chartConfig.title = 'Category Wise Expense';
          this.chartConfig.type = 'pie';
          this.drawPiChart(this.chartConfig);


        }
      })
    } else {
      alert('No Transaction Data found!!');
    }

  }


  drawPiChart(chartConfig: ChartConfig) {
    this.categoryWisePieChartOptions = {
      chart: { type: chartConfig.type }, // ✅ Pie chart
      title: { text: chartConfig.title },
      series: [{
        type: chartConfig.type, // ✅ Explicitly specify 'pie' as a valid type
        name: 'Values',
        data: chartConfig.data
      }] as Highcharts.SeriesOptionsType[] // ✅ Ensure correct typing
    }

  }

  drawBarChart(chartConfig: ChartConfig, drilldownData: Highcharts.SeriesOptionsType[]) {
    console.log(chartConfig.data)
    this.monthWiseBarChartOptions = {
      chart: { type: chartConfig.type }, // ✅ Pie chart
      title: { text: chartConfig.title },
      xAxis: { type: 'category' }, // ✅ Categories on X-axis
      yAxis: { title: { text: 'Amount Spent in (₹)' } },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '₹{point.y:.2f}'
          }
        }
      },
      series: [{
        type: chartConfig.type, // ✅ Explicitly specify 'pie' as a valid type
        name: 'Expenses',
        data: chartConfig.data.map((item: any) => ({
          name: item.name, // ✅ Adjust this based on actual structure
          y: item.y,      // ✅ Ensure this matches the field name for value
          drilldown: item.drilldown // ✅ Must match drilldown series ID
        }))

      }] as Highcharts.SeriesOptionsType[], // ✅ Ensure correct typing
      drilldown: {
        series: drilldownData
      }
    }

  }


  get isPieChartOptionsEmpty(): boolean {
    return !(JSON.stringify(this.categoryWisePieChartOptions) === '{}');
  }

  get isBarOptionsEmpty(): boolean {
    return !(JSON.stringify(this.monthwiseExpenseReport) === '{}');
  }

}


