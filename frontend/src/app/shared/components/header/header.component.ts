import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth';
import { LoggedUser } from '../../../core/auth/models';
import { UserService } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public user: LoggedUser | undefined;
  public readonly authService = inject(AuthService);
  public readonly userService = inject(UserService);

  ngOnInit(): void {
    this.user = this.userService.user();
  }
}
