import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsweaterComponent } from './wsweater.component';

describe('WsweaterComponent', () => {
  let component: WsweaterComponent;
  let fixture: ComponentFixture<WsweaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsweaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsweaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
