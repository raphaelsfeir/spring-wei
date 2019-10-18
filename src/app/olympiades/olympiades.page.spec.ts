import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympiadesPage } from './olympiades.page';

describe('OlympiadesPage', () => {
  let component: OlympiadesPage;
  let fixture: ComponentFixture<OlympiadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlympiadesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympiadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
