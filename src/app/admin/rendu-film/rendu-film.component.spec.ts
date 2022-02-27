import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenduFilmComponent } from './rendu-film.component';

describe('RenduFilmComponent', () => {
  let component: RenduFilmComponent;
  let fixture: ComponentFixture<RenduFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenduFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenduFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
