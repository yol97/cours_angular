// user-list.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { UserApi } from '../../services/user-api';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private userApi = inject(UserApi);
  protected error = signal<string | null>(null);

  users = signal<User[]>([]);
  isDeleting = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.users.set(await this.userApi.getUsers());
  }

  async deleteUser(userId: string) {
    this.isDeleting.set(userId);
    try {
      await this.userApi.deleteUser(userId);
      this.users.update(users => users.filter(u => u.id !== userId));
    } catch (error) {
      this.errorMessage.set((error as Error).message);
    } finally {
      this.isDeleting.set(null);
    }
  }

  // Pour actualiser les données (pas optimisé mais nous verrons ça plus tard)
  async refresh() {
    await this.loadUsers();
  }
}
