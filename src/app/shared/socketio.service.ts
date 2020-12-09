import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(public socket: Socket) {

   this.socket.on('status', (data: any) => {
    console.log(data)
   })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
