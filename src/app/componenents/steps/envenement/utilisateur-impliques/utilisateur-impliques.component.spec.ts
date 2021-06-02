import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurImpliquesComponent } from './utilisateur-impliques.component';

describe('UtilisateurImpliquesComponent', () => {
  let component: UtilisateurImpliquesComponent;
  let fixture: ComponentFixture<UtilisateurImpliquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurImpliquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurImpliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
