import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { CartItem } from '../_models/cart-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;
  currentCart$: Observable<CartItem[]>;
  countCart = 0;

  constructor(
    public accountService: AccountService, 
    private carService: CartService,
    private router: Router, 
    private toastr: ToastrService
    ) { }
  
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$; 
    this.currentCart$ = this.carService.currentCart$;
    this.carService.currentCart$.subscribe(x => {
      this.countCart = x == null ? null : x.length;
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home')
  }
}