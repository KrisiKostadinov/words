import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContestsComponent } from './list-contests.component';

describe('ListContestsComponent', () => {
  let component: ListContestsComponent;
  let fixture: ComponentFixture<ListContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
