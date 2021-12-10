import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueFilmComponent } from './vue-film.component';

describe('VueFilmComponent', () => {
  let component: VueFilmComponent;
  let fixture: ComponentFixture<VueFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
