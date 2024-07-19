import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicFormComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  canGoBack = signal(false);
  router = inject(Router)
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      this.canGoBack.set((val?.url !== '/') || false)
    })
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
