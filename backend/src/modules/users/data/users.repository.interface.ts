import { User } from '@users/data';
import { ICreate, IDelete, IFindById, IUpdate } from '@shared/infra/data';

export interface IUsersRepository
  extends ICreate<User, void>,
    IFindById<User>,
    IDelete,
    IUpdate<User> {
  findByEmail(email: string): Promise<User | undefined>;
}
