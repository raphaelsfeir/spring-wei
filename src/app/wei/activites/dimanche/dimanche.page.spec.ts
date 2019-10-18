import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimanchePage } from './dimanche.page';

describe('DimanchePage', () => {
  let component: DimanchePage;
  let fixture: ComponentFixture<DimanchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimanchePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimanchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
