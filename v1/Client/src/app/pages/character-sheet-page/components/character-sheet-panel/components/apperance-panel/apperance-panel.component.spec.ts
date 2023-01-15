import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApperancePanelComponent } from './apperance-panel.component';

describe('ApperancePanelComponent', () => {
  let component: ApperancePanelComponent;
  let fixture: ComponentFixture<ApperancePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApperancePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApperancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
