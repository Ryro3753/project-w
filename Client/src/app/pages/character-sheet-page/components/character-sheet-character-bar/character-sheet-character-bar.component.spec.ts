import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetCharacterBarComponent } from './character-sheet-character-bar.component';

describe('CharacterSheetCharacterBarComponent', () => {
  let component: CharacterSheetCharacterBarComponent;
  let fixture: ComponentFixture<CharacterSheetCharacterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetCharacterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetCharacterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
