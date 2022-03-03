import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetMiscellaneousCardComponent } from './character-sheet-miscellaneous-card.component';

describe('CharacterSheetMiscellaneousCardComponent', () => {
  let component: CharacterSheetMiscellaneousCardComponent;
  let fixture: ComponentFixture<CharacterSheetMiscellaneousCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetMiscellaneousCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetMiscellaneousCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
