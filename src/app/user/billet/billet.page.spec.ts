import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletPage } from './billet.page';

describe('BilletPage', () => {
  let component: BilletPage;
  let fixture: ComponentFixture<BilletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
