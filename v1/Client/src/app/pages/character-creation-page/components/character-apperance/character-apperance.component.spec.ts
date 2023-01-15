import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterApperanceComponent } from './character-apperance.component';

describe('CharacterApperanceComponent', () => {
  let component: CharacterApperanceComponent;
  let fixture: ComponentFixture<CharacterApperanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterApperanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterApperanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
