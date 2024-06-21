import { User } from '@users/data';
import { ICreate } from '@shared/infra/data';

export interface IUsersRepository extends ICreate<User, void> {
  findByEmail(email: string): Promise<User | undefined>;
}
