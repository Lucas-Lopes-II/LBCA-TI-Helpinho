import { Help } from '@helps/data';
import { ICreate, IDelete, IFindById, IUpdate } from '@shared/infra/data';

export interface IHelpsRepository
  extends ICreate<Help, void>,
    IFindById<Help>,
    IDelete,
    IUpdate<Help> {}
