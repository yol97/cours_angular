import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {CreateUser, UpdateUser, User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserApi extends BaseApi {
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/users';

  async getUsers(): Promise<User[]> {
    return this.get<User[]>(this.endpoint);
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`${this.endpoint}/${id}`);
  }

  async createUser(user: CreateUser): Promise<User> {
    return this.post<User>(this.endpoint, user);
  }

  async updateUser(id: number, user: UpdateUser): Promise<User> {
    return this.put<User>(`${this.endpoint}/${id}`, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
