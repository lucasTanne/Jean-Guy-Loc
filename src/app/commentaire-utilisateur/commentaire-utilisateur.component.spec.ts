import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireUtilisateurComponent } from './commentaire-utilisateur.component';

describe('CommentaireUtilisateurComponent', () => {
  let component: CommentaireUtilisateurComponent;
  let fixture: ComponentFixture<CommentaireUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentaireUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaireUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
