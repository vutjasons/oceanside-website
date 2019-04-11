import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'women-products',
  templateUrl: './women-products.component.html',
  styleUrls: ['./women-products.component.css']
})
export class WomenProductsComponent implements OnInit {
  females: Item[] = [];
  isLoading = false;
  private femaleSub: Subscription;


  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) { }


  // Automatically executes function when angular creates this component
  // Recommended to do basic initialize tasks here
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getFemale();
    this.femaleSub = this.itemsService
      .getFemaleUpdateListener()
      .subscribe((females: Item[]) => {
        this.isLoading = false;
        this.females = females;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
