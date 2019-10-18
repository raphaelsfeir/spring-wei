import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePage } from './single.page';

describe('SinglePage', () => {
  let component: SinglePage;
  let fixture: ComponentFixture<SinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
