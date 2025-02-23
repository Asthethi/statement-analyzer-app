import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./pages/home/home.component";
import { StatementUploadDialogComponent } from "./pages/statement-upload-dialog/statement-upload-dialog.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent, CommonModule, HomeComponent, StatementUploadDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDialogOpen : boolean = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  sideNavStatus: boolean = false;

  title = 'statement-analyzer-app';
}
