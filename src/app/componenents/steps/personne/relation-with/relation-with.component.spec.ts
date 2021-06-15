import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationWithComponent } from './relation-with.component';

describe('RelationWithComponent', () => {
  let component: RelationWithComponent;
  let fixture: ComponentFixture<RelationWithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationWithComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
