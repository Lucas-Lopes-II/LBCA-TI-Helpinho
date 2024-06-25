import { HelpCategory } from '@helps/data';

export interface Help {
  id: string;
  title: string;
  description: string;
  userHelped: string;
  userName: string;
  value: number;
  helpValue: number;
  pixKey: string;
  deadline: string;
  category: HelpCategory;
  imgUrl: string;
}
