import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcontestComponent } from './allcontest.component';

describe('AllcontestComponent', () => {
  let component: AllcontestComponent;
  let fixture: ComponentFixture<AllcontestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcontestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcontestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
