import { BecomeAdminUser } from '@auth/application/usecases';

export class BecomeAdminUserDTO
  implements Omit<BecomeAdminUser.Input, 'actionDoneBy'>
{
  userId: string;
}
