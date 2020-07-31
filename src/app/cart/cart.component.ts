import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ItemInstanceModel } from 'src/models/item-instance.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  items: ItemInstanceModel[];
  cost: number;

  constructor(
    private cartService: CartService
  ) {
    cartService.items.subscribe(items => {
      this.items = items;
      this.cost = this.cartService.getTotalCost();
    });
  }

  ngOnInit(): void {
  }

  onCheckout() {
    this.cartService.checkout();
    alert('To slow, bitch');
  }

}