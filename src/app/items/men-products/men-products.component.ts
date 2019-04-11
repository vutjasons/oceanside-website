import { Component, OnInit, OnDestroy, Output, } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'men-products',
  templateUrl: './men-products.component.html',
  styleUrls: ['./men-products.component.css']
})
export class MenProductsComponent implements OnInit {
  males: Item[] = [];
  isLoading = false;
  private maleSub: Subscription;

  constructor( public route: ActivatedRoute, public itemsService: ItemsService, private router: Router) {}


  // Automatically executes function when angular creates this component
  // Recommended to do basic initialize tasks here
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getMale();
    this.maleSub = this.itemsService
      .getMaleUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.males = items;
      });
    }

    onClick(itemId: string)
    {
      this.router.navigate(['/item', itemId]);
    }
  }
