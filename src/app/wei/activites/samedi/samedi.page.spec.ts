import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamediPage } from './samedi.page';

describe('SamediPage', () => {
  let component: SamediPage;
  let fixture: ComponentFixture<SamediPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamediPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
