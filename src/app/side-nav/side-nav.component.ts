import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-nav',
  imports: [
    NgForOf,
    CommonModule  
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  @Input() sideNavStatus: boolean = false;

  menuItems = [{
    name: 'Home',
    icon: 'fa-solid fa-house'
  },
    {
      name: 'About',
      icon: 'fa-solid fa-circle-info'
    },
    {
      name: 'Contact',
      icon: 'fa-solid fa-phone'
    }]

}
