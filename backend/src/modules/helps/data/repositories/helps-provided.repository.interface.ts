import {
  ICreate,
  IFindById,
  ISearchableRepository,
  IUpdate,
} from '@shared/infra/data';
import { HelpProvided } from '../entities/help-provided';

export interface IHelpsProvidedRepository
  extends ICreate<HelpProvided, void>,
    IFindById<HelpProvided>,
    ISearchableRepository<HelpProvided>,
    IUpdate<HelpProvided> {}
