import { HelpCategory } from '@helps/data';

export interface Help {
  id: string;
  title: string;
  description: string;
  userRelped: string;
  userName: string;
  value: number;
  pixKey: string;
  deadline: string;
  category: HelpCategory;
  imgUrl: string;
}
