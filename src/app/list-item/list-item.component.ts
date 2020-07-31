import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ItemService } from '../../services/item.service';
import { ItemModel } from 'src/models/item.model';
import { ItemInstanceModel } from 'src/models/item-instance.model';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements OnInit {
  public items: ItemModel[];

  constructor(
    private cartService: CartService,
    private itemService: ItemService,
  ) {
    this.itemService.items.subscribe((items) => {
      this.items = items;
    });
  }

  ngOnInit(): void {
  }

}
