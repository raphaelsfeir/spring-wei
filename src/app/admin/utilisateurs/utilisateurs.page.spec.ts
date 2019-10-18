import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursPage } from './utilisateurs.page';

describe('UtilisateursPage', () => {
  let component: UtilisateursPage;
  let fixture: ComponentFixture<UtilisateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
