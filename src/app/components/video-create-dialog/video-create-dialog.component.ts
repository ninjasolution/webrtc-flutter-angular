import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { APIService } from 'src/app/shared/api.service';
import { VideoService } from 'src/app/shared/video.service';

@Component({
  selector: 'app-video-create-dialog',
  templateUrl: './video-create-dialog.component.html',
  styleUrls: ['./video-create-dialog.component.scss']
})
export class VideoCreateDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  httpOptions: any;
  selectedFile: any = null;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VideoCreateDialogComponent>,
    private videoService: VideoService,
    @Inject(MAT_DIALOG_DATA) private data : any,
    @Inject(NGX_MAT_FILE_INPUT_CONFIG) private fileInputConfig: any,
    private apiService: APIService,
  ) { 
    this.description = this.data.title;
    
    this.form = this.fb.group({
      description: [this.description, []],
      videoName: new FormControl('', Validators.minLength(2))
    })


  }

  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close();
  }

  onChange(file: any) {
    this.selectedFile = file.target.files[0]
  }

  upload() {

    if(this.form.get('videoName')?.value === '' || this.selectedFile === null) return;
    console.log(this.form.get('videoName')?.value)
    var formData = new FormData();
    formData.append('video', this.selectedFile, this.form.get('videoName' )?.value || this.selectedFile.name);
    formData.append('videoName', this.form.get('videoName')?.value);
    
    this.apiService.fileUpload(formData)
          .subscribe(data => {
            this.videoService.createAction.next(data)
          })
  }

}
