import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  isLoading = false;
  private itemsSub: Subscription;

  constructor(public itemsService: ItemsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getItems();
    this.itemsSub = this.itemsService.getItemUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.items = items;
      });
  }

  onDelete(itemId: string) {
    this.itemsService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
