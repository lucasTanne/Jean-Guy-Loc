import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuFilmComponent } from './visu-film.component';

describe('VisuFilmComponent', () => {
  let component: VisuFilmComponent;
  let fixture: ComponentFixture<VisuFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
