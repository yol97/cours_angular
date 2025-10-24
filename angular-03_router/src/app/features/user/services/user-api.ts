// features/user/services/user-api.ts
import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/services/base.api';
import {User} from '../models/user.model';
import {CreateUser} from '../models/create-user.model';
import {UpdateUser} from '../models/update-user.model';

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseApi {
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/users';

  async getUsers(): Promise<User[]> {
    console.log("Envoyé par getUsers")
    return this.get<User[]>(this.endpoint);
  }

  async getUserById(id: string): Promise<User> {
    console.log("Envoyé par getUsersById")
    return this.get<User>(`${this.endpoint}/${id}`);
  }

  async createUser(user: CreateUser): Promise<User> {
    return this.post<User>(this.endpoint, user);
  }

  async updateUser(id: string, user: UpdateUser): Promise<User> {
    return this.put<User>(`${this.endpoint}/${id}`, user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
