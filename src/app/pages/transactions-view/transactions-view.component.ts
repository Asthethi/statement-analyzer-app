import { Component, HostListener } from '@angular/core';
import { TransactionResponse } from '../../../services/models/transaction-response';
import { TableViewComponent } from '../../table-view/table-view.component';
import { StatementUploadDialogComponent } from '../statement-upload-dialog/statement-upload-dialog.component';
import { BankStatementControllerService } from '../../../services/services/bank-statement-controller.service';
import { CommonModule } from '@angular/common';
import { StatementControllerService } from '../../../services/services';
import { SpinnerService } from '../../../shared/spinner.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-transactions-view',
  imports: [TableViewComponent, StatementUploadDialogComponent, CommonModule],
  templateUrl: './transactions-view.component.html',
  styleUrl: './transactions-view.component.scss'
})
export class TransactionsViewComponent {

    constructor(private bankService : StatementControllerService,
      private spinner : SpinnerService
    ){}

    allTransactions : TransactionResponse[] = [];
    isDialogOpen : boolean = false;
    isFilterModalVisible : boolean = false;
    allExpenseCategories : string[] = [];

    ngOnInit(){
      this.getAllExpenseCategories();
    }

    getAllExpenseCategories() {
      this.bankService.getAllExpenseCategories({bankName : 'HDFC'}).subscribe({
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

      this.spinner.show();

      this.bankService.getTransactions({bankName : 'HDFC',body:{document : file, fileType : 'TEXT'}})

      .pipe(
            finalize(() => this.spinner.hide())   // 🔹 Automatically hide
          )

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

    onFilteClick(event : Event){
      event.stopPropagation(); // Prevent event from propagating to document click
      this.isFilterModalVisible = !this.isFilterModalVisible;
    }

      @HostListener('document:click',['$event']) onDocumentClick(event: MouseEvent){
        const targetElement = event.target as HTMLElement;
        if(!targetElement.closest('.filter-panel')){
          this.isFilterModalVisible = false;
        }
      }

}
