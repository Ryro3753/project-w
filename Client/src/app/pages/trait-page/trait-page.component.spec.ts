import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitPageComponent } from './trait-page.component';

describe('TraitPageComponent', () => {
  let component: TraitPageComponent;
  let fixture: ComponentFixture<TraitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
