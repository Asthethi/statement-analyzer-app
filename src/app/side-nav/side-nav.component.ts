import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


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

  constructor(private router: Router) {}

  @Input() sideNavStatus: boolean = false;

  menuItems = [
    { name: 'Home', icon: 'fa-solid fa-house', route: '/home' },
    { name: 'Explore Transactions', icon: 'fa-solid fa-money-bill-transfer', route: '/transactions' },
    { name: 'Contact', icon: 'fa-solid fa-phone', route: '/contact' },
    { name: 'About', icon: 'fa-solid fa-circle-info', route: '/about' }
  ];

  navigateToPage(pageName: string) {
    const menuItem = this.menuItems.find(item => item.name === pageName);
    if (menuItem && menuItem.route) {
      this.router.navigate([menuItem.route]); // Navigate to the correct route
    }
  }




}
