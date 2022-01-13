import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceAccordionComponent } from './race-accordion.component';

describe('RaceAccordionComponent', () => {
  let component: RaceAccordionComponent;
  let fixture: ComponentFixture<RaceAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
