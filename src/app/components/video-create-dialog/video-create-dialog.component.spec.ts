import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCreateDialogComponent } from './video-create-dialog.component';

describe('VideoCreateDialogComponent', () => {
  let component: VideoCreateDialogComponent;
  let fixture: ComponentFixture<VideoCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
