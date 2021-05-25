import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireDetailsComponent } from './affaire-details.component';

describe('AffaireDetailsComponent', () => {
  let component: AffaireDetailsComponent;
  let fixture: ComponentFixture<AffaireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffaireDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
