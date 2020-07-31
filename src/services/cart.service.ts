import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemModel } from '../models/item.model';
import { ItemInstanceModel } from '../models/item-instance.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _items: BehaviorSubject<ItemInstanceModel[]>;

  constructor() {
    this._items = new BehaviorSubject<ItemInstanceModel[]>([]);
  }

  get items() {
    return this._items.asObservable();
  }

  incrItem(item: ItemModel) {
    let listItem = this._items.getValue();
    let itemExist: ItemInstanceModel = null;
    listItem.forEach(it => {
      if (it.item === item) {
        itemExist = it
        return;
      }
    });
    if (!!itemExist) ++itemExist.number;
    else {
      listItem.push(new ItemInstanceModel(item, 1));
    }

    this._items.next(listItem);
  }

  descrItem(item: ItemModel) {
    let listItem = this._items.getValue();
    let itemExist: ItemInstanceModel = null;
    listItem.forEach(it => {
      if (it.item === item) {
        itemExist = it;
        return;
      }
    })
    if (!!itemExist) {
      --itemExist.number;
      if (itemExist.number === 0)
        listItem = listItem.filter(it => it !== itemExist);
    }
    this._items.next(listItem);
  }

  getTotalCost(): number {
    let cost: number = 0;
    this._items.getValue().forEach(it => {
      cost += it.number * it.item.price;
    });
    return cost;
  }

  checkout(): void {
    this._items.next([]);
  }
}
