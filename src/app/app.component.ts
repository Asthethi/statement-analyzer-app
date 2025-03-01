import { Component } from '@angular/core';
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
      }
    })

    //console.log(event);
  }

  sideNavStatus: boolean = false;

  title = 'statement-analyzer-app';
}
