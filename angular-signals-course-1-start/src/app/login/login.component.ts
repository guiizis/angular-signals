import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MessagesService } from "../messages/messages.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly messagesService = inject(MessagesService);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  onLogin() {
    try {
      const {email, password} = this.form.value;
      if (!email || !password) {
        this.messagesService.showMessage('please provide email and password', 'error');
      }

    } catch(error) {
      console.error('login error', error);
      this.messagesService.showMessage('login error, please try again later', 'error');
    }
  }
}
