import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statement-upload-dialog',
  imports: [CommonModule],
  templateUrl: './statement-upload-dialog.component.html',
  styleUrl: './statement-upload-dialog.component.scss'
})
export class StatementUploadDialogComponent {
  @Input() isOpen = false; // To control dialog visibility
  @Output() close = new EventEmitter<void>(); // Emit event when closed

  closeDialog() {
    this.close.emit(); // Notify parent to close dialog
  }

}
