import { Component, OnInit } from '@angular/core';
import Items from '../Items';
import { ItemsService } from '../items.service';


@Component({
  selector: 'men-products',
  templateUrl: './men-products.component.html',
  styleUrls: ['./men-products.component.css']
})
export class MenProductsComponent implements OnInit {
  displayedColumns: string[] = ['item_name', 'item_price'];
  item: Items[] = [];
  isLoadingResults = true;
  constructor(private is: ItemsService) { }

  ngOnInit() {
    this.is
      .getItems()
      .subscribe((data: Items[]) => {
        this.item = data;
        this.isLoadingResults = false;
      });
  }

}
