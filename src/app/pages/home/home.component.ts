import { Component } from '@angular/core';
import { TableViewComponent } from "../../table-view/table-view.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TableViewComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isTableDataPresent : boolean = false;

  ngOnInit(){

  }

}
