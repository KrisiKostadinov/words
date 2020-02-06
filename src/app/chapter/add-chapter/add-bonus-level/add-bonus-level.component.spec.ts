import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonusLevelComponent } from './add-bonus-level.component';

describe('AddBonusLevelComponent', () => {
  let component: AddBonusLevelComponent;
  let fixture: ComponentFixture<AddBonusLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBonusLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBonusLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
