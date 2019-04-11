import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpantsComponent } from './mpants.component';

describe('MpantsComponent', () => {
  let component: MpantsComponent;
  let fixture: ComponentFixture<MpantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
