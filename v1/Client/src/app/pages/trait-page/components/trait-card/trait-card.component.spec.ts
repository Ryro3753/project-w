import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitCardComponent } from './trait-card.component';

describe('TraitCardComponent', () => {
  let component: TraitCardComponent;
  let fixture: ComponentFixture<TraitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
