import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsweaterComponent } from './msweater.component';

describe('MsweaterComponent', () => {
  let component: MsweaterComponent;
  let fixture: ComponentFixture<MsweaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsweaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsweaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
