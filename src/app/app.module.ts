import { SocketioService } from './shared/socketio.service';
import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './views/login/login.component'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSliderModule } from '@angular/material/slider';
import { BrowserComponent } from './views/browser/browser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VideoCreateDialogComponent } from './components/video-create-dialog/video-create-dialog.component'
import { FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG, MaterialFileInputModule } from 'ngx-material-file-input';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayDialogComponent } from './components/video-play-dialog/video-play-dialog.component';
import { APIService } from './shared/api.service';
// import { MatVideoModule } from 'mat-video';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { UserListService } from './shared/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { VideoService } from './shared/video.service';
import { MatToolbarModule } from '@angular/material/toolbar'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'

const fileInputCnfig: FileInputConfig = {
  sizeUnit: 'Octet'
}

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:6430', options: {
                      
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BrowserComponent,
    VideoCreateDialogComponent,
    VideoPlayDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatVideoModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSliderModule,
    MatDialogModule,
    MaterialFileInputModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    MatToolbarModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [ 
    SocketioService, 
    APIService,  
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: fileInputCnfig },
    UserListService,
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
