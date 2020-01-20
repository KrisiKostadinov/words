import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTaskChapterComponent } from './upload-task-chapter.component';

describe('UploadTaskChapterComponent', () => {
  let component: UploadTaskChapterComponent;
  let fixture: ComponentFixture<UploadTaskChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTaskChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTaskChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
