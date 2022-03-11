import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetPanelComponent } from './character-sheet-panel.component';

describe('CharacterSheetPanelComponent', () => {
  let component: CharacterSheetPanelComponent;
  let fixture: ComponentFixture<CharacterSheetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
