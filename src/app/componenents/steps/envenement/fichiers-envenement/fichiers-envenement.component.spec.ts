import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichiersEnvenementComponent } from './fichiers-envenement.component';

describe('FichiersEnvenementComponent', () => {
  let component: FichiersEnvenementComponent;
  let fixture: ComponentFixture<FichiersEnvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichiersEnvenementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichiersEnvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
