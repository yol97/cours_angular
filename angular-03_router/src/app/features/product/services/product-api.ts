// features/user/models/update-user.model.ts
import {CreateUser} from '../../user/models/create-user.model';

export type UpdateUser = Partial<CreateUser> & { isActive?: boolean };
