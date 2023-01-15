import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellPanelComponent } from './spell-panel.component';

describe('SpellPanelComponent', () => {
  let component: SpellPanelComponent;
  let fixture: ComponentFixture<SpellPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
