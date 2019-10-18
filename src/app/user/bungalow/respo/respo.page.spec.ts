import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespoPage } from './respo.page';

describe('RespoPage', () => {
  let component: RespoPage;
  let fixture: ComponentFixture<RespoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
