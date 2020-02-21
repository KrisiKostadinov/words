import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLevelContestComponent } from './edit-level-contest.component';

describe('EditLevelContestComponent', () => {
  let component: EditLevelContestComponent;
  let fixture: ComponentFixture<EditLevelContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLevelContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLevelContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
