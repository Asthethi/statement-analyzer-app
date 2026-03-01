import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-view',
  imports: [CommonModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {

  @Input() tableData : any[] = [];
  columns: string[] = [];

  get displayedColumns(): string[] {
    return this.columns.length > 0 ? this.columns : (this.tableData.length ? Object.keys(this.tableData[0]) : []);
  }
}
