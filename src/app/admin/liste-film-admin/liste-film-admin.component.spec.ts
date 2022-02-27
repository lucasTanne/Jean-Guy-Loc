import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFilmAdminComponent } from './liste-film-admin.component';

describe('ListeFilmAdminComponent', () => {
  let component: ListeFilmAdminComponent;
  let fixture: ComponentFixture<ListeFilmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFilmAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFilmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
