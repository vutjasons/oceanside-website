import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../item.model';
import { ItemsService } from '../../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mpants',
  templateUrl: './mpants.component.html',
  styleUrls: ['./mpants.component.css']
})
export class MpantsComponent implements OnInit {

  pants: Item[] = [];
  isLoading = false;
  private pantsSub: Subscription;

  constructor(route: ActivatedRoute, public itemsService: ItemsService, public router: Router) { }


  // Automatically executes function when angular creates this component
  // Recommended to do basic initialize tasks here
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getMPants();
    this.pantsSub = this.itemsService
      .getMPantsUpdateListener()
      .subscribe((items: Item[]) => {
        this.isLoading = false;
        this.pants = items;
      });
  }

  onClick(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }
}
