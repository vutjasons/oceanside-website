import { Component, OnInit, OnDestroy, Output, } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: Item[] = [];
  isLoading = false;
  private saleSub: Subscription;

  constructor( public route: ActivatedRoute, public itemsService: ItemsService, private router: Router) {}


  // Automatically executes function when angular creates this component
  // Recommended to do basic initialize tasks here
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getMale();
    this.saleSub = this.itemsService
      .getMaleUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.sales = items;
      });
    }

    onClick(itemId: string)
    {
      this.router.navigate(['/item', itemId]);
    }
  }
