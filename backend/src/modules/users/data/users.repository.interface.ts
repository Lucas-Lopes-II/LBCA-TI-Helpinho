import { User } from '@users/data';
import { ICreate, IFindById } from '@shared/infra/data';

export interface IUsersRepository extends ICreate<User, void>, IFindById<User> {
  findByEmail(email: string): Promise<User | undefined>;
}
