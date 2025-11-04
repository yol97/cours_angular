// profile-form.page.ts
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
  FormArray,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { ProfileFormModel } from '../components/profile-form.model';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export default class ProfileForm {
  protected fb = inject(NonNullableFormBuilder);

  // Déclare addresses comme un FormArray
  addresses: FormArray = this.fb.array([
    this.fb.control('', Validators.required)
  ]);

  // Déclare shippingForm comme un FormGroup séparé si nécessaire
  shippingForm: FormGroup = this.fb.group({
    addresses: this.addresses
  });

  // Validateur personnalisé pour vérifier que password et confirmPassword sont identiques
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Si les deux champs ont une valeur et qu'elles ne correspondent pas
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };

  // Déclare profileForm avec tous les champs
  profileForm: FormGroup<ProfileFormModel> = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: this.fb.control('', Validators.required),
    phone: this.fb.control('', [Validators.pattern(/^0[0-9]{9}$/)]),
    // Si on veut inclure shippingForm dans profileForm :
    //shipping: this.shippingForm
    addresses: this.fb.array([this.fb.control('', Validators.required)]),
  }, {
    validators: this.passwordMatchValidator
  });
}




