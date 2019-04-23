import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private items: Item[] = [];
  private male: Item[] = [];
  private msweaters: Item[] = [];
  private mpants: Item[] = [];
  private female: Item[] = [];
  private wsweaters: Item[] = [];
  private wpants: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();
  private maleUpdated = new Subject<Item[]>();
  private msweaterUpdated = new Subject<Item[]>();
  private mpantsUpdated = new Subject<Item[]>();
  private femaleUpdated = new Subject<Item[]>();
  private wsweaterUpdated = new Subject<Item[]>();
  private wpantsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getItems() {
    this.http
      .get<{ message: string; items: any }>('http://localhost:4000/api/items')
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemTime,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.items = transformedItems;
        this.itemsUpdated.next([...this.items]);
      });
  }

  // Pipeline allows to add in multiple operators
  // map operator transforms every element of an array to a new element and store them into a new array
  getMale() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/men'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.male = transformedItems;
        this.maleUpdated.next([...this.male]);
      });
  }

  getMSweaters() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/men/sweater'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.msweaters = transformedItems;
        this.msweaterUpdated.next([...this.msweaters]);
      });
  }

  getMPants() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/men/pants'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.mpants = transformedItems;
        this.mpantsUpdated.next([...this.mpants]);
      });
  }

  getFemale() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/women'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.female = transformedItems;
        this.femaleUpdated.next([...this.female]);
      });
  }

  getWSweaters() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/women/sweater'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.wsweaters = transformedItems;
        this.wsweaterUpdated.next([...this.wsweaters]);
      });
  }

  getWPants() {
    this.http
      .get<{ message: string; items: any }>(
        'http://localhost:4000/api/items/women/pants'
      )
      .pipe(
        map(itemData => {
          return itemData.items.map(item => {
            return {
              itemName: item.itemName,
              itemSize: item.itemSize,
              itemGender: item.itemGender,
              itemType: item.itemType,
              itemPrice: item.itemPrice,
              itemStock: item.itemStock,
              id: item._id
            };
          });
        })
      )
      .subscribe(transformedItems => {
        this.wpants = transformedItems;
        this.wpantsUpdated.next([...this.wpants]);
      });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  getMaleUpdateListener() {
    return this.maleUpdated.asObservable();
  }

  getMSweaterUpdateListener() {
    return this.msweaterUpdated.asObservable();
  }

  getMPantsUpdateListener() {
    return this.mpantsUpdated.asObservable();
  }

  getFemaleUpdateListener() {
    return this.femaleUpdated.asObservable();
  }

  getWSweaterUpdateListener() {
    return this.wsweaterUpdated.asObservable();
  }

  getWPantsUpdateListener() {
    return this.wpantsUpdated.asObservable();
  }

  // Returns the clone of the specified item
  getItem(id: string) {
    return this.http.get<{
      _id: string;
      itemName: string;
      itemSize: string;
      itemGender: string;
      itemType: string;
      itemPrice: number;
      itemStock: number;
    }>('http://localhost:4000/api/items/' + id);
  }

  addItem(
    itemName: string,
    itemSize: string,
    itemGender: string,
    itemType: string,
    itemPrice: number,
    itemStock: number
  ) {
    const item: Item = {
      id: null,
      itemName: itemName,
      itemSize: itemSize,
      itemGender: itemGender,
      itemType: itemType,
      itemPrice: itemPrice,
      itemStock: itemStock
    };
    this.http
      .post<{ message: string; itemId: string }>(
        'http://localhost:4000/api/items',
        item
      )
      .subscribe(responseData => {
        const id = responseData.itemId;
        item.id = id;
        this.items.push(item);
        this.itemsUpdated.next([...this.items]);
        this.router.navigate(['/']);
      });
  }

  updateItem(
    id: string,
    itemName: string,
    itemSize: string,
    itemGender: string,
    itemType: string,
    itemPrice: number,
    itemStock: number
  ) {
    const item: Item = {
      id: id,
      itemName: itemName,
      itemSize: itemSize,
      itemGender: itemGender,
      itemType: itemType,
      itemPrice: itemPrice,
      itemStock: itemStock
    };

    console.log(item);
    this.http
      .put('http://localhost:4000/api/items/' + id, item)
      .subscribe(response => {
        const updatedItems = [...this.items];
        const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
        updatedItems[oldItemIndex] = item;
        this.items = updatedItems;
        this.itemsUpdated.next([...this.items]);
      });
  }

  deleteItem(itemId: string) {
    this.http
      .delete('http://localhost:4000/api/items' + itemId)
      .subscribe(() => {
        const updatedItems = this.items.filter(item => item.id !== itemId);
        this.items = updatedItems;
        this.itemsUpdated.next([...this.items]);
      });
  }
}

