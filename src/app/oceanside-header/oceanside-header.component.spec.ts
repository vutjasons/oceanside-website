import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OceansideHeaderComponent } from './oceanside-header.component';

describe('OceansideHeaderComponent', () => {
  let component: OceansideHeaderComponent;
  let fixture: ComponentFixture<OceansideHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OceansideHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OceansideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
