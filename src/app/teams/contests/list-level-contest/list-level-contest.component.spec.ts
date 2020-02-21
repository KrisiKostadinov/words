import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLevelContestComponent } from './list-level-contest.component';

describe('ListLevelContestComponent', () => {
  let component: ListLevelContestComponent;
  let fixture: ComponentFixture<ListLevelContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLevelContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLevelContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
