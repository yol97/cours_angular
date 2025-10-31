// features/user/services/user.facade.ts
import {inject, Injectable} from '@angular/core';
import {UserApi} from './user.api';
import {UserStore} from './user.store';
import {NotificationService} from '../../../shared/services/notification.service';
import {CreateUser, User} from '../models/user.model';
import {UserRules} from '../domain/user.rules';

@Injectable({providedIn: 'root'})
export class UserFacade {
  private userApi = inject(UserApi);
  private userStore = inject(UserStore);
  private success = inject(NotificationService).showSuccess
  private error = inject(NotificationService).showError

  getUsers() {
    this.userApi.getUsers().then(users => {
      this.userStore.setUsers(users);
    }).catch(error => {
      this.error(error.message);
    });
  }

  async createUser(userData: CreateUser): Promise<User> {

    // 1. Validation métier
    UserRules.validate(userData);

    // 2. Appel API → persistance
    //const user = await this.userApi.createUser(userData);
    const newUser: User = {
      id: Math.floor(Math.random() * 100),
      ...userData,
      username: 'username ' + Math.floor(Math.random() * 100),
      website: 'website ' + Math.floor(Math.random() * 100)
    };
    // 3. Store → mise en cache local
    this.userStore.addUser(newUser);

    // 4. NotificationService → feedback utilisateur
    this.success('Utilisateur créé avec succès 🎉');

    return newUser;
  }

  async updateUser(user: User): Promise<void> {
    if (user) {
      // 2. Appel API → persistance
      await this.userApi.updateUser(user.id, user);
      this.userStore.updateUser({
        ...user,
        name: user.name + ' (modifié)'
      });
      this.success("Utilisateur modifié")
    }
    this.error("Utilisateur non modifié")
  }

  async removeUser(id: number): Promise<void> {
    // 2. Appel API → persistance
    //await this.userApi.deleteUser(id);
    this.userStore.removeUser(id);
  }
}
