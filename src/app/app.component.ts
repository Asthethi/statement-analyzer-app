import { Component, Input } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  sideNavStatus: boolean = false;

  title = 'statement-analyzer-app';
}
