import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayDialogComponent } from './video-play-dialog.component';

describe('VideoPlayDialogComponent', () => {
  let component: VideoPlayDialogComponent;
  let fixture: ComponentFixture<VideoPlayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
