import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatementUploadDialogComponent } from '../statement-upload-dialog/statement-upload-dialog.component';
import { TransactionResponse } from '../../../services/models/transaction-response';
import { BankStatementControllerService } from '../../../services/services/bank-statement-controller.service';
import { ChartConfig, ChartData } from '../../modals/chart-data.model';


@Component({
  selector: 'app-home',
  imports: [CommonModule, HighchartsChartModule, StatementUploadDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private bankService: BankStatementControllerService
  ) { }


  allTransactions: TransactionResponse[] = [];
  uploadedTransactionsFile : File | any;
  totalExpenseCategoryWise: { [key: string]: number } = {};
  chartData : ChartData[] = [];
  chartConfig : ChartConfig = {title : '', data : this.chartData, type: ''};

  isDialogOpen: boolean = false;
  isFilterModalVisible: boolean = false;

  highcharts = Highcharts; 
  categoryWisePieChartOptions : Highcharts.Options = {};
  
  ngOnInit(){
    
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  handleFileUpload(file: any) {
    this.uploadedTransactionsFile = file;
    this.bankService.getTransactions({ body: { document: file, fileType: 'TEXT' } })
      .subscribe({
        next: (value) => {
          this.allTransactions = value;
          this.getCategoryWiseTotalExpense(); // Fetch all expenses category wise

        },
        error: (err) => {
          alert(err);
        },
        complete: () => {
          this.isDialogOpen = false;
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
    if (this.uploadedTransactionsFile) {
      this.bankService.getCategoryWiseTotalExpense({body: {document : this.uploadedTransactionsFile}}).subscribe({
        next: (value) => {
          this.totalExpenseCategoryWise = value;
        },
        error: (err) => {
          console.log(err)
        },
        complete : () => {
          console.log('completed loading category wise total expense')
          // Set chartConfigData and drawPie chart
          this.chartData = Object.entries(this.totalExpenseCategoryWise).map(([key, value]) => new ChartData(key, value));
          console.log(this.chartData)
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


  get isChartOptionsEmpty(): boolean {
    return !(JSON.stringify(this.categoryWisePieChartOptions)==='{}');
  }

}


