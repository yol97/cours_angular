import {FormArray, FormControl, FormGroup} from '@angular/forms';


export type ProfileFormModel = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  phone: FormControl<string>;
  addresses: FormArray<FormControl<string>>;

}

export type LoginFormModel = {      // A voir si on le fait dans le même fichier
  email: FormControl<string>;
  password: FormControl<string>;
}

