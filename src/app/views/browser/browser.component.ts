import { Video } from './../../models/Video.model';
import { User } from './../../models/User.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { VideoCreateDialogComponent } from 'src/app/components/video-create-dialog/video-create-dialog.component';
import { MatSort } from '@angular/material/sort';
import { VideoPlayDialogComponent } from 'src/app/components/video-play-dialog/video-play-dialog.component';
import { APIService } from 'src/app/shared/api.service';
import { SocketioService } from 'src/app/shared/socketio.service';
import { UserListService } from 'src/app/shared/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { VideoService } from 'src/app/shared/video.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  activatedUsers: User[] = [];
  selectedUser: any = null;
  videos: Video[] = [];
  displayedColumns: string[] = [ "No", "Title", "CreatedAt", "Action" ];
  dataSource: MatTableDataSource<Video> = new MatTableDataSource();
  gridColumns: number = 3;
  paginatorCrl: any = null;
  @ViewChild(MatPaginator)
  set setPaginator(pnt: MatPaginator) {
    this.dataSource.paginator = pnt;
    this.paginatorCrl = pnt;
  }
  
  @ViewChild(MatSort)
  set setSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  
  constructor(
    private dialog: MatDialog,
    private apiService: APIService,
    private socketService: SocketioService,
    private userService: UserListService,
    private videoService: VideoService,
    private snackBar: MatSnackBar
    ) { 

      this.videoService.allVideos.subscribe((videos: Video[]) => {

        this.videos = videos;
        this.dataSource = new MatTableDataSource(videos);
        this.dataSource.paginator = this.paginatorCrl;
      })
   
    this.userService.activatedUsers.subscribe((users: User[]) => {
      this.activatedUsers = users;
    })

    this.selectedUser = this.activatedUsers[0];
  }

  ngOnInit(): void {
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: "New Video",
    }

    const dialogRef = this.dialog.open(VideoCreateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("out:", data)
    )
  }

  showVideoplayDialog(video: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      selectedVideo: video,
      videos: this.videos
    }

    const dialogRef = this.dialog.open(VideoPlayDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("out:", data)
    )
  }
  
  forceDownload(video: any) {
    if(typeof this.selectedUser !== "undefined" && this.selectedUser !== null){
      this.socketService.socket.emit('downloadURL', {video, user: this.selectedUser});
      return;
    }
    this.showSnackbarCssStyles('Please select a target user', 'done', 3000);
  }

  forcePlay(video: any) {

    if(typeof this.selectedUser !== "undefined" && this.selectedUser !== null){
      this.socketService.socket.emit('broadcastURL', {video, user: this.selectedUser});
      return;
    }
    this.showSnackbarCssStyles('Please select a target user', 'done', 3000);
  }

  delete(video: any) {
    this.socketService.socket.emit('delete', video);
    this.videos = this.videos.filter(v => v.Title !== video.Title);
    this.dataSource = new MatTableDataSource(this.videos);
  }

  selectUser(user: any) {
    this.selectedUser = user
  }

  showSnackbarCssStyles(content: string, action: string, duration: number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

}
