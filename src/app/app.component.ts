import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicFormComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((resp) => console.log(resp));
  }
}
