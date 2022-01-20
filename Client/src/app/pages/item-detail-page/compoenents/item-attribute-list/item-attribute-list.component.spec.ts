import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAttributeListComponent } from './item-attribute-list.component';

describe('ItemAttributeListComponent', () => {
  let component: ItemAttributeListComponent;
  let fixture: ComponentFixture<ItemAttributeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAttributeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
