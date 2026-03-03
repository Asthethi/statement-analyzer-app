import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { SpinnerService } from '../shared/spinner.service';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public spinner: SpinnerService) {}

  sideNavStatus: boolean = false;

  title = 'statement-analyzer-app';

  ngOnInit() {
  }


}
