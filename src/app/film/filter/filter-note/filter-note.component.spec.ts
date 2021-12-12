import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNoteComponent } from './filter-note.component';

describe('FilterNoteComponent', () => {
  let component: FilterNoteComponent;
  let fixture: ComponentFixture<FilterNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
