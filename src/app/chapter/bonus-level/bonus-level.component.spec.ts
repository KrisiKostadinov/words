import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusLevelComponent } from './bonus-level.component';

describe('BonusLevelComponent', () => {
  let component: BonusLevelComponent;
  let fixture: ComponentFixture<BonusLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
