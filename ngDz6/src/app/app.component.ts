import { Component } from '@angular/core';
import { HttpService } from './http.service';

import { User } from './user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent {
  user: User = { login: '', password: '' };
  response: string = '';

  constructor(private httpService: HttpService) {}

  submit(form: NgForm) {
    this.response = '';

    this.user.login = form.value.login;
    this.user.password = form.value.password;

    this.httpService.postData(this.user).subscribe({
      next: (data: any) => {
        this.response = data;
      },
      error: (error) => console.log(error),
    });
  }
}
