import { Injectable } from '@angular/core';
import {CreateUser} from '../models/create-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRules {
  static validate(userData: CreateUser): void {
    if (!userData.email.includes('@')) {
      throw new Error('Email invalide');
    }
    if (userData.name.length === 0) {
      throw new Error('Nom obligatoire');
    }
  }
}
