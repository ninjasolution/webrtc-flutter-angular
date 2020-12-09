import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocketioService } from 'src/app/shared/socketio.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRemember: boolean = false;
  isLoginPage: boolean = true;

  constructor(private socketService: SocketioService) { }

  ngOnInit(): void {
  }


  loginForm: FormGroup = new FormGroup({
    FullName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]),
    Password: new FormControl('', Validators.required),
  });

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.socketService.socket.emit('login', { Name: this.loginForm.get('FullName')?.value})
      console.log('login')
    }
  }

  checkRemember() {
    this.isRemember = this.isRemember ? false : true;
  }

  togglePage() {
    this.isLoginPage = this.isLoginPage ? false : true;
  }

}
