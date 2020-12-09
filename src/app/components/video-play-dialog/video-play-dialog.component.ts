import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-play-dialog',
  templateUrl: './video-play-dialog.component.html',
  styleUrls: ['./video-play-dialog.component.scss']
})
export class VideoPlayDialogComponent implements OnInit {

  currentVideo: any;

  constructor(
    private dialogRef: MatDialogRef<VideoPlayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private source : any,
  ) { 
    this.currentVideo = this.source.selectedVideo;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }



}
