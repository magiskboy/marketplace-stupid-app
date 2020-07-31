import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from 'src/models/item.model';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  @Input() item: ItemModel;
  numberInCart: number;

  constructor(
    private cartService: CartService
  ) {
    this.numberInCart = 0;
  }

  ngOnInit(): void {
    this.cartService.items.subscribe(items => {
      let currentNumber = 0;
      items.forEach(it => {
        if (it.item === this.item) {
          currentNumber = it.number;
        }
      });
      this.numberInCart = currentNumber;
    });
  }

  incrToCart(): void {
    this.cartService.incrItem(this.item);
  }

  descToCart(): void {
    this.cartService.descrItem(this.item);
  }
}