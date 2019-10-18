import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletsPage } from './billets.page';

describe('BilletsPage', () => {
  let component: BilletsPage;
  let fixture: ComponentFixture<BilletsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilletsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
