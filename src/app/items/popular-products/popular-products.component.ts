import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit{

  sweaters: Item[] = [];
  isLoading = false;
  private sweatersSub: Subscription;
  pants: Item[] = [];
  isLoading2 = false;
  private pantsSub: Subscription;
  wsweaters: Item[] = [];
  isLoading3 = false;
  private wsweatersSub: Subscription;
  wpants: Item[] = [];
  isLoading4 = false;
  private wpantsSub: Subscription;

  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getMSweaters();
    this.sweatersSub = this.itemsService
      .getMSweaterUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.sweaters = items;
      });
    this.isLoading2 = true;
    this.itemsService.getMPants();
    this.pantsSub = this.itemsService
      .getMPantsUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.pants = items;
      });
    this.isLoading3 = true;
    this.itemsService.getWSweaters();
    this.wsweatersSub = this.itemsService
      .getWSweaterUpdateListener()
      .subscribe((wsweaters: Item[]) => {
        this.isLoading = false;
        this.wsweaters = wsweaters;
      });
    this.isLoading4 = true;
    this.itemsService.getWPants();
    this.wpantsSub = this.itemsService
      .getWPantsUpdateListener()
      .subscribe((wpants: Item[]) => {
        this.isLoading = false;
        this.wpants = wpants;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
