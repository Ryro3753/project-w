import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilitiesComponent } from './character-abilities.component';

describe('CharacterAbilitiesComponent', () => {
  let component: CharacterAbilitiesComponent;
  let fixture: ComponentFixture<CharacterAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterAbilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
