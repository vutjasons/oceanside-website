import { Component, OnInit, OnDestroy, Output, } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  items: Item[] = [];
  isLoading = false;
  private itemSub: Subscription;


  constructor(public route: ActivatedRoute, public itemsService: ItemsService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getItems();
    this.itemSub = this.itemsService
      .getItemUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.items = items;
      });
    }

    onClick(itemId: string)
    {
      this.router.navigate(['/item', itemId]);
    }

}
