import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-statement-upload-dialog',
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './statement-upload-dialog.component.html',
  styleUrl: './statement-upload-dialog.component.scss'
})
export class StatementUploadDialogComponent {
  @Input() isOpen = false; // To control dialog visibility
  @Output() close = new EventEmitter<void>(); // Emit event when closed
  @Output() statementFileUploadEvent = new EventEmitter<File>();

  inputFile? : File | any;

  @Output() isSaveBankStatementToDbEnabled = new EventEmitter<boolean>();
  saveStatementToDb : boolean = false;

  onFileSaveToggle() {
    this.isSaveBankStatementToDbEnabled.emit(this.saveStatementToDb);
  }

  resetFileSaveToggle() {
    this.saveStatementToDb = false;
  }

  closeDialog() {
    this.close.emit(); // Notify parent to close dialog
  }

  uploadStatementFile(){
    this.statementFileUploadEvent.emit(this.inputFile);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];

      // if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      //   alert('Only .txt files are allowed!');
      //   input.value = ''; // Clear the input
      //   return;
      // }else{
      //   this.inputFile = file;
      // }
      this.inputFile = file;
    }
  }

}
