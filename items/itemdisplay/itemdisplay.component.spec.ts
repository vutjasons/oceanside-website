import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdisplayComponent } from './itemdisplay.component';

describe('ItemdisplayComponent', () => {
  let component: ItemdisplayComponent;
  let fixture: ComponentFixture<ItemdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
