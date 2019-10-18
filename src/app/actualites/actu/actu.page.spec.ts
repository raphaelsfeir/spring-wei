import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuPage } from './actu.page';

describe('ActuPage', () => {
  let component: ActuPage;
  let fixture: ComponentFixture<ActuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
