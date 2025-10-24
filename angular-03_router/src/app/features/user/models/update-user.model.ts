// features/user/models/update-user.model.ts
import {CreateUser} from './create-user.model';

export type UpdateUser = Partial<CreateUser> & { isActive?: boolean };
