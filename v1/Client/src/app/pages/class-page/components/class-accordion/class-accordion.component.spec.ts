import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAccordionComponent } from './class-accordion.component';

describe('ClassAccordionComponent', () => {
  let component: ClassAccordionComponent;
  let fixture: ComponentFixture<ClassAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
