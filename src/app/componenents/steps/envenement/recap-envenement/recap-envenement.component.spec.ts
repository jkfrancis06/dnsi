import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapEnvenementComponent } from './recap-envenement.component';

describe('RecapEnvenementComponent', () => {
  let component: RecapEnvenementComponent;
  let fixture: ComponentFixture<RecapEnvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapEnvenementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapEnvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
