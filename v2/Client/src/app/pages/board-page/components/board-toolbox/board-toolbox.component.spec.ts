import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardToolboxComponent } from './board-toolbox.component';

describe('BoardToolboxComponent', () => {
  let component: BoardToolboxComponent;
  let fixture: ComponentFixture<BoardToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardToolboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
