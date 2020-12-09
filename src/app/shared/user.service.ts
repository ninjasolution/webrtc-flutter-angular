import { Injectable } from '@angular/core';
import { Observable, Operator, Subject } from 'rxjs';
import { User } from '../models/User.model';
import { SocketioService } from './socketio.service';
import { scan, publishReplay, refCount, map} from 'rxjs/operators';

const initialMessages: User[] = [];

interface IUserOperation extends Function {
 (messages: User[]): User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  activatedUsers: Observable<User[]> = new Observable<User[]>();
  updates: Subject<any> = new Subject<any>();
  createAction: Subject<User> = new Subject<User>();
  create: Subject<any> = new Subject<any>();
  remove: Subject<any> = new Subject<any>();
  removeAction: Subject<any> = new Subject<any>();
  load: Subject<any> = new Subject<any>();
  loadAction: Subject<any> = new Subject<any>();

  constructor(
    private socketService: SocketioService,
    ) { 

    this.activatedUsers = this.updates.pipe(scan((state: User[], operator: IUserOperation) => operator(state), initialMessages), publishReplay(1), refCount());

    this.create.pipe(map((user: User): IUserOperation => (users: User[]) => users.concat(user)))
              .subscribe(this.updates);

    this.remove.pipe(map((user: User): IUserOperation => (users: User[]) => users.filter(u => u.ID !== user.ID)))
              .subscribe(this.updates);
    
    this.load.pipe(map((users: User[]): IUserOperation => (initialUsers: User[]) => users.concat(initialUsers)))
              .subscribe(this.updates);

    this.createAction.subscribe(this.create);
    this.removeAction.subscribe(this.remove);
    this.loadAction.subscribe(this.load)
    this.socketService.socket.emit('login', new User('user'+ Math.floor(Math.random() * (1000 - 1) + 1)));

    this.socketService.socket.on('login', (user: any) => {
      this.activatedUsers.subscribe((users: User[]) => {
        if(users.find(u => u.ID === user.ID) === null) {
          this.newUser(user);
        }
      })
    })


    this.socketService.socket.on('downloadURL', (url: string) => {
      console.log(url);
    })

    this.socketService.socket.on('broadcastURL', (url: string) => {
      console.log(url);
    })

    this.socketService.socket.on('loadUsers', (users: User[]) => {
      console.log(users)
      this.loadAction.next(users);
    })
  }

  public newUser(user: User) {
    this.createAction.next(user);
  }

  public removeUser(user: any) {
    this.removeAction.next(user);
  }
}
