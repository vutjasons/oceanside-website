import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpantsComponent } from './wpants.component';

describe('WpantsComponent', () => {
  let component: WpantsComponent;
  let fixture: ComponentFixture<WpantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
