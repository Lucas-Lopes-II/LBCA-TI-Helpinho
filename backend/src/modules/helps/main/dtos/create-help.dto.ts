import { HelpCategory } from '@helps/data';

export class CreateHelpDTO {
  title: string;
  description: string;
  value: number;
  pixKey: string;
  deadline: string;
  category: HelpCategory;
}
