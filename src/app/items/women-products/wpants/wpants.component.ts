import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../item.model';
import { ItemsService } from '../../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wpants',
  templateUrl: './wpants.component.html',
  styleUrls: ['./wpants.component.css']
})
export class WpantsComponent implements OnInit {
  pants: Item[] = [];
  isLoading = false;
  private pantsSub: Subscription;

  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) {}

  // Automatically executes function when angular creates this component
  // Recommended to do basic initialize tasks here
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getWPants();
    this.pantsSub = this.itemsService
      .getWPantsUpdateListener()
      .subscribe((pants: Item[]) => {
        this.isLoading = false;
        this.pants = pants;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
