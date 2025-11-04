import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {LoginFormModel} from '../components/profile-form.model';
// import { ProfileFormModel } from '../components/profile-form.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './register.scss'
})
export default class Login {
  private fb = inject(NonNullableFormBuilder);

  // formulaire de login
  profileForm: FormGroup<LoginFormModel> = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

}
