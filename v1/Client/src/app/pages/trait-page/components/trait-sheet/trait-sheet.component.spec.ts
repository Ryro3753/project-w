import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitSheetComponent } from './trait-sheet.component';

describe('TraitSheetComponent', () => {
  let component: TraitSheetComponent;
  let fixture: ComponentFixture<TraitSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
