import { User } from '@users/data';
import { ICreate, IDelete, IFindById } from '@shared/infra/data';

export interface IUsersRepository
  extends ICreate<User, void>,
    IFindById<User>,
    IDelete {
  findByEmail(email: string): Promise<User | undefined>;
}
