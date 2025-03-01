import { Component, HostListener } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./pages/home/home.component";
import { StatementUploadDialogComponent } from "./pages/statement-upload-dialog/statement-upload-dialog.component";
import { BankStatementPdfControllerService } from '../services/services';
import { TransactionResponse } from '../services/models/transaction-response';
import { TableViewComponent } from "./table-view/table-view.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent, CommonModule, HomeComponent, StatementUploadDialogComponent, TableViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private bankService : BankStatementPdfControllerService){}

  isDialogOpen : boolean = false;

  allTransactions : TransactionResponse[] = [];
  
  allExpenseCategories : string[] = [];

  sideNavStatus: boolean = false;

  isFilterModalVisible : boolean = false;

  title = 'statement-analyzer-app';

  ngOnInit(){
    this.getAllExpenseCategories();
  }

  getAllExpenseCategories() {
    this.bankService.getAllExpenseCategories().subscribe({
      next : (value) => {
        this.allExpenseCategories = value;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  handleFileUpload(file : any) {

    this.bankService.getAllPdfText({body:{document : file, fileType : 'TEXT'}})
    .subscribe({
      next : (value) => {
        this.allTransactions = value;
      },
      error : (err) => {
        console.log(err)
      },
      complete :() => {
        this.isDialogOpen = false;
      }
    })

  }

  @HostListener('document:click',['$event']) onDocumentClick(event: MouseEvent){
    const targetElement = event.target as HTMLElement;
    if(!targetElement.closest('.filter-panel')){
      this.isFilterModalVisible = false;
    }
  }

  onFilteClick(event : Event){
    event.stopPropagation(); // Prevent event from propagating to document click
    this.isFilterModalVisible = !this.isFilterModalVisible;
  }
}
