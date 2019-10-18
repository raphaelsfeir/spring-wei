import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BungalowPage } from './bungalow.page';

describe('BungalowPage', () => {
  let component: BungalowPage;
  let fixture: ComponentFixture<BungalowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BungalowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BungalowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
