import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetSkillsComponent } from './character-sheet-skills.component';

describe('CharacterSheetSkillsComponent', () => {
  let component: CharacterSheetSkillsComponent;
  let fixture: ComponentFixture<CharacterSheetSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
