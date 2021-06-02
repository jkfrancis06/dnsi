import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitesImpliquesComponent } from './entites-impliques.component';

describe('EntitesImpliquesComponent', () => {
  let component: EntitesImpliquesComponent;
  let fixture: ComponentFixture<EntitesImpliquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitesImpliquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitesImpliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
