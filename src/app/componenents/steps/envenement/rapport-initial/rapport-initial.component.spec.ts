import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportInitialComponent } from './rapport-initial.component';

describe('RapportInitialComponent', () => {
  let component: RapportInitialComponent;
  let fixture: ComponentFixture<RapportInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportInitialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
