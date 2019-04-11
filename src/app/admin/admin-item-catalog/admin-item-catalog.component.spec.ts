import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemCatalogComponent } from './admin-item-catalog.component';

describe('AdminItemCatalogComponent', () => {
  let component: AdminItemCatalogComponent;
  let fixture: ComponentFixture<AdminItemCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
