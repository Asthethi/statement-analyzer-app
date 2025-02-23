import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'statement-analyzer-app';
}
