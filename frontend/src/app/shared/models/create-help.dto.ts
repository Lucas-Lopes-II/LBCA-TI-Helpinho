import { HelpCategory } from '../enums';

export interface CreateHelpDTO {
  title: string;
  description: string;
  value: number;
  pixKey: string;
  deadline: string;
  category: HelpCategory;
  file: File;
}
