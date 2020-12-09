import { Injectable } from '@angular/core';
import { Observable, Operator, Subject } from 'rxjs';
import { scan, publishReplay, refCount, map} from 'rxjs/operators';
import { Video } from '../models/Video.model';
import { APIService } from './api.service';

interface IVideoOperation extends Function {
  (messages: Video[]): Video[];
 }
 
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  allVideos: Observable<Video[]> = new Observable<Video[]>();
  updates: Subject<any> = new Subject<any>();
  createAction: Subject<any> = new Subject<any>();
  create: Subject<any> = new Subject<any>();
  remove: Subject<any> = new Subject<any>();
  removeAction: Subject<any> = new Subject<any>();
  load: Subject<any> = new Subject<any>();
  loadAction: Subject<any> = new Subject<any>();

  constructor(
    private apiService: APIService,
    ) { 
    this.allVideos = this.updates.pipe(scan((state: Video[], operator: IVideoOperation) => operator(state), []), publishReplay(1), refCount());

    this.create.pipe(map((user: Video): IVideoOperation => (users: Video[]) => users.concat(user)))
              .subscribe(this.updates);

    this.remove.pipe(map((user: Video): IVideoOperation => (users: Video[]) => users.filter(u => u.ID !== user.ID)))
              .subscribe(this.updates);
    
    this.load.pipe(map((users: Video[]): IVideoOperation => (initialUsers: Video[]) => users.concat(initialUsers)))
              .subscribe(this.updates);

    this.createAction.subscribe(this.create);
    this.removeAction.subscribe(this.remove);
    this.loadAction.subscribe(this.load)

    this.apiService.getVideoList()
    .subscribe((videos) => {
      this.loadAction.next(videos)
    });
  }

  public newUser(user: Video) {
    this.createAction.next(user);
  }

  public removeUser(user: any) {
    this.removeAction.next(user);
  }
}
