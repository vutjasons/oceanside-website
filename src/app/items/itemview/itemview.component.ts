import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {

  public items: Item;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService, public router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    console.log(id);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.itemsService.getItem(id).subscribe(itemData => {
        this.items = {
          id: itemData._id,
          itemName: itemData.itemName,
          itemGender: itemData.itemGender,
          itemPrice: itemData.itemPrice,
          itemSize: itemData.itemSize,
          itemStock: itemData.itemStock,
          itemType: itemData.itemType
        };
      });
    });
  }

}
