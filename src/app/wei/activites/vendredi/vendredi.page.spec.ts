import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendrediPage } from './vendredi.page';

describe('VendrediPage', () => {
  let component: VendrediPage;
  let fixture: ComponentFixture<VendrediPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendrediPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendrediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
