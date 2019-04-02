import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../item.model';
import { ItemsService } from '../../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wsweater',
  templateUrl: './wsweater.component.html',
  styleUrls: ['./wsweater.component.css']
})
export class WsweaterComponent implements OnInit {
  sweaters: Item[] = [];
  isLoading = false;
  private sweatersSub: Subscription;

  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getWSweaters();
    this.sweatersSub = this.itemsService
      .getWSweaterUpdateListener()
      .subscribe((sweaters: Item[]) => {
        this.isLoading = false;
        this.sweaters = sweaters;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
