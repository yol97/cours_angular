// user-list.ts
import {Component, inject, signal} from '@angular/core';
import {UserStore} from '../../services/user.store';
import {CreateUser, User} from '../../models/user.model';
import {UserFacade} from '../../services/user-facade';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  imports: [],
  styleUrl: './user-list.scss',
})
export class UserList {

  isDeleting = signal<number | null>(null);
  protected error = signal<string | null>(null);
  private userStore = inject(UserStore);
  users = this.userStore.users
  private userFacade = inject(UserFacade);
  count = this.userStore.userCount;

  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.userFacade.getUsers()
    console.log("je suis dans refresh")
    console.log(this.users())
  }

  async addRandomUser() {
    const newUser: CreateUser = {
      name: 'Random ' + Math.floor(Math.random() * 100),
      email: Math.floor(Math.random() * 100) + '@example.com',
      phone: '+' + Math.floor(Math.random() * 100),
    };
    await this.userFacade.createUser(newUser);
  }

  async updateFirstUser() {
    await this.userFacade.updateUser(this.users()[0])
  }

  clearUsers() {
    this.userStore.clear();
  }

  loadMockUsers() {
    const mockUsers: User[] = [
      {
        id: 8,
        name: 'Alice',
        username: 'Borderland',
        email: 'alice@example.com',
        phone: '543-453-435-752',
        website: 'alice.com'
      },
      {id: 9, name: 'Bob', username: 'Boby', email: 'bob@example.com', phone: '228-856-53-53', website: 'boby.com'}
    ];
    this.userStore.setUsers(mockUsers);
  }

  async deleteUser(user: User) {
    this.isDeleting.set(1)
    await this.userFacade.removeUser(user.id)
    this.isDeleting.set(null);
  }
}
