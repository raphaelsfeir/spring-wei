import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLaunchPage } from './first-launch.page';

describe('FirstLaunchPage', () => {
  let component: FirstLaunchPage;
  let fixture: ComponentFixture<FirstLaunchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLaunchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLaunchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
