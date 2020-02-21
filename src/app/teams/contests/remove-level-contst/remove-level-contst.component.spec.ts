import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLevelContstComponent } from './remove-level-contst.component';

describe('RemoveLevelContstComponent', () => {
  let component: RemoveLevelContstComponent;
  let fixture: ComponentFixture<RemoveLevelContstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveLevelContstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLevelContstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
