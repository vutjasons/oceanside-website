import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itemdisplay',
  templateUrl: './itemdisplay.component.html',
  styleUrls: ['./itemdisplay.component.css']
})
export class ItemdisplayComponent implements OnInit {
  @Input() item: Item;
  constructor(private router: Router) {}

  ngOnInit() {}

  /*viewItem(itemId: string) {
    this.router.navigate(['/item', itemId]);
  }*/
}

