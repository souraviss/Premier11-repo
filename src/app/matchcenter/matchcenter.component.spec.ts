import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcenterComponent } from './matchcenter.component';

describe('MatchcenterComponent', () => {
  let component: MatchcenterComponent;
  let fixture: ComponentFixture<MatchcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
