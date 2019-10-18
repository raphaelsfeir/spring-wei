import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauPage } from './bureau.page';

describe('BureauPage', () => {
  let component: BureauPage;
  let fixture: ComponentFixture<BureauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
