import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelContestComponent } from './add-level-contest.component';

describe('AddLevelContestComponent', () => {
  let component: AddLevelContestComponent;
  let fixture: ComponentFixture<AddLevelContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLevelContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevelContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
