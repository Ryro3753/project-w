import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFeaturesComponent } from './character-features.component';

describe('CharacterFeaturesComponent', () => {
  let component: CharacterFeaturesComponent;
  let fixture: ComponentFixture<CharacterFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
