import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBungalowComponent } from './update-bungalow.component';

describe('UpdateBungalowComponent', () => {
  let component: UpdateBungalowComponent;
  let fixture: ComponentFixture<UpdateBungalowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBungalowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBungalowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
