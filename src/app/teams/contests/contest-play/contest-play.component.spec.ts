import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPlayComponent } from './contest-play.component';

describe('ContestPlayComponent', () => {
  let component: ContestPlayComponent;
  let fixture: ComponentFixture<ContestPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
