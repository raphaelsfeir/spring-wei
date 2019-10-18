import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitesPage } from './activites.page';

describe('ActivitesPage', () => {
  let component: ActivitesPage;
  let fixture: ComponentFixture<ActivitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
