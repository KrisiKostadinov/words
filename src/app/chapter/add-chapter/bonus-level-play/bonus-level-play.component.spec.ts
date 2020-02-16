import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusLevelPlayComponent } from './bonus-level-play.component';

describe('BonusLevelPlayComponent', () => {
  let component: BonusLevelPlayComponent;
  let fixture: ComponentFixture<BonusLevelPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusLevelPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusLevelPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
