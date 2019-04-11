import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../item.model';
import { ItemsService } from '../../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-msweater',
  templateUrl: './msweater.component.html',
  styleUrls: ['./msweater.component.css']
})
export class MsweaterComponent implements OnInit {
  sweaters: Item[] = [];
  isLoading = false;
  private sweatersSub: Subscription;

  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getMSweaters();
    this.sweatersSub = this.itemsService
      .getMSweaterUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.sweaters = items;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
