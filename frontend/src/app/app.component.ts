import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth';
import { HeaderComponent } from './shared/components';
import { UserService } from './shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly authService = inject(AuthService);
  public readonly userService = inject(UserService);

  constructor() {
    const tokenDecodedData = this.authService.decodePayloadJWT();
    this.userService.user = tokenDecodedData
      ? {
          id: tokenDecodedData?.sub,
          name: tokenDecodedData?.name,
          email: tokenDecodedData?.email,
        }
      : undefined;
  }
}
