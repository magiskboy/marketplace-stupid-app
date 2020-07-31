import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemModel } from '../models/item.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: BehaviorSubject<ItemModel[]>;

  constructor(
    private httpClient: HttpClient
  ) {
    this._items = new BehaviorSubject<ItemModel[]>([]);
    this.loadListItem().subscribe((data: any) => {
      let items: ItemModel[] = new Array<ItemModel>();
      data.forEach(it => {
        items.push(new ItemModel(it.name, it.price, it.imageUrl))
      });
      this._items.next(items);
    });
  }

  get items(): Observable<ItemModel[]> {
    return this._items.asObservable();
  }

  loadListItem(): Observable<Object> {
    let url = `${environment.BACKEND_API}/food`;
    return this.httpClient.get(url);
  }
}
